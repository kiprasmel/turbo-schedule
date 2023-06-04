import React, { useState, useEffect, useRef } from "react";
import { css } from "emotion";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";

import { Lesson, Student, ParticipantLabel, ArchiveLostFound, Participant } from "@turbo-schedule/common";

import "./StudentSchedule.scss";

import { useWindow } from "../../hooks/useWindow";
import { useAddMostRecentParticipantOnPageChange } from "../../hooks/useLRUCache";
import Footer from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { history } from "../../utils/history";
import StudentListModal from "./StudentListModal";
import Loading from "../../common/Loading";
import BackBtn from "../../common/BackBtn";

import { fetchParticipantCore } from "../../hooks/useFetchers";
import DaySelector from "./DaySelector";
import { ScheduleDay, getTodaysScheduleDay } from "../../utils/selectSchedule";
import { useTranslation } from "../../i18n/useTranslation";
import { SchedulePageDesktop } from "./SchedulePageDesktop";
import { LessonsList } from "./LessonsList";
import { useQueryFor } from "../../hooks/useQueryFor";

export interface IStudentScheduleProps {
	match: any /** TODO */;
}

type MachineContext = {
	scheduleByDays: Lesson[][];
	snapshots?: string[]
	snapshot?: string;
}

const defaultContext: MachineContext = {
	scheduleByDays: [[]]
};

