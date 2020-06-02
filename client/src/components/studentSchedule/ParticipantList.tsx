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
}

/** TODO use a `table` instead? */
export const ParticipantListList: FC<Props> = ({ participants }) => {
	const t = useTranslation();

	console.log("participants", participants);

	const { students, teachers, rooms, classes } = Array.isArray(participants)
		? parseParticipants(participants)
		: participants;

	return (
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
			<ParticipantList participants={students} summary={t("Students") + ` (${students.length})`} />
			<ParticipantList participants={teachers} summary={t("Teachers") + ` (${teachers.length})`} />
			<ParticipantList participants={rooms} summary={t("Rooms") + ` (${rooms.length})`} />
			<ParticipantList participants={classes} summary={t("Classes") + ` (${classes.length})`} />
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
				<li key={p}>
					<Link to={p}>{p}</Link>
				</li>
			))}
		</ol>
	</details>
);
