/* eslint-disable import/no-cycle */
import { StudentFromList } from "./Student";
import { Class } from "./Class";
import { Teacher } from "./Teacher";
import { Room } from "./Room";
import { getSpecificScheduleURI } from "./Schedule";
import { Lesson } from "./Lesson";
import { Availability, MinimalLesson } from "./Availability";

import { mergeBy, MergeStrategy } from "../util/mergeBy";

export type ParticipantType = StudentFromList | Class | Teacher | Room;

export type ParticipantLabel = "student" | "class" | "teacher" | "room";

export interface ParticipantInLesson {
	text: string /** TODO `name` */;
	isActive: boolean;
	labels: ParticipantLabel[];
}

export type ParticipantInitData = Omit<Participant, "originalScheduleURI">;

export interface Participant {
	text: string;
	originalHref: string;
	originalScheduleURI: string;
	labels: ParticipantLabel[];

	lessons?: Lesson[];
}

export type WantedParticipant = Pick<Participant, "text" | "labels">;

export const getDefaultParticipantLean = (): ParticipantInLesson => ({
	text: "",
	isActive: false,
	labels: [],
});

export const getDefaultParticipant = (): Participant => ({
	// ...getDefaultScrapable(),
	text: "",
	originalHref: "",
	originalScheduleURI: getSpecificScheduleURI(""),
	labels: [],
});

const mergeStrat: MergeStrategy<ParticipantInLesson> = (left, right): ParticipantInLesson => ({
	...left,
	labels: [...new Set([...left.labels, ...right.labels])],
});

export const mergeDuplicateParticipantsInLessons = mergeBy("text", mergeStrat);

export const participantHasLesson = (participant: Participant) => (lesson: Lesson): boolean =>
	lesson.students.includes(participant.text) ||
	lesson.classes.includes(participant.text) ||
	lesson.teachers.includes(participant.text) ||
	lesson.rooms.includes(participant.text);

type DayTimeId = string;
type Duplicates = Record<Participant["text"], Record<DayTimeId, Lesson[]>>;

/**
 * should return an empty object, but sometimes,
 * if the upstream messes up, this might find some duplicates
 */
export const findParticipantsWithMultipleLessonsInSameTime = (
	participants: Participant[], //
	lessons: Lesson[]
): Duplicates => {
	/**
	 * duplciate candidates.
	 *
	 * collect all lessons for a participant at every day & time combination,
	 * and keep those that had more than 1 lesson in the same day & time
	 */
	const dupes: Duplicates = {};

	participants.forEach((participant) => {
		dupes[participant.text] = {};

		lessons.filter(participantHasLesson(participant)).forEach((lesson) => {
			const dayTimeId: DayTimeId = [lesson.timeIndex, lesson.dayIndex].join("/");

			if (!dupes[participant.text][dayTimeId]) {
				dupes[participant.text][dayTimeId] = [];
			}

			dupes[participant.text][dayTimeId].push(lesson);
		});

		/** it's a duplicate if there's more than 1 lesson in the same time */
		const confirmedDuplicates = Object.entries(dupes[participant.text]).filter(
			([_key, duplicateLessons]) => duplicateLessons.length > 1
		);

		if (confirmedDuplicates.length === 0) {
			delete dupes[participant.text];
		} else {
			dupes[participant.text] = Object.fromEntries(confirmedDuplicates);
		}
	});

	return dupes;
};

export type ParticipantCommonAvailability = {
	minDayIndex: number;
	maxDayIndex: number;
	minTimeIndex: number;
	maxTimeIndex: number;
	availability: Availability[][];
};

export type AvailabilityParticipant = {
	participant: Participant["text"];
	lesson: MinimalLesson;
};

export function computeCommonAvailability(
	lessons: Lesson[], //
	wantedParticipants: Participant["text"][]
): ParticipantCommonAvailability {
	const minDayIndex = lessons.reduce((prevMin, curr) => Math.min(prevMin, curr.dayIndex), Infinity);
	const maxDayIndex = lessons.reduce((prevMax, curr) => Math.max(prevMax, curr.dayIndex), 0);

	const minTimeIndex = lessons.reduce((prevMin, curr) => Math.min(prevMin, curr.timeIndex), Infinity);
	const maxTimeIndex = lessons.reduce((prevMax, curr) => Math.max(prevMax, curr.timeIndex), 0);

	const availability: Availability[][] = [];

	/**
	 * O(fast enough)
	 */
	for (let i = minDayIndex; i <= maxDayIndex; i++) {
		availability[i] = [];

		for (let j = minTimeIndex; j <= maxTimeIndex; j++) {
			const related: Lesson[] = lessons.filter((l) => l.dayIndex === i && l.timeIndex === j);

			/**
			 * there could be multiple participants in the same lesson,
			 * thus account for them all, not once.
			 */
			const getParticipants = (filterPred: (l: Lesson) => boolean): AvailabilityParticipant[] => [
				...new Set(
					related.filter(filterPred).flatMap((l) =>
						[l.students, l.teachers, l.classes, l.rooms].flatMap((participants) =>
							participants
								.filter((participant) => wantedParticipants.includes(participant))
								.map(
									(participant): AvailabilityParticipant => ({
										participant,
										lesson: {
											id: l.id,
											name: l.name,
										},
									})
								)
						)
					)
				),
			];

			let availableParticipants = getParticipants((l) => l.isEmpty);
			const bussyParticipants = getParticipants((l) => !l.isEmpty);

			/**
			 * TODO FIXME HACK:
			 *
			 * The scraper is messed up for some edge cases (upstream -_-),
			 * and there might be duplicate lessons, some not properly scraped.
			 *
			 * We know for a fact, though, that if a participant is bussy,
			 * it cannot be available -- this fixes the issue (temporarily),
			 * before we fix the underlying issue.
			 *
			 */
			availableParticipants = availableParticipants.filter(
				(p) => !bussyParticipants.some((bussyP) => p.participant === bussyP.participant)
			);

			availability[i][j] = {
				dayIndex: i, //
				timeIndex: j,
				availableParticipants,
				bussyParticipants,
			};
		}
	}

	return {
		minDayIndex, //
		maxDayIndex,
		minTimeIndex,
		maxTimeIndex,
		availability,
	};
}
