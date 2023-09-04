/* eslint-disable max-classes-per-file */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-cycle */

import { ParticipantInLesson, Participant, mergeDuplicateParticipantsInLessons } from "./Participant";
import { Student } from "./Student";
import { Teacher } from "./Teacher";
import { Room } from "./Room";
import { Class } from "./Class";

import { mergeBy, MergeStrategy } from "../util/mergeBy";

export interface LessonInitData {
	isEmpty: boolean;
	dayIndex: number;
	timeIndex: number;

	name: string;

	participants: ParticipantInLesson[];
}

/**
 * TODO RENAME to `LessonWithParticipants`
 */
export interface NonUniqueLesson {
	id: string;

	isEmpty: boolean;
	dayIndex: number;
	timeIndex: number;

	name: string;

	/** @deprecated use `teachers` instead! */
	teacher: string;

	/** @deprecated use `rooms` instead! */
	room: string;

	participants: ParticipantInLesson[];
}

export interface Lesson extends Omit<NonUniqueLesson, "participants"> {
	students: Array<Student["id"]>;
	classes: Array<Class["id"]>;
	teachers: Array<Teacher["id"]>;
	rooms: Array<Room["id"]>;
}

export const ParticipantKindsInLesson: readonly ("students" | "classes" | "teachers" | "rooms")[] = ["students", "classes", "teachers", "rooms"]

export const getDefaultNonUniqueLesson = (): NonUniqueLesson => ({
	id: "",

	isEmpty: true,
	dayIndex: -1,
	timeIndex: -1,

	name: "",
	teacher: "",
	room: "",

	participants: [],
});

/** TODO */
export const getDefaultLesson = (): Lesson => ({
	...getDefaultNonUniqueLesson(),
	students: [],
	classes: [],
	teachers: [],
	rooms: [],
});

export const p2students = (participants: (Participant | ParticipantInLesson)[]): string[] => [
	// ...new Set([...participants.filter((p) => p.labels.includes("student")).map((p) => p.text)]),
	...new Set([...participants.filter((p) => p.labels[0] === "student").map((p) => p.text)]),
];

export const p2classes = (participants: (Participant | ParticipantInLesson)[]): string[] => [
	// ...new Set([...participants.filter((p) => p.labels.includes("class")).map((p) => p.text)]),
	...new Set([...participants.filter((p) => p.labels[0] === "class").map((p) => p.text)]),
];

export const p2teachers = (participants: (Participant | ParticipantInLesson)[]): string[] => [
	// ...new Set([...participants.filter((p) => p.labels.includes("teacher")).map((p) => p.text)]),
	...new Set([...participants.filter((p) => p.labels[0] === "teacher").map((p) => p.text)]),
];

export const p2rooms = (participants: (Participant | ParticipantInLesson)[]): string[] => [
	// ...new Set([...participants.filter((p) => p.labels.includes("room")).map((p) => p.text)]),
	...new Set([...participants.filter((p) => p.labels[0] === "room").map((p) => p.text)]),
];

export type TParseParticipants = {
	[key in "students" | "teachers" | "rooms" | "classes" | "allParticipants"]: string[];
};

export const parseParticipants = (participants: Participant[]): TParseParticipants => {
	const ret: TParseParticipants = {
		students: [], //
		teachers: [],
		rooms: [],
		classes: [],
		allParticipants: [],
	};

	participants.forEach((p) => {
		const kind = p.labels[0];

		ret["allParticipants"].push(p.text);

		if (kind === "student") ret.students.push(p.text);
		else if (kind === "teacher") ret.teachers.push(p.text);
		else if (kind === "class") ret.classes.push(p.text);
		else if (kind === "room") ret.rooms.push(p.text);
		else throw new Error("Invalid kind");
	});

	return ret;
};

export const getParticipantCount = ({ students, classes, teachers, rooms }: Lesson): number =>
	students.length + classes.length + teachers.length + rooms.length;

