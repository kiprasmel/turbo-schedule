import { Lesson } from "./Lesson";
import { Participant } from "./Participant";

export interface Availability {
	dayIndex: Lesson["dayIndex"];
	timeIndex: Lesson["timeIndex"];
	availableParticipants: Participant["text"][];
	bussyParticipants: Participant["text"][];
}
