/* eslint-disable react/prop-types */
/** not a concern since we're linking to a known website ourselves (github) */
/* eslint-disable react/jsx-no-target-blank */

/** TODO a11y */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { FC, useState, useContext, useEffect, useRef, useLayoutEffect, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
// import Select from "react-select";
import { css } from "emotion";

import { Lesson, Participant, getDefaultParticipant } from "@turbo-schedule/common";

import { LessonsList } from "./LessonsList";
import { fetchStudent } from "../../utils/fetchStudent";
import { getTodaysScheduleDay, scheduleDaysArray, ScheduleDay } from "../../utils/selectSchedule";
import { toNiceTimeIndex } from "../../utils/toNiceTimeIndex";
import { CurrentLangContext } from "../currentLangContext/currentLangContext";
import { availableLangs, ILang } from "../../i18n/i18n";
import { useTranslation } from "../../i18n/useTranslation";

import { getLessonStartTime, getLessonEndTime } from "../../utils/getLessonTimes";

// const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);

interface Props {
	match: any; // match; /** TODO */
}

export const SchedulePageDesktop: FC<Props> = ({ match }) => {
	const { setLang, currentLang } = useContext(CurrentLangContext);

	useEffect(() => {
		console.log("currentLang", currentLang);
	}, [currentLang]);

	const t = useTranslation();

	const searchElementRef = useRef<HTMLInputElement>(null);
	// const [searchString, setSearchString] = useState<string>(participant.text || "");
	const [searchString, setSearchString] = useState<string>(
		(match.params.participantHandle || match.params.studentName) as string
	);
	const [participant, setParticipant] = useState<Participant>(() => getDefaultParticipant());

	const [selectedDay, setSelectedDay] = useState<ScheduleDay>(() => getTodaysScheduleDay({ defaultToDay: 0 }));
	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
	const [selectedLessonTimeIndex, setSelectedLessonTimeIndex] = useState<number | undefined>(undefined);

	const navbarElement = useRef<HTMLElement>(null);
	const [navbarHeight, setNavbarHeight] = useState<number>(0);

	useEffect(() => {
		(async () => {
			const data = await fetchStudent(searchString);
			setParticipant(data);
		})();
	}, [searchString]);

	useLayoutEffect(() => {
		const height = navbarElement?.current?.clientHeight || 0;
		setNavbarHeight(height);
	}, [setNavbarHeight]);

	/**
	 * once the user selects a new day - this updates the selected lesson --
	 * it keeps the same time index, and just selects the lesson
	 * from the appropriate day.
	 */
	useEffect(() => {
		if (selectedLessonTimeIndex === null) {
			return;
		}

		const lesson: Lesson | undefined = participant?.lessons?.find(
			(l) => l.dayIndex === selectedDay && l.timeIndex === selectedLessonTimeIndex
		);

		if (!lesson) {
			return;
		}

		setSelectedLesson(lesson);
	}, [/** must */ selectedDay, /** secondary */ participant, selectedLessonTimeIndex]);

	const handleOnKeyDown = (_e: KeyboardEvent) => {
		// e.preventDefault();
		// if (e.key === "s" || e.key === "S") {
		// 	console.log("day down");
		// 	setSelectedDay(
		// 		(d) =>
		// 			(d === "*"
		// 				? scheduleDaysArray[1]
		// 				: d === scheduleDaysArray[scheduleDaysArray.length - 1]
		// 					? d
		// 					: d + 1) as ScheduleDay
		// 	);
		// } else if (e.key === "d" || e.key === "D") {
		// 	console.log("day up");
		// 	setSelectedDay(
		// 		(d) =>
		// 			(d === "*"
		// 				? scheduleDaysArray[0]
		// 				: d === scheduleDaysArray[1]
		// 				? scheduleDaysArray[0]
		// 				: d - 1) as ScheduleDay
		// 	);
		// }
		// else if (e.key === "j" || e.key === "J") {
		// 	setSelectedLessonTimeIndex(
		// 		(i) => (i !== undefined && participant?.lessons?.length && i + 1) || undefined
		// 		// clamp(i + 1, 0, participant.lessons.filter((l) => l.dayIndex === selectedDay).length - 1)
		// 	);
		// 	console.log("time down", selectedLessonTimeIndex);
		// } else if (e.key === "k" || e.key === "K") {
		// 	setSelectedLessonTimeIndex(
		// 		(i) => (i !== undefined && participant?.lessons?.length && i - 1) || undefined
		// 		// clamp(i - 1, 0, participant.lessons.filter((l) => l.dayIndex === selectedDay).length - 1)
		// 	);
		// 	console.log("time up", selectedLessonTimeIndex);
		// }
	};

	return (
		<div
			onKeyUp={(e) => handleOnKeyDown(e)}
			className={css`
				display: flex;
				flex-direction: column;

				height: 100vh;
				max-height: 100vh;
				width: 100vw;
				max-width: 100vw;

				overflow: hidden; /** TODO investigate if actually works */

				/** experimental -- TBD */
				background-color: hsla(0, 10%, 90%, 1);
			`}
		>
			<nav
				ref={navbarElement}
				className={css`
					/* background: red; */
					/* flex: 0 1 auto; */

					/* min-height: 3.75em;
					height: 3.75em; */
					max-height: 6rem;
					height: 6rem;
					font-size: 1.25em;

					display: flex;
					align-items: center;
					justify-content: end;
					/* justify-content: space-between; */

					padding-left: 2em;
					padding-right: 2em;

					& > * + * {
						margin-left: 2em;
					}
				`}
			>
				{/* left */}
				{/* <div
					className={css`
						display: flex;
						align-items: center;

					`}
				> */}
				<h1
					className={css`
						display: inline-block;
					`}
				>
					<Link to="/">{t("Turbo Schedule")}</Link>
				</h1>

				<span>
					<input
						type="search"
						name="search"
						ref={searchElementRef}
						className={css`
							font-size: 1.5em;
							max-width: 12em;
							padding: 0.3em 0.3em;
							/* padding: 0.5em 0.5em; */

							border: 0.125em solid #000;
							border-radius: 0.5em;

							border-top-right-radius: 0;
							border-bottom-right-radius: 0;
						`}
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
						onFocus={(e) => e.target.select()}
					/>
					<button
						type="button"
						onClick={(_e) => {
							setSearchString("");
							searchElementRef.current?.focus();
						}}
						className={css`
							/** same as input's - just different borders */
							font-size: 1.5em;
							max-width: 12em;
							/* padding: 0.3em 0.3em; */
							padding: 0.3em 0.6em;
							/* padding: 0.5em 0.5em; */

							border: 0.125em solid #000;
							border-radius: 0.5em;

							border-top-left-radius: 0;
							border-bottom-left-radius: 0;

							border-left: none; /** avoid double border */

							outline: none;
							cursor: pointer;
						`}
					>
						X
					</button>
				</span>

				<ul
					className={css`
						flex-grow: 1;

						display: flex;
						align-items: center;
						justify-content: center;

						& > * + * {
							margin-left: 2em;
						}

						font-size: 1.2em;
					`}
				>
					{/* SOON™ */}
					{/* <li>
						<Link
							to={`/${participant.text}`}
							className={css`
								border-bottom: 0.125em solid #000;
								font-weight: bold;
							`}
						>
							{t("Schedule")}
						</Link>
					</li>
					<li>
						<Link to={`/${participant.text}/stats`}>{t("Statistics")}</Link>
					</li> */}
					{/* SOON™ */}
					{/* <li
						className={css`
							margin-left: auto;
						`}
					>
						<Link to="/about">{t("About")}</Link>
					</li> */}
					<li
						className={css`
							margin-left: auto;
						`}
					>
						<a href="https://ts.kipras.org/api" target="_blank" rel="noopener">
							API
						</a>
					</li>
					<li>
						<a href="https://github.com/sarpik/turbo-schedule" target="_blank" rel="noopener">
							GitHub
						</a>
					</li>
					<li>
						{/* <Select options={availableLangs.map((lang) => ({ value: lang, label: lang.toUpperCase() }))} /> */}
						<select
							name="lang"
							// value={currentLang}
							defaultValue={currentLang.toUpperCase()}
							onChange={(e) => setLang(e.target.value.toLowerCase() as ILang)}
							className={css`
								vertical-align: bottom;
								font-size: 1em;
							`}
						>
							{availableLangs
								.map((lang) => lang.toUpperCase())
								.map((lang) => (
									<option key={lang} value={lang}>
										{lang}
									</option>
								))}
						</select>
					</li>
				</ul>
			</nav>

			<main
				className={css`
					flex-grow: 1;

					max-height: calc(100% - ${navbarHeight}px);
					height: calc(100% - ${navbarHeight}px);
					overflow: hidden;

					display: flex;
					justify-content: space-between;
				`}
			>
				{/* 1st */}
				<nav
					className={css`
						/* background: lightcyan; */
						flex: 1;
						flex-shrink: 2;

						min-width: 10em; /** TODO - does not prevent the shrinking when we want it to prevent:/ */

						height: 100%;
						max-height: 100%;
						overflow-x: hidden;
						overflow-y: auto;
					`}
				>
					<ul
						className={css`
							display: flex;
							flex-direction: column;

							height: 100%;

							align-items: center;
							justify-content: center;

							& > * {
								flex: 1;
							}

							& > * + * {
								border-top: 1px solid #000;
							}
							/* & > :nth-child(odd) {
								border-top: 1px solid #000;
							} */
						`}
					>
						{scheduleDaysArray.map((dayIndex) => (
							<li
								key={dayIndex}
								className={css`
									flex-grow: 1;
									width: 100%;


									/* ${dayIndex === selectedDay && "border-left: 0.75em solid #000;"} */
									position: relative;
								`}
							>
								{dayIndex === selectedDay && (
									<span
										className={css`
											position: absolute;
											left: 0;
											top: 0;

											width: 0.75em;
											height: 100%;

											background: #000;
											/* border-left: 0.75em solid #000; */
										`}
									/>
								)}

								<button
									type="button"
									onClick={(_e) => setSelectedDay(dayIndex)}
									className={css`
										display: flex;
										align-items: center;
										justify-content: center;

										width: 100%;
										height: 100%;
										font-size: 4em;

										/* ${dayIndex === selectedDay && "font-weight: 700; background: #000; color: lightcyan;"} */
									`}
								>
									<span>{dayIndex === "*" ? dayIndex : dayIndex + 1}</span>
								</button>
							</li>
						))}
					</ul>
				</nav>

				{/* 2nd - lessons of the day list */}
				<LessonsList
					lessons={participant?.lessons ?? []}
					selectedDay={selectedDay}
					selectedLesson={selectedLesson}
					setSelectedLesson={setSelectedLesson}
					setSelectedLessonTimeIndex={setSelectedLessonTimeIndex}
				/>

				{/* 3rd */}
				<article
					className={css`
						/* background: lightskyblue; */
						flex: 5;
						flex-shrink: 3;

						overflow-x: hidden;
						overflow-y: auto;
					`}
				>
					{/* <h1>hi {JSON.stringify(selectedLesson)}</h1> */}

					{selectedLesson &&
						(({ name, timeIndex, teachers, rooms, students, classes }: Lesson) => (
							<>
								<section
									className={css`
										/* --scale-sm: 2; */
										--scale-lg: 3;

										padding: 3em 4em;

										/* padding-left: calc(2em * var(--scale-lg));
										padding-right: calc(2em * var(--scale-lg));
										padding-top: calc(1.25em * var(--scale-lg));
										padding-bottom: calc(1.25em * var(--scale-lg)); */

										& > * + * {
											margin-top: 3em;
										}
									`}
								>
									{/* 1st - name & index */}
									<header
										className={css`
											display: flex;
											align-items: flex-start;
											justify-content: space-between;

											& > * {
												font-size: calc(1em * var(--scale-lg));
												font-weight: 700;
											}
										`}
									>
										<h1
											className={css`
												margin: 0;
												overflow: hidden;

												/** https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/ */
												/* white-space: nowrap; */
												/* flex-wrap: nowrap; */
												text-overflow: ellipsis;

												text-align: left;
											`}
										>
											{name}
										</h1>
										<span
											className={css`
												margin-left: calc(0.25em * var(--scale-lg));
											`}
										>
											{toNiceTimeIndex(timeIndex + 1)}
										</span>
									</header>

									{/* 2nd - ~~compact teachers & rooms~~ & start/end times */}
									<div
										className={css`
											display: flex;
											/* justify-content: space-between; */
											justify-content: flex-end;
											align-items: flex-start;

											margin-top: 2em;
										`}
									>
										{/* teachers & rooms */}
										{/* <div
											className={css`
												text-align: left;
												& > * {
													margin: 0;
												}
											`}
										>
											{teachers.length > 1 ? (
												<details>
													<summary>
														{t("Teachers")} ({teachers.length})
													</summary>
													<p>{teachers.map((teacher) => teacher)}</p>
												</details>
											) : (
												<p>{teachers.map((teacher) => teacher)}</p>
											)}

											{rooms.length > 1 ? (
												<details>
													<summary>
														{t("Rooms")} ({rooms.length})
													</summary>
													<p>{rooms.map((room) => room)}</p>
												</details>
											) : (
												<p>{rooms.map((room) => room)}</p>
											)}
										</div> */}

										{/* start / end times */}
										<div
											className={css`
												font-size: calc(1em * var(--scale-lg));
											`}
										>
											{/*
											<div>{getLessonStartTime(timeIndex)}</div>
											<Divider />
											<div>{getLessonEndTime(timeIndex)}</div> */}

											<div>
												{getLessonStartTime(timeIndex)} &mdash; {getLessonEndTime(timeIndex)}
											</div>
										</div>
									</div>

									{/* 3rd - Lesson's participants */}
									<div
										className={css`
											display: flex;
											justify-content: space-around;
											/* justify-content: space-between; */
											flex-wrap: wrap;

											text-align: left;
											font-size: 0.75em;

											& > * + * {
												margin-left: 2em;
											}
										`}
									>
										<ParticipantList
											participants={students}
											summary={t("Students") + ` (${students.length})`}
										/>
										<ParticipantList
											participants={teachers}
											summary={t("Teachers") + ` (${teachers.length})`}
										/>
										<ParticipantList
											participants={rooms}
											summary={t("Rooms") + ` (${rooms.length})`}
										/>
										<ParticipantList
											participants={classes}
											summary={t("Classes") + ` (${classes.length})`}
										/>
									</div>
								</section>
							</>
						))(selectedLesson)}
				</article>
			</main>
		</div>
	);
};

const ParticipantList: FC<{ participants: string[]; summary?: string; open?: boolean }> = ({
	participants = [],
	summary = "",
	open = true,
}) => (
	<details
		className={css`
			text-align: left;
			font-size: 1.5em;

			position: relative;

			outline: none;
		`}
		open={!!open}
	>
		{!!summary && (
			<summary
				className={css`
					cursor: pointer;

					outline: none;
					/* &::after {
							position: absolute;
							bottom: 0;
							left: 0;

							content: "";
							height: 1px;
							background: #000;
							width: 0;

							transition: 200ms ease-out;
						}

						&:hover::after, &:focus::after {
								transition: 200ms ease-in;
								width: 100%;
							}
						} */
				`}
			>
				<span>{summary}</span>
			</summary>
		)}

		<ol
			type="1"
			className={css`
				display: flex;
				flex-direction: column;

				& > * {
					list-style-type: decimal-leading-zero;
				}

				& > * + * {
					margin-top: 0.25em;
				}
			`}
		>
			{participants.map((p) => (
				<li key={p}>{p}</li>
			))}
		</ol>
	</details>
);
