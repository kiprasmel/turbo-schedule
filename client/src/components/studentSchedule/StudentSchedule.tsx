import React, { useEffect, useRef, FC } from "react";
import { match as Match } from "react-router-dom";
import { css } from "emotion";

import "./StudentSchedule.css";

import { useWindow } from "../../hooks/useWindow";
import { useAddMostRecentParticipantOnPageChange } from "../../hooks/useLRUCache";
import Footer from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { history } from "../../utils/history";
import StudentListModal from "./StudentListModal";
import Loading from "../../common/Loading";
import BackBtn from "../../common/BackBtn";

import DaySelector from "./DaySelector";
import { useTranslation } from "../../i18n/useTranslation";
import { SchedulePageDesktop } from "./SchedulePageDesktop";
import { LessonsList } from "./LessonsList";
import { SSMachineState, StudentScheduleMachineProvider, getStuffFromSSM, useStudentScheduleMachine } from "./student-schedule-machine";

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

	const { state: stateM, send: sendM } = useStudentScheduleMachine();

	useAddMostRecentParticipantOnPageChange(participant, stateM.context.participant.participantType);

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

	const { selectedDay, selectedLessons, selectedLesson } = getStuffFromSSM(stateM);

	switch ((stateM.value as SSMachineState).participant) {
		case "init": {
			return <></>;
		}
		case "fetch-participant": {
			const { snapshot } = stateM.context.participant;

			if (snapshot) {
				return <>
					<h1>Siurbiame moksleivio "{participant}" duomenis iš archyvo "{stateM.context.participant.snapshot}"...</h1>
				</>;
			}

			return (
				<>
					<h1>{participant}</h1>
					<Loading />
				</>
			);
		}
		case "loading-failure": {
			const { snapshot } = stateM.context.participant;

			if (snapshot) {
				return <>
					<Navbar />

					<h1>{t("Student not found")(participant)}</h1>
					<p>
						(archyve {snapshot})
					</p>
					<h2>ieškome kituose archyvuose...</h2>
				</>;
			}

			return <>
				<Navbar />

				<h1>{t("Student not found")(participant)}</h1>
				<p>
					(naujausioje duomenų bazės versijoje).
				</p>

				<h2>ieškome archyvuose...</h2>
			</>;
		}
		case "search-archive-failure": {
			const { snapshot } = stateM.context.participant;

			const notFoundInArchivesText: string = !!snapshot ? `Nei archyve "${snapshot}", nei kituose archyvuose irgi nerasta...` : "Archyvuose irgi nerasta...";

			return <>
				<Navbar />

				<h1>{t("Student not found")(participant)}</h1>

				<h2>{notFoundInArchivesText}</h2>

				{/*
					TODO: fuzzy search similar names in archyves.

					"Maybe you meant:"
					- "Similar Name 1 (found in X archyves in years A, B, C)"
					- "Similar Name 2 (found in Y archyves in years B, C, D)"
					...
				*/}

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
								sendM({ type: "FETCH_PARTICIPANT", participant, snapshot: s });
							}}>{s}</button>
						</li>
					))}
				</ul>
			</>;
		}
		case "loading-success": {
	return (
		<>
			{isDesktop ? (
				<SchedulePageDesktop />
			) : (
				<>
					<Navbar />

					<h1>{participant}</h1>

					<DaySelector
						selectedDay={selectedDay}
						handleClick={(_e, day) => sendM({ type: "SELECT_DAY", day })}
					/>

					<br />

					{(!selectedDay && selectedDay !== 0)
						? null :
						selectedDay === "*" ? (
						stateM.context.participant.scheduleByDays.map((lessonsArray, index) => (
							<div key={index} style={weekStyles}>
								<h3 style={{ padding: "1em 2em" }}>{t("weekday")(index)}</h3>

								<LessonsList lessons={lessonsArray} />
							</div>
						))
					) : (
						<>
							<LessonsList lessons={selectedLessons} />
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

							sendM({ type: "SELECT_TIME", time: undefined });
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
			console.error(stateM.value);
			throw new Error(`unhandled state value "${(stateM.value as SSMachineState).participant}"`);
			// assertNever(stateM.value); // TODO TS
		}
	}
};
