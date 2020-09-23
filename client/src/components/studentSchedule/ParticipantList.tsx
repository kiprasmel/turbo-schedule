/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css } from "emotion";

import { Student, Teacher, Room, Class, Participant, parseParticipants } from "@turbo-schedule/common";

import { Link } from "react-router-dom";
import { useTranslation } from "../../i18n/useTranslation";

interface Props {
	participants:
		| Participant[]
		| {
				students: Student["text"][];
				teachers: Teacher["text"][];
				rooms: Room["text"][];
				classes: Class["text"][];
		  };
	className?: string;
}

export const ParticipantListList: FC<Props> = ({ participants, className, ...rest }) => {
	const t = useTranslation();

	console.log("participants", participants);

	const { students, teachers, rooms, classes } = Array.isArray(participants)
		? parseParticipants(participants)
		: participants;

	const isOnlyOneMatchingParticipant: boolean =
		students.length + teachers.length + rooms.length + classes.length === 1;

	return (
		<div
			className={[
				css`
					display: grid;

					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					font-size: 0.75em;

					& > * + * {
						margin-top: 2rem;
					}
				`,
				className,
			].join(" ")}
			{...rest}
		>
			<ParticipantList
				participants={students}
				summary={t("Students") + ` (${students.length})`}
				isOnlyOneMatchingParticipant={isOnlyOneMatchingParticipant}
			/>
			<ParticipantList
				participants={teachers}
				summary={t("Teachers") + ` (${teachers.length})`}
				isOnlyOneMatchingParticipant={isOnlyOneMatchingParticipant}
			/>
			<ParticipantList
				participants={rooms}
				summary={t("Rooms") + ` (${rooms.length})`}
				isOnlyOneMatchingParticipant={isOnlyOneMatchingParticipant}
			/>
			<ParticipantList
				participants={classes}
				summary={t("Classes") + ` (${classes.length})`}
				isOnlyOneMatchingParticipant={isOnlyOneMatchingParticipant}
			/>
		</div>
	);
};

const ParticipantList: FC<{
	participants: string[];
	summary?: string;
	open?: boolean;
	isOnlyOneMatchingParticipant?: boolean;
}> = ({ participants = [], summary = "", open = true, isOnlyOneMatchingParticipant = false }) => (
	<details
		className={css`
			margin-left: auto;
			margin-right: auto;

			text-align: left;
			font-size: 1.5em;

			outline: none;
		`}
		open={!!open}
	>
		{!!summary && (
			<summary
				className={css`
					cursor: pointer;

					outline: none;
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
				<li
					key={p}
					className={css`
						${isOnlyOneMatchingParticipant && "font-weight: 600; font-size: 1.69rem;"}
					`}
				>
					<Link
						to={`/${p}`}
						className={css`
							${isOnlyOneMatchingParticipant && "border-bottom: 3px solid #000;"}
						`}
					>
						{p}
					</Link>
				</li>
			))}
		</ol>
	</details>
);
