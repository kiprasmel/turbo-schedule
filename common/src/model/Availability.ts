import { Lesson } from "./Lesson";
import { Participant } from "./Participant";

export type MinimalLesson = Pick<Lesson, "id" | "name">;

export interface Availability {
	dayIndex: Lesson["dayIndex"];
	timeIndex: Lesson["timeIndex"];
	availableParticipants: { participant: Participant["text"]; lesson: MinimalLesson }[];
	bussyParticipants: { participant: Participant["text"]; lesson: MinimalLesson }[];
}
