/* eslint-disable import/no-cycle */
import { StudentFromList } from "./Student";
import { Class } from "./Class";
import { Teacher } from "./Teacher";
import { Room } from "./Room";
import { getSpecificScheduleURI } from "./Schedule";
import { Lesson } from "./Lesson";

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

type Duplicate = [Participant["text"], Lesson];

/**
 * should return an empty array, but sometimes,
 * if the upstream messes up, this might find some duplicates
 */
export const findParticipantsWithDuplicateLessons = (participants: Participant[], lessons: Lesson[]): Duplicate[] => {
	const dupes: Duplicate[] = [];

	participants.forEach((participant) => {
		const myLessons: Map<Lesson["id"], Lesson> = new Map();

		lessons.filter(participantHasLesson(participant)).forEach((lesson) => {
			if (myLessons.has(lesson.id)) {
				dupes.push([participant.text, lesson]);
			}

			myLessons.set(lesson.id, lesson);
		});
	});

	return dupes;
};
