import React, { useState, useEffect, useRef, FC } from "react";
import { match as Match } from "react-router-dom";
import { css } from "emotion";

import { Lesson } from "@turbo-schedule/common";

import "./StudentSchedule.scss";

import { useWindow } from "../../hooks/useWindow";
import { useAddMostRecentParticipantOnPageChange } from "../../hooks/useLRUCache";
import { Navbar } from "../navbar/Navbar";
import { history } from "../../utils/history";
import StudentListModal from "./StudentListModal";
import Loading from "../../common/Loading";
import BackBtn from "../../common/BackBtn";

import DaySelector from "./DaySelector";
import { ScheduleDay, getTodaysScheduleDay } from "../../utils/selectSchedule";
import { useTranslation } from "../../i18n/useTranslation";
import { SchedulePageDesktop } from "./SchedulePageDesktop";
import { LessonsList } from "./LessonsList";
import { SSMachineState, StudentScheduleMachineProvider, useStudentScheduleMachine } from "./student-schedule-machine";
import { syncStudentScheduleStateToURL } from "./url";

export type StudentSchedulePageProps = {
	match: Match<{
		participant: string;
	}>
}
export const StudentSchedulePage: FC<StudentSchedulePageProps> = ({ match }) => {
	const { participant } = match.params;

	return <>
		<StudentScheduleMachineProvider participant={participant} >
			<StudentSchedule participant={participant} />
		</StudentScheduleMachineProvider>
	</>;
};

export type StudentScheduleProps = {
	participant: string;
}