type MachineEvent = {
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

const studentScheduleMachine = createMachine<MachineContext, MachineEvent>({
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

type UseStudentScheduleMachineOpts = {
	studentName: string;
	setParticipantType: React.Dispatch<React.SetStateAction<ParticipantLabel | null>>;
}
function useStudentScheduleMachine({ studentName, setParticipantType }: UseStudentScheduleMachineOpts) {
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
			const { found, snapshots }: ArchiveLost = await res.json();

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

const StudentSchedule = ({ match }: IStudentScheduleProps) => {
	const t = useTranslation();

	/** scroll to top of page on mount */
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	/** TODO week component */
	const { windowWidth } = useWindow();

	const isDesktop: boolean = windowWidth > 1024;

	const baseWeekStyles: React.CSSProperties = { verticalAlign: "top" };
	const weekStyles: React.CSSProperties = {
		...baseWeekStyles,
		...(windowWidth > 777 ? { display: "inline-block" } : { display: "block" }),
	};

	/** END TODO week component */

	const { params } = match;
	const { studentName } = params;
	console.log({match});

	const [participantType, setParticipantType] = useState<ParticipantLabel | null>(null);
	useAddMostRecentParticipantOnPageChange(studentName, participantType);

	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

	const [stateM, sendM] = useStudentScheduleMachine({ studentName, setParticipantType });

	/**
	 * mimic the selectedDay
	 *
	 * TODO FIXME PARAMS - everything that comes from the route params, SHALL BE the single source of truth
	 * without any additional bs states, because we have to sync them & bugs come real quick
	 */
	const [selectedDay, __setSelectedDay] = useState<ScheduleDay>(getTodaysScheduleDay({ defaultToDay: 0 }));
	useEffect(() => {
		let dayIdx: ScheduleDay | undefined = decodeDay(params.dayIndex);

		if (!dayIdx && dayIdx !== 0) {
			dayIdx = getTodaysScheduleDay({ defaultToDay: 0 });

			navigateToDesiredPath({
				studentName,
				day: dayIdx,
				timeIndex: params.timeIndex,
				shouldShowTheLesson: !!selectedLesson || isDesktop,
				replaceInsteadOfPush: true,
				snapshot: stateM.context.snapshot,
			});
		}

		__setSelectedDay(dayIdx);
	}, [params.dayIndex, params.timeIndex, studentName, isDesktop, selectedLesson, stateM.context.snapshot]);

	useEffect(() => {
		if (params.timeIndex === undefined || !stateM.context.scheduleByDays?.[selectedDay]?.length) {
			setSelectedLesson(null);
			return;
		}

		const lesson: Lesson = stateM.context.scheduleByDays[selectedDay].find(
			(l: Lesson) => l.dayIndex === selectedDay && l.timeIndex === decodeTimeIndex(params.timeIndex)
		);

		console.log("lesson", lesson);

		if (!lesson) {
			return;
		}

		setSelectedLesson(lesson);
	}, [params.timeIndex, selectedDay, stateM.context.scheduleByDays]);

	/**
	 * used to handle cases where a user comes to a URL with the `timeIndex` already set,
	 * meaning they have nowhere back to go,
	 * and we handle their history slightly differently
	 * once they close the lesson @ mobile
	 *
	 * this is the best I have came up with.
	 * There are obviously cases where you edit the URL
	 * AFTER visiting the site already
	 * & thus the handling will be slightly incorrect,
	 * but it's better & worth it either way.
	 */
	const canGoBackInHistory = useRef<boolean>(params.timeIndex === undefined);

	console.log("stateM.value", stateM.value, studentName, stateM.context);

	switch (stateM.value) {
		case "idle": {
			// sendM("FETCH_PARTICIPANT");

			return <></>;
		}
		case "fetch-participant": {
			return (
				<>
					<h1>{studentName}</h1>
					<Loading />
				</>
			);
		}
		case "loading-failure": {
			return <>
				<Navbar />

				<h1>{t("Student not found")(studentName)}</h1>
				<p>
					(naujausioje duomenų bazės versijoje).
				</p>

				<h2>ieškome archyve...</h2>
			</>;
		}
		case "search-archive-failure": {
			return <>
				<Navbar />

				<h1>{t("Student not found")(studentName)}</h1>

				<h2>archyve irgi nerasta...</h2>
				{/* TODO suggest searching for similar / do automatically */}

				<BackBtn />
			</>;
		}
		case "search-archive-success": {
			return <>
				<h1>
					Moksleivis "{studentName}" rastas archyvuose.
				</h1>
				<p>
					Pasirinkite laikotarpį, kuriuo norite peržiūrėti tvarkaraštį:
				</p>
				<ul className={css`
					display: inline-block;
				`}>
					{stateM.context.snapshots!.map(s => (
						<li key={s} className={css`
							text-align: left;
						`}>
							<button type="button" onClick={() => {
								sendM({ type: "SELECT_ARCHIVE_SNAPSHOT", snapshot: s });
							}}>{s}</button>
						</li>
					))}
				</ul>
			</>;
		}
		case "fetch-from-archive-snapshot": {
			return <>
				<h1>Siurbiame moksleivio "{studentName}" duomenis iš archyvo...</h1>
			</>;
		}
		case "loading-success": {
	return (
		<>
			{isDesktop ? (
				<SchedulePageDesktop match={match} lessons={stateM.context.scheduleByDays.flat()} snapshot={stateM.context.snapshot} />
			) : (
				<>
					<Navbar />

					<h1>{studentName}</h1>

					<DaySelector
						selectedDay={selectedDay}
						handleClick={(_e, day) => {
							// dispatchSelectedDayState({ day, causedBy: "daySelection" });

							navigateToDesiredPath({
								studentName,
								day,
								timeIndex: selectedLesson?.timeIndex,
								shouldShowTheLesson: !!selectedLesson || isDesktop,
								snapshot: stateM.context.snapshot,
							});
						}}
					/>

					<br />

					{/* {selectedDayState.day === "*" ? ( */}
					{selectedDay === "*" ? (
								stateM.context.scheduleByDays.map((lessonsArray, index) => (
							<div key={index} style={weekStyles}>
								<h3 style={{ padding: "1em 2em" }}>{t("weekday")(index)}</h3>

								<LessonsList
									lessons={lessonsArray}
									selectedDay={selectedDay}
									selectedLesson={null}
									handleClick={(_e, lesson) => {
										navigateToDesiredPath({
											studentName,
											day: selectedDay,
											timeIndex: lesson?.timeIndex,
											shouldShowTheLesson: !!lesson || isDesktop,
											snapshot: stateM.context.snapshot,
										});

										setSelectedLesson(lesson);
									}}
								/>
							</div>
						))
					) : (
						<>
							<LessonsList
										lessons={stateM.context.scheduleByDays[selectedDay]}
								selectedDay={selectedDay}
								// selectedLesson={null}
								selectedLesson={selectedLesson}
								handleClick={(_e, lesson) => {
									navigateToDesiredPath({
										studentName,
										day: selectedDay,
										timeIndex: lesson?.timeIndex,
										shouldShowTheLesson: !!lesson || isDesktop,
										snapshot: stateM.context.snapshot,
									});

									setSelectedLesson(lesson);
								}}
							/>
						</>
					)}

					<StudentListModal
						isOpen={!!selectedLesson}
						snapshot={stateM.context.snapshot}
						handleClose={() => {
							/**
							 * if we've been navigating normally, this will pop the current history
							 * back into the previous one, and the `replace` will do nothing.
							 *
							 * however, if we navigated directly through the URL,
							 * this would save us -- instead of going back to an empty tab,
							 * this will go back to where we're supposed to be at -- the selected day.
							 */
							// history.goBack();

							// history.replace(`/${studentName}/${encodeDay(selectedDay)}`);

							if (canGoBackInHistory.current) {
								history.goBack();
							} else {
								/**
								 * The goal here is to mimic the "go back" behavior as if the user
								 * did not come from an empty tab,
								 * additionally adding the `/` URL before the empty tab,
								 * and it looks something like this:
								 *
								 * [empty tab, /name/day/time] => [empty tab, /, /name/day, /name/day/time]
								 *             /\              =>                /\
								 */

								const newLocation1st: string = `/`;
								const newLocation2nd: string = `/${studentName}/${encodeDay(selectedDay)}`;
								const oldLocation3rd: string = history.location.pathname;

								history.replace(newLocation1st);

								history.push(newLocation2nd);

								history.push(oldLocation3rd);

								history.goBack();
							}

							setSelectedLesson(null);
						}}
						lesson={selectedLesson}
					/>

					<Footer />
				</>
			)}
		</>
	);
		}
		default: {
			throw new Error(`unhandled state value "${stateM.value}"`);
			// assertNever(stateM.value); // TODO TS
		}
	}
};

export default StudentSchedule;

/** TODO architect in such a way that we won't need this */
const encodeDay = (day: ScheduleDay) => (day === "*" ? "*" : Number(day) + 1);
const decodeDay = (day: number | "*"): ScheduleDay => (day === "*" ? "*" : ((day - 1) as ScheduleDay));

const encodeTimeIndex = (time: number): number => time + 1;
const decodeTimeIndex = (time: number | string): number => Number(time) - 1;

export const navigateToDesiredPath = (data: {
	studentName: Student["text"];
	day?: ScheduleDay;
	timeIndex?: number;
	shouldShowTheLesson: boolean;
	replaceInsteadOfPush?: boolean /** should be used on the initial page load */;
	snapshot?: string;
}): void => {
	const path: string | undefined = getDesiredPath(data);

	console.log("path", `"${path}"`);

	if (!path) {
		return;
	}

	if (data.replaceInsteadOfPush) {
		history.replace(path);
		return;
	}

	history.push(path);
};

export const getDesiredPath = ({
	studentName,
	day,
	timeIndex,
	shouldShowTheLesson /** shall be `false` on mobile unless the lesson was selected; always `true` on desktop */,
	snapshot,
}: {
	studentName: Student["text"];
	day?: ScheduleDay;
	timeIndex?: number;
	shouldShowTheLesson: boolean;
	snapshot?: string;
}): string | undefined => {
	if (!studentName?.trim()) {
		return undefined;
	}

	const snapshotParam = !snapshot ? "" : `?snapshot=${snapshot}`;

	if (!day && day !== 0) {
		return `/${studentName}${snapshotParam}`;
	}

	const encodedDay = encodeDay(day);

	if (timeIndex === undefined || !shouldShowTheLesson) {
		// history.push(`/${studentName}/${encodedDay}`);
		return `/${studentName}/${encodedDay}${snapshotParam}`;
	}

	const encodedTimeIndex = encodeTimeIndex(timeIndex);

	// history.push(`/${studentName}/${encodedDay}/${encodedTimeIndex}`);
	return `/${studentName}/${encodedDay}/${encodedTimeIndex}${snapshotParam}`;
};
