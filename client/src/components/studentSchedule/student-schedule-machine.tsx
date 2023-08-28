import React, { FC, useCallback, useContext, useEffect } from "react";
import { Actor, InterpreterFrom, assign, createMachine } from "xstate";
import { useActor, useInterpret } from "@xstate/react";

import { Lesson, ParticipantLabel, ArchiveLostFound, Participant } from "@turbo-schedule/common";

import { fetchParticipantCore } from "../../hooks/useFetchers";
import { IScheduleDays, ScheduleDay, getTodaysScheduleDay } from "../../utils/selectSchedule";

import { StudentScheduleParams, parseStudentScheduleParams, syncStudentScheduleStateToURL } from "./url";

export type MachineContext = {
	participant: {
		scheduleByDays: Lesson[][];
		snapshots?: string[]
		snapshot?: string;
		participantType?: ParticipantLabel;
		participant?: Participant["text"];
	};
	ui: {
		day?: keyof IScheduleDays;
		time?: number;
	};
}

export const defaultContext: MachineContext = {
	participant: {
		scheduleByDays: [[]],
	},
	ui: {
		day: getTodaysScheduleDay(),
	},
};

export type MachineEventFetchParticipant = {
	type: "FETCH_PARTICIPANT"
	participant: string;
	snapshot?: string;
}

export type MachineEvent =
	MachineEventFetchParticipant
| {
	type: "INIT";
	data: StudentScheduleParams;
}
| {
	type: "FETCH_SUCCESS",
	scheduleByDays: Lesson[][]
	snapshot?: string;
	participantType: ParticipantLabel;
	participant: Participant["text"];
} | {
	type: "FETCH_FAILURE"
} | {
	type: "SEARCH_ARCHIVE";
} | {
	type: "SEARCH_ARCHIVE_SUCCESS",
	snapshots: string[];
} | {
	type: "SEARCH_ARCHIVE_FAILURE"
} | {
	type: "SELECT_DAY";
	day: ScheduleDay | undefined;
} | {
	type: "SELECT_TIME";
	time: number | undefined;
}

export type MachineParticipantState =
	| "init"
	| "fetch-participant"
	| "loading-success"
	| "loading-failure"
	| "search-archive-success"
	| "search-archive-failure";

export type MachineUIState = "listening";

export type SSMachineState = {
	participant: MachineParticipantState;
	ui: MachineUIState;
}

export type SMActor = Actor<MachineContext, MachineEvent>["send"];

const assignAllFor = (submachine: keyof MachineContext, extra?: MachineContext[typeof submachine]) => assign((ctx, event) => ({
	...ctx,
	[submachine]: {
		...ctx[submachine],
		...event,
		...extra,
	}
}));

export type SSMachine = typeof studentScheduleMachine;

