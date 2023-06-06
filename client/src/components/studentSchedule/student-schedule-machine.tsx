import React, { FC, useContext, useEffect } from "react";
import { Actor, InterpreterFrom, assign, createMachine } from "xstate";
import { useActor, useInterpret } from "@xstate/react";

import { Lesson, ParticipantLabel, ArchiveLostFound, Participant } from "@turbo-schedule/common";

import { fetchParticipantCore } from "../../hooks/useFetchers";
import { useQueryFor } from "../../hooks/useQueryFor";

export type MachineContext = {
	scheduleByDays: Lesson[][];
	snapshots?: string[]
	snapshot?: string;
	participantType?: ParticipantLabel;
	text?: string;
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
	participantType: ParticipantLabel;
	text: string;
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

export type SMActor = Actor<unknown, MachineEvent>["send"];

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
						snapshot: (c, e) => e.snapshot || c.snapshot,
						participantType: (c, e) => e.participantType || c.participantType,
						text: (_, e) => e.text,
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
						participantType: (c, e) => e.participantType || c.participantType,
						text: (_, e) => e.text,
					})
				},
				FETCH_FAILURE: "loading-failure",
			}
		},
	}
});

export type FetchParticipantOpts = {
	participant: string;
	snapshot?: string;
	sendM: SMActor;
}
async function searchIfParticipantExistsInArchive(studentName: string, sendM: SMActor): Promise<void> {
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

export const StudentScheduleMachineContext = React.createContext({} as InterpreterFrom<typeof studentScheduleMachine>);

export type StudentScheduleMachineProviderProps = {
	studentName: string;
}

export const StudentScheduleMachineProvider: FC<StudentScheduleMachineProviderProps> = ({ studentName, children }) => {
	const studentScheduleService = useInterpret(studentScheduleMachine,{
		actions: {
			fetchParticipant: (ctx): Promise<void> => ctx.snapshot ? fetchParticipant(studentName, ctx.snapshot) : fetchParticipant(studentName),
			searchIfParticipantExistsInArchive: (): Promise<void> => searchIfParticipantExistsInArchive(studentName, studentScheduleService.send),
		}
	});

	function onFetchParticipantResponse({ lessons, labels, text }: Participant, snapshot?: string): void {
		console.log("on participant response", lessons, labels);
		if (!lessons?.length) {
			studentScheduleService.send({ type: "FETCH_FAILURE" });
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

		studentScheduleService.send({ type: "FETCH_SUCCESS", scheduleByDays: tempScheduleByDays, snapshot, participantType: labels[0], text });
	};

	async function fetchParticipant(participant: string, snapshot?: string): Promise<void> {
		console.log("fetching participant!", participant, snapshot);
		return fetch(fetchParticipantCore[0](participant, snapshot))
			.then((res) =>  res.json())
			.then(data => onFetchParticipantResponse(data.participant, snapshot))
			.catch(() => void studentScheduleService.send({ type: "FETCH_FAILURE" }));
	}

	/**
	 * TODO: move into a "global syncable values" context
	 */
	const [snapshotParam, setSnapshotParam] = useQueryFor("snapshot", {
		encode: (x) => x,
		decode: (x) => x,
		// dependencies: [studentScheduleService.machine.context.snapshot],
		// valueOverrideOnceChanges: studentScheduleService.machine.context.snapshot
	});

	/**
	 * 2-way sync
	 */
	useEffect(() => {
		console.log("syncing snapshot", {snapshotParam}, studentScheduleService.machine.context.snapshot);
		if (snapshotParam && snapshotParam !== studentScheduleService.machine.context.snapshot) {
			studentScheduleService.send({ type: "SELECT_ARCHIVE_SNAPSHOT", snapshot: snapshotParam });
		} else {
			studentScheduleService.send({ type: "FETCH_PARTICIPANT" });
		}
	}, [snapshotParam, studentScheduleService, studentScheduleService.machine.context.snapshot]);

	useEffect(() => {
		studentScheduleService.subscribe(({ event }) => {
			if (event.type === "SELECT_ARCHIVE_SNAPSHOT" && event.snapshot !== snapshotParam) {
				setSnapshotParam(event.snapshot);
			}
		});
	}, [setSnapshotParam, snapshotParam, studentScheduleService]);

	return <StudentScheduleMachineContext.Provider value={studentScheduleService}>
		{children}
	</StudentScheduleMachineContext.Provider>;
};

export function useStudentScheduleMachine() {
	const studentScheduleService = useContext(StudentScheduleMachineContext);

	const [state, send] = useActor(studentScheduleService);

	return {
		state,
		send,
	} as const;
}
