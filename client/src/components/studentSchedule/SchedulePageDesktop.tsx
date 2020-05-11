/** TODO a11y */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { FC, useState, useContext, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
// import Select from "react-select";
import { css } from "emotion";

import { Lesson, StudentFromList } from "@turbo-schedule/common";

import { getTodaysScheduleDay, ScheduleDayKind, scheduleDaysArray } from "../../utils/selectSchedule";
import { CurrentLangContext } from "../currentLangContext/currentLangContext";
import { availableLangs, useTranslation, ILang } from "../../i18n/i18n";

import { getLessonStartTime, getLessonEndTime } from "../../utils/getLessonTimes";

const participant: StudentFromList = {
	id: "Melnikovas Kipras IIIe",
	text: "Melnikovas Kipras IIIe",
	originalHref: "x300111e_melni_kip220.htm",
	labels: ["student"],
	originalScheduleURI: "http://kpg.lt/Tvarkarastis/x300111e_melni_kip220.htm",
	firstName: "Kipras",
	lastName: "Melnikovas",
	fullName: "Kipras Melnikovas",
	classNum: 11,
	classChar: "e",
	fullClass: "11e",
	classNumOrig: "III",
	classCharOrig: "e",
	fullClassOrig: "IIIe",
};

const lessons: Lesson[] = [
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 0,
		name: "G3 matematika A 1 gr.",
		teacher: "Baltūsienė Violeta",
		room: "A207 matematikos",
		id: "false/3/2/G3 matematika A 1 gr./Baltūsienė Violeta/A207 matematikos",
		teachers: ["Baltūsienė Violeta"],
		rooms: ["A207 matematikos"],
		classes: ["IIIGa", "IIIGb", "IIIGc", "IIIGd", "IIIe"],
		students: [
			"Razmaitė Emilija IIIGa",
			"Vizgirdas Andrius IIIGa",
			"Andrusinaitė Agnė IIIGb",
			"Šiaulytė Justina IIIGb",
			"Vaišytė Emilija IIIGb",
			"Žalinauskaitė Gintarė IIIGb",
			"Barkauskas Domantas IIIGc",
			"Bričkutė Dominyka IIIGc",
			"Gedrimaitė Greta IIIGc",
			"Jankauskas Arnoldas IIIGc",
			"Jurgutis Audrius IIIGc",
			"Mitkutė Vaiva IIIGc",
			"Osterberg Adelė Danutė IIIGc",
			"Ubartas Justas IIIGc",
			"Zaboras Edgaras IIIGc",
			"Ramanauskaitė Austėja IIId",
			"Strigauskaitė Andrėja IIId",
			"Vilčinskas Justas IIId",
			"Daugėla Linas IIIe",
			"Mėčius Gediminas IIIe",
			"Melnikovas Kipras IIIe",
			"Ševcova Erika IIIe",
		],
	},
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 1,
		name: "G3 matematika A 6 gr.",
		teacher: "Būgienė Inga",
		room: "A101 ekonomikos matematikos",
		id: "false/0/5/G3 matematika A 6 gr./Būgienė Inga/A101 ekonomikos matematikos",
		teachers: ["Būgienė Inga"],
		rooms: ["A101 ekonomikos matematikos"],
		classes: [],
		students: [
			"Šinkūnas Redas IIIGa",
			"Bronvasser Beta IIIGb",
			"Jonkutė Justė IIIGb",
			"Miltakytė Marija IIIGb",
			"Gerybaitė Emilija IIIGc",
			"Mizgirytė Teresė IIIGc",
			"Puškorius Justas IIIGc",
			"Šalnis Dominykas IIId",
			"Tolpeginaitė Erika IIId",
			"Žąsytytė Kotryna IIId",
			"Andriuškevičius Rokas IIIe",
			"Eglinaitė Klaudija IIIGe",
			"Racius Ovidijus IIIe",
		],
	},
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 2,
		name: "G3e klasės valandėlė",
		teacher: "Norvaišienė Regina",
		room: "A100 istorijos",
		id: "false/0/0/G3e klasės valandėlė/Norvaišienė Regina/A100 istorijos",
		teachers: ["Norvaišienė Regina"],
		rooms: ["A100 istorijos"],
		classes: [],
		students: [
			"Andriuškevičius Rokas IIIe",
			"Cironkaitė Viktorija IIIe",
			"Dargytė Brigita IIIe",
			"Daugėla Linas IIIe",
			"Eglinaitė Klaudija IIIGe",
			"Einaitė Ernesta IIIe",
			"Griguola Tomas IIIe",
			"Jakumas Lukas IIIe",
			"Jasas Ainius IIIe",
			"Jašinskas Viktoras IIIe",
			"Jašmontas Valdas IIIe",
			"Lekniūtė Aušra IIIGe",
			"Lukaitė Evelina IIIe",
			"Mėčius Gediminas IIIe",
			"Melnikovas Kipras IIIe",
			"Racius Ovidijus IIIe",
			"Ševcova Erika IIIe",
			"Skardžiukaitė Eurika IIIe",
			"Strakšaitė Iveta IIIe",
			"Urbonaitė Rugilė IIIe",
			"Žilinskis Rokas IIIe",
			"Zobernis Andrius IIIe",
		],
	},
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 3,
		name: "G4 geografija B",
		teacher: "Adomaitis Vilius",
		room: "A103 soc. mokslų",
		id: "false/0/0/G4 geografija B/Adomaitis Vilius/A103 soc. mokslų",
		teachers: ["Adomaitis Vilius"],
		rooms: ["A103 soc. mokslų"],
		classes: [],
		students: [
			"Gedvilas Aironas IVGa",
			"Jonušaitė Gabrielė IVGa",
			"Jovaišaitė Lauryna IVGa",
			"Leščiauskas Simonas IVGa",
			"Trakšelytė Gabija IVGa",
			"Žilinskaitė Goda IVGa",
			"Lont Gabrielius Pjeras IVGb",
			"Naraškevičiūtė Emilija IVGb",
			"Narvilaitė Kornelija IVGb",
			"Rimaitė Margarita IVGb",
			"Baltūsis Simonas IVGc",
		],
	},
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 4,
		name: "5c lietuvių k.",
		teacher: "Gumbaragienė Raimonda",
		room: "K113 lietuvių k.",
		id: "false/0/1/5c lietuvių k./Gumbaragienė Raimonda/K113 lietuvių k.",
		teachers: ["Gumbaragienė Raimonda"],
		rooms: ["K113 lietuvių k."],
		classes: ["5c"],
		students: ["5c"],
	},
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 5,
		name: "6b anglų 1 gr. /tikyba 2 gr.",
		teacher: "Čičiūnienė Reda, Petrauskienė Neda",
		room: "K105 anglų k., K216 tikybos",
		id: "false/0/5/6b anglų 1 gr. /tikyba 2 gr./Čičiūnienė Reda, Petrauskienė Neda/K105 anglų k., K216 tikybos",
		teachers: ["Čičiūnienė Reda", "Petrauskienė Neda"],
		rooms: ["K105 anglų k.", "K216 tikybos"],
		classes: ["6b"],
		students: ["6b"],
	},
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 6,
		name: "6a muzika",
		teacher: "Tijūnaitienė Oksana",
		room: "A108 muzikos",
		id: "false/0/1/6a muzika/Tijūnaitienė Oksana/A108 muzikos",
		teachers: ["Tijūnaitienė Oksana"],
		rooms: ["A108 muzikos"],
		classes: ["6a"],
		students: ["6a"],
	},
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 7,
		name: "G4 matematika A 3 gr.",
		teacher: "Kybartienė Dalia",
		room: "A312 matematikos",
		id: "false/0/4/G4 matematika A 3 gr./Kybartienė Dalia/A312 matematikos",
		teachers: ["Kybartienė Dalia"],
		rooms: ["A312 matematikos"],
		classes: [],
		students: [
			"Bakstys Martynas IVGa",
			"Narkus Džiugas IVGa",
			"Ruškutė Emilija IVGa",
			"Naraškevičiūtė Emilija IVGb",
			"Pliuškys Rolandas IVGb",
			"Razmutė Miglė IVGb",
			"Šličius Tomas IVGb",
			"Urbonavičiūtė Ema IVGb",
		],
	},
	{
		isEmpty: false,
		dayIndex: 0,
		timeIndex: 8,
		name: "G4 matematika A 4 gr.",
		teacher: "Verseckienė Stanislava",
		room: "A205 matematikos",
		id: "false/0/4/G4 matematika A 4 gr./Verseckienė Stanislava/A205 matematikos",
		teachers: ["Verseckienė Stanislava"],
		rooms: ["A205 matematikos"],
		classes: [],
		students: [
			"Embrasaitė Elžbieta IVGa",
			"Jonušaitė Gabrielė IVGa",
			"Leščiauskas Simonas IVGa",
			"Špora Gabrielius IVGa",
			"Večerskytė Amelija IVGa",
			"Žilinskaitė Goda IVGa",
			"Baltutis Lukas IVGb",
			"Barasaitė Aistė IVGb",
			"Butkutė Kristina IVGb",
			"Dunauskas Regimantas IVGb",
			"Paulius Šarūnas IVGb",
			"Puškorius Tadas IVGb",
			"Raminas Edvardas IVGb",
		],
	},
];