export const studentScheduleMachine = createMachine<MachineContext, MachineEvent, { value: SSMachineState, context: MachineContext }>({
	id: "student-schedule",
	type: "parallel",
	predictableActionArguments: true,
	context: defaultContext,
	states: {
		participant: {
			initial: "init",
			states: {
				init: {
					on: {
						FETCH_PARTICIPANT: {
							target: "fetch-participant",
							actions: assignAllFor("participant"),
						},
						INIT: {
							actions: assign((ctx, { data }) => ({
								...ctx,
								participant: {
									...ctx.participant,
									participant: data.participant,
									snapshot: data.snapshot,
								},
								ui: {
									...ctx.ui,
									day: data.day,
									time: data.time,
								}
							}))
						}
					},
				},
				"fetch-participant": {
					entry: "fetchParticipant",
					on: {
						FETCH_SUCCESS: {
							target: "loading-success",
							actions: assignAllFor("participant"),
							// assign({
							// 	scheduleByDays: (_, e) => e.scheduleByDays,
							// 	snapshot: (c, e) => e.snapshot || c.snapshot,
							// 	participantType: (c, e) => e.participantType || c.participantType,
							// 	text: (_, e) => e.text,
							// })
						},
						FETCH_FAILURE: "loading-failure"
					}
				},
				"loading-success": {
					on: {
						FETCH_PARTICIPANT: {
							target: "fetch-participant",
							actions: assignAllFor("participant"),
						},
					}
				},
				"loading-failure": {
					entry: [
						// assign({ participant: { scheduleByDays: [[]] as Lesson[][] } }),
						assignAllFor("participant", { scheduleByDays: [[]] }),
						"searchIfParticipantExistsInArchive"
					],
					on: {
						SEARCH_ARCHIVE: {
							actions: "searchIfParticipantExistsInArchive",
						},
						SEARCH_ARCHIVE_SUCCESS: {
							target: "search-archive-success",
							actions: assignAllFor("participant"),
							// assign({
							// 	snapshots: (_, event) => event.snapshots
							// })
						},
						SEARCH_ARCHIVE_FAILURE: "search-archive-failure",
					}
				},
				"search-archive-success": {
					on: {
						FETCH_PARTICIPANT: {
							target: "fetch-participant",
							actions: assignAllFor("participant"),
						}
					}
				},
				"search-archive-failure": {
					on: {}
				},
			}
		},
		ui: {
			initial: "listening",
			states: {
				"listening": {
					on: {
						SELECT_DAY: {
							actions: assignAllFor("ui"),
						},
						SELECT_TIME: {
							actions: assignAllFor("ui"),
						},
					}
				}
			}
		}
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
// export const StudentScheduleMachineContextTEMP = React.createContext<Interpreter<>>({});

export type StudentScheduleMachineProviderProps = {
	participant: Participant["text"];
}

export const StudentScheduleMachineProvider: FC<StudentScheduleMachineProviderProps> = ({ participant, children }) => {
	const studentScheduleService = useInterpret(studentScheduleMachine,{
		actions: {
			// fetchParticipant: (ctx, event): Promise<void> => fetchParticipant((event as MachineEventFetchParticipant | MachineEventSelectArchiveSnapshot).participant || ctx.participant.participant, ctx.participant.snapshot),
			fetchParticipant: (ctx): Promise<void> => fetchParticipant(ctx.participant.participant!, ctx.participant.snapshot),
			searchIfParticipantExistsInArchive: (): Promise<void> => searchIfParticipantExistsInArchive(participant, studentScheduleService.send),
		}
	});

	const syncStateToURL = useCallback((context: MachineContext = studentScheduleService.getSnapshot().context): void => {
		return syncStudentScheduleStateToURL({
			school: "kpg", // TODO
			participant: context.participant.participant || participant,
			day: context.ui.day,
			time: context.ui.time,
			snapshot: context.participant.snapshot,
		});
	}, [participant, studentScheduleService]);

	useEffect(() => {
		const urlSyncSub = studentScheduleService.subscribe((next) => {
			if (next.changed) {
				syncStateToURL(next.context);
			}
		});

		if ((studentScheduleService.getSnapshot().value as SSMachineState).participant === "init") {
			studentScheduleService.send({ type: "INIT", data: parseStudentScheduleParams(participant) });
		}

		studentScheduleService.send({ type: "FETCH_PARTICIPANT", participant });

		return () => {
			urlSyncSub.unsubscribe();
		}
	}, [participant, studentScheduleService, syncStateToURL]);

	function onFetchParticipantResponse(participantData: Participant, snapshot?: string): void {
		const { lessons, labels, text } = participantData;

		if (!lessons?.length) {
			studentScheduleService.send({ type: "FETCH_FAILURE" });
			return;
		}

		const scheduleByDays: Lesson[][] = [];
		for (const lesson of lessons) {
			const { dayIndex } = lesson;

			if (!scheduleByDays[dayIndex]) {
				scheduleByDays[dayIndex] = [];
			}
			scheduleByDays[dayIndex].push(lesson);
		}

		studentScheduleService.send({ type: "FETCH_SUCCESS", scheduleByDays, snapshot, participantType: labels[0], participant: text });
	};

	async function fetchParticipant(participant: string, snapshot?: string): Promise<void> {
		return fetch(fetchParticipantCore[0](participant, snapshot))
			.then((res) =>  res.json())
			.then(data => onFetchParticipantResponse(data.participant, snapshot))
			.catch(() => void studentScheduleService.send({ type: "FETCH_FAILURE" }));
	}

	return <StudentScheduleMachineContext.Provider value={studentScheduleService}>
		{children}
	</StudentScheduleMachineContext.Provider>;
};

export function useStudentScheduleMachine() {
	const studentScheduleService = useContext(StudentScheduleMachineContext);

	if (!studentScheduleMachine) {
		const msg = `you forgot to wrap the component tree in StudentScheduleMachineProvider.`;
		throw new Error(msg);
	}

	const [state, send] = useActor(studentScheduleService);

	return {
		state,
		send,
	} as const;
}

export const getStuffFromSSM = (state: ReturnType<typeof useStudentScheduleMachine>["state"]) => {
	console.log({state})
	const lessons2D: Lesson[][] = state.context.participant.scheduleByDays || [[]];
	const lessons: Lesson[] = lessons2D.flat();

	const selectedDay = state.context.ui.day
	const selectedTime = state.context.ui.time
	const selectedLessons: Lesson[] = selectedDay === "*" ? lessons : ((selectedDay || selectedDay === 0) && lessons2D.length > selectedDay) ? lessons2D[selectedDay] : []
	console.log({lessons, lessons2D, selectedLessons})
	const selectedLesson: Lesson | null = (selectedDay || selectedDay === 0) && (selectedTime || selectedTime === 0) && selectedLessons.length ? selectedLessons[selectedTime] : null

	return {
		lessons2D,
		lessons,
		//
		selectedDay,
		selectedTime,
		selectedLessons,
		selectedLesson,
	}
}
