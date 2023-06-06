import React, { useState, useEffect, useRef, FC } from "react";
import { match as Match } from "react-router-dom";
import { css } from "emotion";

import { Lesson, Student } from "@turbo-schedule/common";

import "./StudentSchedule.scss";

import { useWindow } from "../../hooks/useWindow";
import { useAddMostRecentParticipantOnPageChange } from "../../hooks/useLRUCache";
import Footer from "../footer/Footer";
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
import { StudentScheduleMachineProvider, useStudentScheduleMachine } from "./student-schedule-machine";

export type StudentSchedulePageProps = {
	match: Match<{
		studentName: string;
		dayIndex?: string;
		timeIndex?: string;
	}>
}

const parseMaybeNum = (maybeNum: string | undefined): number | undefined => {
	if (!maybeNum) {
		return undefined;
	}

	const num: number | undefined = Number(maybeNum);

	if (Number.isNaN(num)) {
		return undefined;
	}

	return num;
};

const parseParams = (params: StudentSchedulePageProps["match"]["params"]): StudentScheduleProps => {
	const { studentName } = params;
	const dayIndex = parseMaybeNum(params.dayIndex);
	const timeIndex = parseMaybeNum(params.timeIndex);

	return {
		studentName,
		dayIndex,
		timeIndex,
	};
};

export const StudentSchedulePage: FC<StudentSchedulePageProps> = (props) => {
	const parsed = parseParams(props.match.params);
	const { studentName, dayIndex, timeIndex } = parsed;

	console.log("props.match.params", props.match.params, {parsed});

	navigateToDesiredPath({
		//

	});

	return <>
		<StudentScheduleMachineProvider studentName={studentName} syncStateToURL={}>
			<StudentSchedule studentName={studentName} dayIndex={dayIndex} timeIndex={timeIndex} />
		</StudentScheduleMachineProvider>
	</>;
};

export type StudentScheduleProps = {
	studentName: string;
	dayIndex?: number;
	timeIndex?: number;
}

const StudentSchedule: FC<StudentScheduleProps> = ({ studentName, dayIndex, timeIndex }) => {
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

	useAddMostRecentParticipantOnPageChange(studentName, stateM.context.participantType);

	/**
	 * mimic the selectedDay
	 *
	 * TODO FIXME PARAMS - everything that comes from the route params, SHALL BE the single source of truth
	 * without any additional bs states, because we have to sync them & bugs come real quick
	 */
	const [selectedDay, __setSelectedDay] = useState<ScheduleDay>(getTodaysScheduleDay({ defaultToDay: 0 }));
	useEffect(() => {
		let dayIdx: ScheduleDay | undefined = decodeDay(dayIndex);

		if (!dayIdx && dayIdx !== 0) {
			dayIdx = getTodaysScheduleDay({ defaultToDay: 0 });

			navigateToDesiredPath({
				studentName,
				day: dayIdx,
				timeIndex,
				replaceInsteadOfPush: true,
				snapshot: stateM.context.snapshot,
			});
		}

		__setSelectedDay(dayIdx);
	}, [studentName, isDesktop, selectedLesson, stateM.context.snapshot, dayIndex, timeIndex]);

	useEffect(() => {
		if (timeIndex === undefined || !stateM.context.scheduleByDays?.[selectedDay]?.length) {
			setSelectedLesson(null);
			return;
		}

		const lesson: Lesson = stateM.context.scheduleByDays[selectedDay].find(
			(l: Lesson) => l.dayIndex === selectedDay && l.timeIndex === decodeTimeIndex(timeIndex)
		);

		console.log("lesson", lesson);

		if (!lesson) {
			return;
		}

		setSelectedLesson(lesson);
	}, [selectedDay, stateM.context.scheduleByDays, timeIndex]);

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
	const canGoBackInHistory = useRef<boolean>(timeIndex === undefined);

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
								sendM({ type: "SELECT_ARCHIVE_SNAPSHOT", participant: studentName, snapshot: s });
							}}>{s}</button>
						</li>
					))}
				</ul>
			</>;
		}
		case "fetch-from-archive-snapshot": {
			return <>
				<h1>Siurbiame moksleivio "{studentName}" duomenis iš archyvo "{stateM.context.snapshot}"...</h1>
			</>;
		}
		case "loading-success": {
	return (
		<>
			{isDesktop ? (
				<SchedulePageDesktop studentName={studentName} lessons={stateM.context.scheduleByDays.flat()} />
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
										snapshot: stateM.context.snapshot,
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

/** TODO architect in such a way that we won't need this */
const encodeDay = (day: ScheduleDay) => (day === "*" ? "*" : Number(day) + 1);
const decodeDay = (day: number | "*" | undefined): ScheduleDay => day === undefined ? 0 : (day === "*" ? "*" : ((Number(day) - 1) as ScheduleDay));

const encodeTimeIndex = (time: number): number => time + 1;
const decodeTimeIndex = (time: number | string): number => Number(time) - 1;

export const navigateToDesiredPath = (data: {
	studentName: Student["text"];
	day?: ScheduleDay;
	timeIndex?: number;
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
	snapshot,
}: {
	studentName: Student["text"];
	day?: ScheduleDay;
	timeIndex?: number;
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

	if (!timeIndex && timeIndex !== 0) {
		return `/${studentName}/${encodedDay}${snapshotParam}`;
	}

	const encodedTimeIndex = encodeTimeIndex(timeIndex);

	return `/${studentName}/${encodedDay}/${encodedTimeIndex}${snapshotParam}`;
};
