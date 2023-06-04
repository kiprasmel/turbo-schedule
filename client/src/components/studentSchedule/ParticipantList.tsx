/* eslint-disable react/prop-types */

import React, { FC } from "react";
import { css } from "emotion";

import { Student, Teacher, Room, Class, Participant, parseParticipants } from "@turbo-schedule/common";

import { useMostRecentlyViewedParticipantsSplit } from "../../hooks/useLRUCache";
import { Dictionary } from "../../i18n/i18n";
import { useTranslation } from "../../i18n/useTranslation";
import { createLinkToLesson } from "./LessonsList";
import { getDesiredPath, navigateToDesiredPath } from "./StudentSchedule";
import { IScheduleDays } from "../../utils/selectSchedule";

type MehParticipants = {
	students: Student["text"][];
	teachers: Teacher["text"][];
	rooms: Room["text"][];
	classes: Class["text"][];
};

interface Props {
	participants: Participant[] | MehParticipants;
	className?: string;
	snapshot?: string;
}

export const ParticipantListList: FC<Props> = ({ participants, className, snapshot, ...rest }) => {
	const t = useTranslation();

	console.log("participants", participants);

	const { students, teachers, rooms, classes } = Array.isArray(participants)
		? parseParticipants(participants)
		: participants;

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
		Object.values(participants as MehParticipants)
			.flat()
			.includes(recentP);

	const renderables: { summary: keyof Dictionary; participantStrings: string[]; recent: string[] }[] = [
		{
			summary: "Students",
			participantStrings: students,
			recent: mostRecentStudents.filter(filter),
		},
		{
			summary: "Teachers",
			participantStrings: teachers,
			recent: mostRecentTeachers.filter(filter),
		},
		{
			summary: "Rooms",
			participantStrings: rooms,
			recent: mostRecentRooms.filter(filter),
		},
		{
			summary: "Classes",
			participantStrings: classes,
			recent: mostRecentClasses.filter(filter),
		},
	];

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
			{renderables.map(({ summary, participantStrings, recent }) => (
				<ParticipantList
					key={summary}
					participants={participantStrings}
					mostRecentParticipants={recent}
					summary={`${t(summary)  } (${participantStrings.length})`}
					isOnlyOneMatchingParticipant={isOnlyOneMatchingParticipant}
					snapshot={snapshot}
				/>
			))}
		</div>
	);
};

const ParticipantList: FC<{
	participants: string[];
	mostRecentParticipants?: string[];
	summary?: string;
	open?: boolean;
	isOnlyOneMatchingParticipant?: boolean;
	snapshot?: string;
}> = ({
	participants = [], //
	mostRecentParticipants = [],
	summary = "",
	open = true,
	isOnlyOneMatchingParticipant = false,
	snapshot,
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
		{isOnlyOneMatchingParticipant || participants.length <= 1 ? null : (
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
						snapshot={snapshot}
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
					snapshot={snapshot}
				/>
			))}
		</ol>
	</details>
);

export const ParticipantListItem: FC<{
	participant: string;
	isOnlyOneMatchingParticipant?: boolean;
	dayIndex?: number;
	timeIndex?: number;
	highlightInsteadOfOpen?: boolean;
	snapshot?: string;
}> = ({
	participant, //
	isOnlyOneMatchingParticipant = false,
	dayIndex,
	timeIndex,
	highlightInsteadOfOpen = true,
	snapshot,
	children,
}) => {
	const linkOld: string = createLinkToLesson(participant, dayIndex, timeIndex, highlightInsteadOfOpen);
	const linkNew: string = getDesiredPath({
		studentName: participant,
		day: dayIndex as keyof IScheduleDays,
		timeIndex,
		shouldShowTheLesson: true,
		snapshot,
	})!;

	console.log({linkOld, linkNew, snapshot, participant});

	return(
		<li
			key={participant}
			className={css`
				${isOnlyOneMatchingParticipant && "font-weight: 600; font-size: 1.69rem;"}
				${isOnlyOneMatchingParticipant && "border-bottom: 3px solid #000;"}
			`}
		>
			{/* <Link to={linkNew} onClick={() => { */}
			<button type="button" onClick={() => {
				navigateToDesiredPath({
					studentName: participant,
					day: dayIndex as keyof IScheduleDays,
					timeIndex,
					shouldShowTheLesson: false,
					snapshot,
				});
			}}>
				{participant}
				{(children as unknown) as any}
			</button>
		</li>
	);
};
