/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css, cx } from "emotion";

import { useMostRecentlyViewedParticipantsSplit } from "../../hooks/useLRUCache";
import { Dictionary } from "../../i18n/i18n";
import { useTranslation } from "../../i18n/useTranslation";
import { parseStudentScheduleParams, syncStudentScheduleStateToURL } from "./url";

import { GroupedParticipants, ParticipantMix } from "./participant-search/participant-mix";
import { Participant } from "@turbo-schedule/common";
import { useSearchableParticipantGroups } from "./participant-search/searchable-participant-groups";
import { ParticipantLabelToTextToSnapshotObj, ParticipantToSnapshotsObj } from "@turbo-schedule/database";

interface Props {
	participants: ParticipantMix;
	doNotShowMostRecents?: boolean;
	searchString?: string;
	className?: string;
}

export const ParticipantListList: FC<Props> = ({ participants, doNotShowMostRecents = false, searchString, className, ...rest }) => {
	const t = useTranslation();

	const participantGroups: ParticipantLabelToTextToSnapshotObj = useSearchableParticipantGroups(participants, searchString);
	const { student, teacher, room, class: classs } = participantGroups;

	const isOnlyOneMatchingParticipant: boolean = false // TODO GLOBAL
		// students.length + teachers.length + rooms.length + classs.length === 1;

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

	// TODO FIXME - should show snapshots if avail, so that archive can select which one.
	const tempRemapParticipants = (obj: ParticipantToSnapshotsObj): string[] => Object.keys(obj)

	type Renderable = {
		summary: keyof Dictionary;
		participants: string[] /* ParticipantToSnapshotsObj */;
		recent: string[];
	};
	const renderables: Renderable[] = [
		{
			summary: "Students",
			participants: tempRemapParticipants(student),
			recent: doNotShowMostRecents ? [] : mostRecentStudents.filter(filter),
		},
		{
			summary: "Teachers",
			participants: tempRemapParticipants(teacher),
			recent: doNotShowMostRecents ? [] : mostRecentTeachers.filter(filter),
		},
		{
			summary: "Rooms",
			participants: tempRemapParticipants(room),
			recent: doNotShowMostRecents ? [] : mostRecentRooms.filter(filter),
		},
		{
			summary: "Classes",
			participants: tempRemapParticipants(classs),
			recent: doNotShowMostRecents ? [] : mostRecentClasses.filter(filter),
		},
	];

	return (
		<div
			className={cx(
				css`
					display: grid;

					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					font-size: 0.75em;

					& > * {
						margin-top: 2rem;
					}
				`,
				className,
			)}
			{...rest}
		>
			{renderables.map(({ summary, participants, recent }) => (
				<ParticipantList
					key={summary}
					participants={participants}
					mostRecentParticipants={recent}
					doNotShowMostRecents={doNotShowMostRecents}
					summary={`${t(summary)} (${participants.length})`}
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
		{!summary ? null : (
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
				className={styles.orderedList}
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
			className={styles.orderedList}
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

const styles = {
	orderedList: css`
		display: flex;
		flex-direction: column;

		& > * {
			list-style-type: decimal-leading-zero;
		}

		& > * + * {
			margin-top: 0.25em;
		}
	`,
};

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
