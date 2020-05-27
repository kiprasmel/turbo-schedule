/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css } from "emotion";

import { Lesson } from "@turbo-schedule/common";

import { Divider } from "./Divider";
import { useTranslation } from "../../i18n/useTranslation";
import { ScheduleDay } from "../../utils/selectSchedule";
import { toNiceTimeIndex } from "../../utils/toNiceTimeIndex";
import { getLessonStartTime, getLessonEndTime } from "../../utils/getLessonTimes";

export const LessonsList: FC<{
	lessons: Lesson[];
	selectedDay: ScheduleDay;
	selectedLesson: Lesson | null;
	handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, lesson: Lesson) => any;
}> = ({ lessons = [], selectedDay, selectedLesson, handleClick }) => (
	<nav
		className={css`
			/* background: lightgreen; */
			flex: 2;
			flex-shrink: 1;
			/* flex: auto; */

			min-width: 20em;

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
			{lessons
				.filter((l) => l.dayIndex === selectedDay)
				.map((lesson) => (
					<LessonsListItem
						key={lesson.id}
						lesson={lesson}
						selectedLesson={selectedLesson}
						handleClick={handleClick}
					/>
				))}
		</ul>
	</nav>
);

const LessonsListItem: FC<{
	lesson: Lesson;
	selectedLesson: Lesson | null;
	handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, lesson: Lesson) => any;
}> = ({ lesson, selectedLesson, handleClick }) => {
	const t = useTranslation();

	const { id, name, timeIndex, teachers, rooms } = lesson;

	return (
		<li
			className={css`
				position: relative;
			`}
		>
			<button
				key={id}
				type="button"
				onClick={(e) => {
					handleClick(e, lesson);
				}}
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
							<p
								className={css`
									margin: 0;
								`}
							>
								{getLessonStartTime(timeIndex)}
							</p>
							<Divider height="1px" />
							<p
								className={css`
									margin: 0;
								`}
							>
								{getLessonEndTime(timeIndex)}
							</p>
						</div>
					</div>
				</div>
			</button>
		</li>
	);
};