const toNiceTimeIndex = (num: number): string => (num >= 10 ? num : `0${num}`) + ".";

export const SchedulePageDesktop = () => {
	const { setLang, currentLang } = useContext(CurrentLangContext);

	useEffect(() => {
		console.log("currentLang", currentLang);
	}, [currentLang]);

	const t = useTranslation();

	const [selectedDay, setSelectedDay] = useState<ScheduleDayKind>(() => getTodaysScheduleDay({ defaultToDay: 0 }));

	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
	const [searchString, setSearchString] = useState<string>(participant.text || "");

	const navbarElement = useRef<HTMLElement>(null);
	const [navbarHeight, setNavbarHeight] = useState<number>(0);

	useLayoutEffect(() => {
		const height = navbarElement?.current?.clientHeight || 0;
		setNavbarHeight(height);
	}, [setNavbarHeight]);

	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;

				height: 100vh;
				max-height: 100vh;
				width: 100vw;
				max-width: 100vw;

				overflow: hidden; /** TODO investigate if actually works */
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
				<input
					type="search"
					name="search"
					className={css`
						font-size: 1.5em;
						max-width: 12em;
						padding: 0.3em 0.3em;
						/* padding: 0.5em 0.5em; */

						border: 0.125em solid #000;
						border-radius: 0.5em;
					`}
					value={searchString}
					onChange={(e) => setSearchString(e.target.value)}
					onFocus={(e) => e.target.select()}
				/>

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
						background: lightcyan;
						flex: 1;
						flex-shrink: 2;
					`}
				>
					<ul
						className={css`
							display: flex;
							flex-direction: column;

							align-items: center;
							justify-content: center;

							height: 100%;
							max-height: 100%;
							overflow: auto;

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

				{/* 2nd */}
				<nav
					className={css`
						background: lightgreen;
						flex: 2;
						flex-shrink: 1;
						/* flex: auto; */

						/* max-width: 100%;
						width: 100%; */
						/* max-height: 100%;
						height: 100%;
						overflow-x: hidden; */
						overflow-y: auto;
					`}
				>
					<ul
						className={css`
							display: flex;
							flex-direction: column;

							max-width: 100%;
							width: 100%;
							max-height: 100%;
							height: 100%;

							& > * + * {
								border-top: 1px solid #000;
							}

							& > * {
								flex: 1;
							}
						`}
					>
						{lessons.map((lesson) => {
							const { id, name, timeIndex, teachers, rooms } = lesson;
							return (
								<li
									key={id}
									className={css`
										position: relative;
									`}
								>
									<button
										key={id}
										type="button"
										onClick={(_e) => setSelectedLesson(lesson)}
										className={css`
											padding: 1em 2em;
											/* padding-left: 2em;
											padding-right: 2em;
											padding-top: 1.25em;
											padding-bottom: 1.25em; */

											width: 100%;
											height: 100%;
										`}
									>
										{timeIndex === selectedLesson?.timeIndex && (
											<div
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

										<div>
											<header
												className={css`
													display: flex;
													align-items: center;
													justify-content: space-between;

													& > * {
														font-size: 1.75em;
														font-weight: 700;
													}

													& > * + * {
														margin-left: 0.5em;
													}
												`}
											>
												<h1
													className={css`
														margin: 0;
														overflow: hidden;

														/** https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/ */
														white-space: nowrap;
														flex-wrap: nowrap;
														text-overflow: ellipsis;
													`}
												>
													{name}
												</h1>
												<span>{toNiceTimeIndex(timeIndex + 1)}</span>
											</header>

											{/* compact teacher & room; start/end times */}
											<div
												className={css`
													display: flex;
													justify-content: space-between;
													align-items: flex-end;

													margin-top: 0.5em;
												`}
											>
												<div
													className={css`
														text-align: left;

														& > * {
															margin: 0;
														}
													`}
												>
													<p>{t("toCompactString")(teachers)}</p>
													<p>{t("toCompactString")(rooms)}</p>
												</div>

												<div>
													<div>{getLessonStartTime(timeIndex)}</div>
													<Divider height="1px" />
													<div>{getLessonEndTime(timeIndex)}</div>
												</div>
											</div>
										</div>
									</button>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* 3rd */}
				<article
					className={css`
						background: lightskyblue;
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

const Divider: FC<{ height?: string }> = ({ height = "2px" }) => (
	<div
		className={css`
			height: ${height};
			background: #000;
		`}
	/>
);

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
			cursor: pointer;
		`}
		open={!!open}
	>
		{!!summary && (
			<summary
				className={css`
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
