/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css } from "emotion";

import { Student, Teacher, Room, Class } from "@turbo-schedule/common";

import { useTranslation } from "../../i18n/useTranslation";

interface Props {
	studentIds: Student["text"][];
	teacherIds: Teacher["text"][];
	roomIds: Room["text"][];
	classIds: Class["text"][];
}

export const ParticipantListList: FC<Props> = ({ studentIds, teacherIds, roomIds, classIds }) => {
	const t = useTranslation();

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
			<ParticipantList participants={studentIds} summary={t("Students") + ` (${studentIds.length})`} />
			<ParticipantList participants={teacherIds} summary={t("Teachers") + ` (${teacherIds.length})`} />
			<ParticipantList participants={roomIds} summary={t("Rooms") + ` (${roomIds.length})`} />
			<ParticipantList participants={classIds} summary={t("Classes") + ` (${classIds.length})`} />
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
