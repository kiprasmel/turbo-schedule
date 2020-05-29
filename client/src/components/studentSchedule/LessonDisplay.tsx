/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { FC } from "react";
import { css } from "emotion";

import { Lesson } from "@turbo-schedule/common";

import { StrikeThrough } from "./StrikeThrough";
import { toNiceTimeIndex } from "../../utils/toNiceTimeIndex";
import { getLessonStartTime, getLessonEndTime } from "../../utils/getLessonTimes";
import { ParticipantListList } from "./ParticipantList";

interface Props {
	lesson: Lesson | null;
}

export const LessonDisplay: FC<Props> = ({ lesson }) => {
	if (!lesson) {
		return null;
	}

	const { name, timeIndex, teachers, rooms, students, classes, isEmpty } = lesson;

	return (
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
					<StrikeThrough shouldStrike={isEmpty}>{toNiceTimeIndex(timeIndex + 1)}</StrikeThrough>
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
			<ParticipantListList studentIds={students} teacherIds={teachers} roomIds={rooms} classIds={classes} />
		</section>
	);
};