const StudentSchedule: FC<StudentScheduleProps> = ({ participant }) => {
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

	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

	const { state: stateM, send: sendM } = useStudentScheduleMachine();

	console.log("stateM", stateM.context);

	useAddMostRecentParticipantOnPageChange(participant, stateM.context.participant.participantType);

	/**
	 * mimic the selectedDay
	 *
	 * TODO FIXME PARAMS - everything that comes from the route params, SHALL BE the single source of truth
	 * without any additional bs states, because we have to sync them & bugs come real quick
	 */
	const [selectedDay, __setSelectedDay] = useState<ScheduleDay>(getTodaysScheduleDay({ defaultToDay: 0 })); // TODO FIXME
	// useEffect(() => {
	// 	let dayIdx: ScheduleDay | undefined = decodeDay(dayIndex);

	// 	if (!dayIdx && dayIdx !== 0) {
	// 		dayIdx = getTodaysScheduleDay({ defaultToDay: 0 });

	// 		navigateToDesiredPath({
	// 			studentName,
	// 			day: dayIdx,
	// 			timeIndex,
	// 			replaceInsteadOfPush: true,
	// 			snapshot: stateM.context.participant.snapshot,
	// 		});
	// 	}

	// 	__setSelectedDay(dayIdx);
	// }, [studentName, isDesktop, selectedLesson, stateM.context.participant.snapshot, dayIndex, timeIndex]);

	// useEffect(() => {
	// 	if (timeIndex === undefined || !stateM.context.participant.scheduleByDays?.[selectedDay]?.length) {
	// 		setSelectedLesson(null);
	// 		return;
	// 	}

	// 	const lesson: Lesson = stateM.context.participant.scheduleByDays[selectedDay].find(
	// 		(l: Lesson) => l.dayIndex === selectedDay && l.timeIndex === decodeTimeIndex(timeIndex)
	// 	);

	// 	console.log("lesson", lesson);

	// 	if (!lesson) {
	// 		return;
	// 	}

	// 	setSelectedLesson(lesson);
	// }, [selectedDay, stateM.context.participant.scheduleByDays, timeIndex]);

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
	// const canGoBackInHistory = useRef<boolean>(timeIndex === undefined);
	const canGoBackInHistory = useRef<boolean>(true); // TODO FIXME

	console.log("stateM.value", stateM.value, participant, stateM.context);

	switch ((stateM.value as SSMachineState).participant) {
		case "init": {
			return <></>;
		}
		case "fetch-participant": {
			return (
				<>
					<h1>{participant}</h1>
					<Loading />
				</>
			);
		}
		case "loading-failure": {
			return <>
				<Navbar />

				<h1>{t("Student not found")(participant)}</h1>
				<p>
					(naujausioje duomenų bazės versijoje).
				</p>

				<h2>ieškome archyve...</h2>
			</>;
		}
		case "search-archive-failure": {
			return <>
				<Navbar />

				<h1>{t("Student not found")(participant)}</h1>

				<h2>archyve irgi nerasta...</h2>
				{/* TODO suggest searching for similar / do automatically */}

				<BackBtn />
			</>;
		}
		case "search-archive-success": {
			return <>
				<h1>
					Moksleivis "{participant}" rastas archyvuose.
				</h1>
				<p>
					Pasirinkite laikotarpį, kuriuo norite peržiūrėti tvarkaraštį:
				</p>
				<ul className={css`
					display: inline-block;
				`}>
					{stateM.context.participant.snapshots!.map(s => (
						<li key={s} className={css`
							text-align: left;
						`}>
							<button type="button" onClick={() => {
								sendM({ type: "SELECT_ARCHIVE_SNAPSHOT", participant, snapshot: s });
							}}>{s}</button>
						</li>
					))}
				</ul>
			</>;
		}
		case "fetch-from-archive-snapshot": {
			return <>
				<h1>Siurbiame moksleivio "{participant}" duomenis iš archyvo "{stateM.context.participant.snapshot}"...</h1>
			</>;
		}
		case "loading-success": {
	return (
		<>
			{isDesktop ? (
				<SchedulePageDesktop studentName={participant} lessons={stateM.context.participant.scheduleByDays.flat()} />
			) : (
				<>
					<Navbar />

					<h1>{participant}</h1>

					<DaySelector
						selectedDay={selectedDay}
						handleClick={(_e, day) => {
							// dispatchSelectedDayState({ day, causedBy: "daySelection" });

							syncStudentScheduleStateToURL({
								participant,
								day,
								time: selectedLesson?.timeIndex,
								snapshot: stateM.context.participant.snapshot,
							});
						}}
					/>

					<br />

					{/* {selectedDayState.day === "*" ? ( */}
					{selectedDay === "*" ? (
								stateM.context.participant.scheduleByDays.map((lessonsArray, index) => (
							<div key={index} style={weekStyles}>
								<h3 style={{ padding: "1em 2em" }}>{t("weekday")(index)}</h3>

								<LessonsList
									lessons={lessonsArray}
									selectedDay={selectedDay}
									selectedLesson={null}
									handleClick={(_e, lesson) => {
										syncStudentScheduleStateToURL({
											participant,
											day: selectedDay,
											time: lesson?.timeIndex,
											snapshot: stateM.context.participant.snapshot,
										});

										setSelectedLesson(lesson);
									}}
								/>
							</div>
						))
					) : (
						<>
							<LessonsList
										lessons={stateM.context.participant.scheduleByDays[selectedDay]}
								selectedDay={selectedDay}
								// selectedLesson={null}
								selectedLesson={selectedLesson}
								handleClick={(_e, lesson) => {
									syncStudentScheduleStateToURL({
										participant,
										day: selectedDay,
										time: lesson?.timeIndex,
										snapshot: stateM.context.participant.snapshot,
									});

									setSelectedLesson(lesson);
								}}
							/>
						</>
					)}

					<StudentListModal
						isOpen={!!selectedLesson}
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

								/**
								 * TODO FIXME
								 */

								// const newLocation1st: string = `/`;
								// const newLocation2nd: string = `/${studentName}/${encodeDay(selectedDay)}`;
								// const oldLocation3rd: string = history.location.pathname;

								// history.replace(newLocation1st);

								// history.push(newLocation2nd);

								// history.push(oldLocation3rd);

								history.goBack();
							}

							setSelectedLesson(null);
						}}
						lesson={selectedLesson}
					/>
				</>
			)}
		</>
	);
		}
		default: {
			console.error(stateM.value);
			throw new Error(`unhandled state value "${stateM.value}"`);
			// assertNever(stateM.value); // TODO TS
		}
	}
};
