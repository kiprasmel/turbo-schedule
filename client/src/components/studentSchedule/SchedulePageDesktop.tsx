/** TODO a11y */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "emotion";

import { Lesson, StudentFromList } from "@turbo-schedule/common";

import { availableLangs, useTranslation } from "../../i18n/i18n";

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
		timeIndex: 5,
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
];

const toNiceTimeIndex = (num: number): string => (num >= 10 ? num : `0${num}`) + ".";

const toCompactString = (items: string[]): string =>
	items.length > 1 ? `${items[0]} and ${items.length - 1} more` : items[0];

export const SchedulePageDesktop = () => {
	const t = useTranslation();
	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
	const [searchString, setSearchString] = useState<string>(participant.text || "");

	return (
		<div
			className={css`
				display: flex;
				flex-direction: column;

				height: 100vh;
				max-height: 100vh;
				overflow: hidden; /** TODO investigate if actually works */
			`}
		>
			<nav
				className={css`
					/* background: red; */
					/* flex: 0 1 auto; */

					min-height: 3.75em;
					height: 3.75em;

					display: flex;
					align-items: center;
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
					{t("Turbo Schedule")}
				</h1>
				<input
					type="search"
					name="search"
					className={css`
						/* display: inline-block; */
						max-width: 12em;

						font-size: 1.25em;

						padding: 0.25em 0.25em;

						/* padding-top: 0.75em;
						padding-bottom: 0.75em; */

						border: 0.125em solid #000;
						border-radius: 0.5em;
					`}
					value={searchString}
					onChange={(e) => setSearchString(e.target.value)}
					onFocus={(e) => e.target.select()}
				/>
				{/* </div> */}
				<ul
					className={css`
						flex-grow: 1;

						display: flex;
						align-items: center;

						& > * + * {
							margin-left: 2em;
						}

						font-size: 1.2em;
					`}
				>
					<li>
						<Link
							to={`/${participant.text}`}
							className={css`
								border-bottom: 0.125em solid #000;
								font-weight: bold;
							`}
						>
							Schedule
						</Link>
					</li>
					<li>
						<Link to={`/${participant.text}/stats`}>Statistics</Link>
					</li>
					<li
						className={css`
							margin-left: auto;
						`}
					>
						<Link to="/about">About</Link>
					</li>
					<li>
						<a href="https://github.com/sarpik/turbo-schedule" target="_blank" rel="noopener">
							GitHub
						</a>
					</li>
					<li>
						<select name="lang" id="lang">
							{availableLangs.map((lang) => (
								<option
									value={lang}
									className={css`
										text-transform: uppercase;
									`}
								>
									{/* {lang} */}
								</option>
							))}
						</select>
					</li>
				</ul>
			</nav>

			<main
				className={css`
					background: green;
					flex-grow: 1;
				`}
			>
				<nav>
					<ul>
						<li>*</li>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
					</ul>
				</nav>

				<nav>
					<ul>
						{lessons.map((lesson) => {
							const { name, timeIndex, teachers, rooms } = lesson;
							return (
								<li>
									<div onClick={(_e) => setSelectedLesson(selectedLesson)}>
										<header>
											<h1>{name}</h1>
											<span>{toNiceTimeIndex(timeIndex + 1)}</span>
										</header>
										<div>
											<p>{toCompactString(teachers)}</p>
											<p>{toCompactString(rooms)}</p>

											<div>
												<span>{getLessonStartTime(timeIndex)}</span>
												<span />
												<span>{getLessonEndTime(timeIndex)}</span>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</nav>

				{selectedLesson &&
					(({ name, timeIndex, teachers, rooms, students }: Lesson) => (
						<article>
							<section>
								<header>
									<h1>{name}</h1>
									<span>{toNiceTimeIndex(timeIndex + 1)}</span>
								</header>
								<div>
									<p>{toCompactString(teachers)}</p>
									<p>{toCompactString(rooms)}</p>

									<div>
										<span>{getLessonStartTime(timeIndex)}</span>
										<span />
										<span>{getLessonEndTime(timeIndex)}</span>
									</div>
								</div>
							</section>

							<ul>
								{students.map((student) => (
									<li>{student}</li>
								))}
							</ul>
						</article>
					))(selectedLesson)}
			</main>
		</div>
	);
};
