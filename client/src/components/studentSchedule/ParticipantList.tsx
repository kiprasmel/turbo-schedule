/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css } from "emotion";

import { useMostRecentlyViewedParticipantsSplit } from "../../hooks/useLRUCache";
import { Dictionary } from "../../i18n/i18n";
import { useTranslation } from "../../i18n/useTranslation";
import { parseStudentScheduleParams, syncStudentScheduleStateToURL } from "./url";

import { GroupedParticipants, ParticipantMix } from "./participant-search/participant-mix";
import { Participant } from "@turbo-schedule/common";
import { useSearchableParticipantGroups } from "./participant-search/searchable-participant-groups";

interface Props {
	participants: ParticipantMix;
	doNotShowMostRecents?: boolean;
	searchString?: string;
	className?: string;
}

export const ParticipantListList: FC<Props> = ({ participants, doNotShowMostRecents = false, searchString, className, ...rest }) => {
	const t = useTranslation();

	const participantGroups = useSearchableParticipantGroups(participants, searchString);
	const { students, teachers, rooms, classes } = participantGroups;

	const isOnlyOneMatchingParticipant: boolean =
		students.length + teachers.length + rooms.length + classes.length === 1;

	const {
		mostRecentStudents, //
		mostRecentTeachers,
		mostRecentRooms,
		mostRecentClasses,
	} = useMostRecentlyViewedParticipantsSplit();

	const filter = (recentP: string) =>
		(participants as Participant[])?.map?.((p) => p.text).includes(recentP) ??
		Object.values(participants as GroupedParticipants)
			.flat()
			.includes(recentP);

	const renderables: { summary: keyof Dictionary; participantStrings: string[]; recent: string[] }[] = [
		{
			summary: "Students",
			participantStrings: students,
			recent: doNotShowMostRecents ? [] : mostRecentStudents.filter(filter),
		},
		{
			summary: "Teachers",
			participantStrings: teachers,
			recent: doNotShowMostRecents ? [] : mostRecentTeachers.filter(filter),
		},
		{
			summary: "Rooms",
			participantStrings: rooms,
			recent: doNotShowMostRecents ? [] : mostRecentRooms.filter(filter),
		},
		{
			summary: "Classes",
			participantStrings: classes,
			recent: doNotShowMostRecents ? [] : mostRecentClasses.filter(filter),
		},
	];

	return (
		<div
			className={[
				css`
					display: grid;

					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					font-size: 0.75em;

					& > * {
						margin-top: 2rem;
					}
				`,
				className,
			].join(" ")}
			{...rest}
		>
			{renderables.map(({ summary, participantStrings, recent }) => (
				<ParticipantList
					key={summary}
					participants={participantStrings}
					mostRecentParticipants={recent}
					doNotShowMostRecents={doNotShowMostRecents}
					summary={`${t(summary)  } (${participantStrings.length})`}
					isOnlyOneMatchingParticipant={isOnlyOneMatchingParticipant}
				/>
			))}
		</div>
	);
};

const ParticipantList: FC<{
	participants: string[];
	mostRecentParticipants?: string[];
	doNotShowMostRecents?: boolean;
	summary?: string;
	open?: boolean;
	isOnlyOneMatchingParticipant?: boolean;
}> = ({
	participants = [], //
	mostRecentParticipants = [],
	doNotShowMostRecents = false,
	summary = "",
	open = true,
	isOnlyOneMatchingParticipant = false,
}) => (
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

		{/**
			recently viewed participant list

			disabled if there's only one match,
			since there'd be a duplicate
		*/}
		{doNotShowMostRecents || isOnlyOneMatchingParticipant || participants.length <= 1 ? null : (
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
				{mostRecentParticipants.map((p) => (
					<ParticipantListItem
						key={p} //
						participant={p}
						isOnlyOneMatchingParticipant={isOnlyOneMatchingParticipant}
					/>
				))}
			</ol>
		)}

		{/* regular full participant list */}
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
				<ParticipantListItem
					key={p} //
					participant={p}
					isOnlyOneMatchingParticipant={isOnlyOneMatchingParticipant}
				/>
			))}
		</ol>
	</details>
);

export const ParticipantListItem: FC<{
	participant: string;
	isOnlyOneMatchingParticipant?: boolean;
}> = ({
	participant, //
	/** TODO: enable back (needs to be made global) */
	// isOnlyOneMatchingParticipant = false,
	children,
}) => (
		<li
			key={participant}
			// className={css`
			// 	${isOnlyOneMatchingParticipant && "font-weight: 600; font-size: 1.69rem;"}
			// 	${isOnlyOneMatchingParticipant && "border-bottom: 3px solid #000;"}
			// `}
		>
			<button
				type="button"
				onClick={() => syncStudentScheduleStateToURL({
					participant,
					snapshot: parseStudentScheduleParams(participant).snapshot,
					day: undefined,
					time: undefined,
				})}
			>
				{participant}
				{(children as unknown) as any}
			</button>
		</li>
	);