/**
 * the id:
 * * WILL NOT BE unique, IF a {NonUniqueLesson} is passed in;
 * * WILL     BE unique, IF a {Lesson}          is passed in.
 */
export const createLessonWithParticipantsId = (lesson: NonUniqueLesson): string => {
	const { isEmpty, dayIndex, timeIndex, name } = lesson;

	/**
	 * Do not use `teacher`, `room` (or `students`) (any participants in general)
	 * when creating the `id` of the lesson, since the upstream is bogus
	 * and it excludes the participant from the list if we're viewing their schedule
	 *
	 * e.g. if we're looking at participant class "8a", lessons with multiple participants
	 * will not show "8a" in their participant list (nor their respective teacher or room).
	 *
	 * Gladly, the `name` seems to stay the same always.
	 *
	 */
	const id: string = `${isEmpty}/${dayIndex}/${timeIndex}/${name}`;
	return id;
};

export const createLessonWithParticipants = (data: LessonInitData = getDefaultNonUniqueLesson()): NonUniqueLesson => {
	const { participants } = data;

	const teachers = p2teachers(participants);
	const rooms = p2rooms(participants);

	/** @deprecated - only for backwards compatibility */
	const teacher = teachers.join(", ").trim();

	/** @deprecated - only for backwards compatibility */
	const room = rooms.join(", ").trim();

	const almostLesson: Omit<NonUniqueLesson, "id"> = {
		...data,

		teacher,
		room,
	};

	const id: string = createLessonWithParticipantsId(almostLesson as NonUniqueLesson);

	return {
		...almostLesson,
		id,
	};
};

export const createLesson = (data: NonUniqueLesson = getDefaultNonUniqueLesson()): Lesson => {
	const { participants, ...rest } = data;

	const teachers = p2teachers(participants);
	const rooms = p2rooms(participants);
	const classes = p2classes(participants);
	const students = p2students(participants);

	return {
		...rest,
		teachers,
		rooms,
		classes,
		students,
	};
};

/**
 * sorts the lessons array,
 * first by the day index,
 * then by the time index.
 *
 * Earlier day / earlier time comes first.
 *
 * TODO refactor `A.dayIndex - B.dayIndex || A.timeIndex - B.timeIndex`
 *
 */
export const sortLessons = (lessons: NonUniqueLesson[]): NonUniqueLesson[] =>
	[...lessons].sort((A: NonUniqueLesson, B: NonUniqueLesson) => {
		if (A.dayIndex < B.dayIndex) {
			return -1;
		}
		if (A.dayIndex > B.dayIndex) {
			return 1;
		}
		if (A.timeIndex < B.timeIndex) {
			return -1;
		}
		if (A.timeIndex > B.timeIndex) {
			return 1;
		}
		return 0;
	});

const mergeDuplicateLessonsStrat: MergeStrategy<NonUniqueLesson> = (left, right) => ({
	...left,
	participants: mergeDuplicateParticipantsInLessons([...left.participants, ...right.participants]),
});

/**
 * before:
 *
 * ```json
 * lessons: [
 *   { id: "Physics", participants: [ "Alice" ] },
 *   { id: "Maths"  , participants: [ "Alice" ] },
 *   { id: "Maths",   participants: [ "Bob"   ] },
 *   { id: "Dances" , participants: [ "Bob"   ] }
 * ]
 * ```
 *
 * after:
 *
 * ```json
 * lessons: [
 *   { id: "Maths"  , participants: ["Alice", "Bob"] },
 *   { id: "Physics", participants: ["Alice"       ] },
 *   { id: "Dances" , participants: [         "Bob"] }
 * ]
 * ```
 *
 */
export const mergeDuplicateLessons = mergeBy("id", mergeDuplicateLessonsStrat);

export const makeLessonsUnique = (nonUniqueLessons: NonUniqueLesson[] = []): Lesson[] => {
	const merged = mergeDuplicateLessons(nonUniqueLessons);

	const sorted = sortLessons(merged);

	const finished = sorted.map(createLesson);

	return finished;
};
