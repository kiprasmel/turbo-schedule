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
