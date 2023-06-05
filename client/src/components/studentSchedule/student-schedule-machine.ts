import { useEffect } from "react";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";

import { Lesson, ParticipantLabel, ArchiveLostFound, Participant } from "@turbo-schedule/common";

import { fetchParticipantCore } from "../../hooks/useFetchers";
import { useQueryFor } from "../../hooks/useQueryFor";

export type MachineContext = {
	scheduleByDays: Lesson[][];
	snapshots?: string[]
	snapshot?: string;
}

export const defaultContext: MachineContext = {
	scheduleByDays: [[]]
};

export type MachineEvent = {
	type: "FETCH_PARTICIPANT"
} | {
	type: "FETCH_SUCCESS",
	scheduleByDays: Lesson[][]
	snapshot?: string;
} | {
	type: "FETCH_FAILURE"
} | {
	type: "SEARCH_ARCHIVE_SUCCESS",
	snapshots: string[];
} | {
	type: "SEARCH_ARCHIVE_FAILURE"
} | {
	type: "SELECT_ARCHIVE_SNAPSHOT",
	snapshot: string
} /* | {
	type: "FETCH_ARCHIVE_SNAPSHOT_SUCCESS";
	snapshot: string
	scheduleByDays: Lesson[][]
} | {
	type: "FETCH_ARCHIVE_SNAPSHOT_FAILURE";
	snapshot: string
} */

export const studentScheduleMachine = createMachine<MachineContext, MachineEvent>({
	id: "student-schedule",
	initial: "idle",
	context: defaultContext,
	states: {
		idle: {
			"on": {
				FETCH_PARTICIPANT: "fetch-participant",
				SELECT_ARCHIVE_SNAPSHOT: {
					target: "fetch-from-archive-snapshot",
					actions: assign({
						snapshot: (_, event) => event.snapshot,
					})
				}
			}
		},
		"fetch-participant": {
			entry: "fetchParticipant",
			on: {
				FETCH_SUCCESS: {
					target: "loading-success",
					actions: assign({
						scheduleByDays: (_, e) => e.scheduleByDays,
						snapshot: (c, e) => e.snapshot || c.snapshot
					})
				},
				FETCH_FAILURE: "loading-failure"
			}
		},
		"loading-success": {
			on: {
				FETCH_PARTICIPANT: "fetch-participant",
				SELECT_ARCHIVE_SNAPSHOT: {
					target: "fetch-from-archive-snapshot",
					actions: assign({
						snapshot: (_, event) => event.snapshot,
					})
				}
			}
		},
		"loading-failure": {
			entry: [
				assign({ scheduleByDays: [[]] }),
				"searchIfParticipantExistsInArchive"
			],
			on: {
				SEARCH_ARCHIVE_SUCCESS: {
					target: "search-archive-success",
					actions: assign({
						snapshots: (_, event) => event.snapshots
					})
				},
				SEARCH_ARCHIVE_FAILURE: "search-archive-failure",
			}
		},
		"search-archive-success": {
			on: {
				SELECT_ARCHIVE_SNAPSHOT: {
					target: "fetch-from-archive-snapshot",
					actions: assign({
						snapshot: (_, event) => event.snapshot,
					})
				}
			}
		},
		"search-archive-failure": {
			on: {}
		},
		"fetch-from-archive-snapshot": {
			entry: "fetchParticipant",
			on: {
				FETCH_SUCCESS: {
					target: "loading-success",
					actions: assign({
						scheduleByDays: (_, e) => e.scheduleByDays,
						snapshot: (c, e) => e.snapshot || c.snapshot,
					})
				},
				FETCH_FAILURE: "loading-failure",
			}
		},
	}
});

export type UseStudentScheduleMachineOpts = {
	studentName: string;
	setParticipantType: React.Dispatch<React.SetStateAction<ParticipantLabel | null>>;
}
export function useStudentScheduleMachine({ studentName, setParticipantType }: UseStudentScheduleMachineOpts) {
	const [stateM, sendM] = useMachine(studentScheduleMachine, {
		actions: {
			fetchParticipant: (ctx): Promise<void> => ctx.snapshot ? fetchParticipant(studentName, ctx.snapshot) : fetchParticipant(studentName),
			searchIfParticipantExistsInArchive: (): Promise<void> => searchIfParticipantExistsInArchive(),
		}
	});

	const [snapshotParam] = useQueryFor("snapshot", {
		encode: (x) => x,
		decode: (x) => x,
		dependencies: [stateM.context.snapshot],
		valueOverrideOnceChanges: stateM.context.snapshot
	});
	console.log({snapshotParam});

	useEffect(() => {
		if (snapshotParam && snapshotParam !== stateM.context.snapshot) {
			sendM({ type: "SELECT_ARCHIVE_SNAPSHOT", snapshot: snapshotParam });
		} else {
			sendM({ type: "FETCH_PARTICIPANT" });
		}
	}, [sendM, snapshotParam, stateM.context.snapshot]);

	async function searchIfParticipantExistsInArchive(): Promise<void> {
		const res = await fetch(`/api/v1/archive/lost-found?participantName=${encodeURIComponent(studentName)}`);

		if (res.ok) {
			const { found, snapshots }: ArchiveLostFound = await res.json();

			if (found) {
				sendM({ type: "SEARCH_ARCHIVE_SUCCESS", snapshots });
			} else {
				sendM({ type: "SEARCH_ARCHIVE_FAILURE" });
			}
		} else {
			sendM({ type: "SEARCH_ARCHIVE_FAILURE" });
		}
	};

	function onFetchParticipantResponse({ lessons, labels }: Participant, snapshot?: string): void {
		setParticipantType(labels[0]);

		if (!lessons?.length) {
			sendM({ type: "FETCH_FAILURE" });
			return;
		}

		const tempScheduleByDays: Array<Array<Lesson>> = [];

		lessons.forEach((lesson) => {
			/** make sure there's always an array inside an array */
			if (!tempScheduleByDays[lesson.dayIndex]?.length) {
				tempScheduleByDays[lesson.dayIndex] = [];
			}

			tempScheduleByDays[lesson.dayIndex].push(lesson);
		});

		sendM({ type: "FETCH_SUCCESS", scheduleByDays: tempScheduleByDays, snapshot });
	};

	function fetchParticipant(participant: string, snapshot?: string): Promise<void> {
		console.log("fetching participant", participant);
		return fetch(fetchParticipantCore[0](participant, snapshot))
			.then((res) =>  res.json())
			.then(data => onFetchParticipantResponse(data.participant, snapshot))
			.catch(() => void sendM({ type: "FETCH_FAILURE" }));
	}

	return [stateM, sendM] as const;
}
