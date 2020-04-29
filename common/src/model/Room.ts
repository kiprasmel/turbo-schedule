/* eslint-disable import/no-cycle */

import { Participant } from "./Participant";
import { Lesson } from "./Lesson";

export interface Room extends Participant {
	readonly id: string;

	readonly text: string;
	readonly originalHref: string;

	readonly originalScheduleURI: string;

	lessons?: Lesson[];
}

export const getDefaultRoom = (): Room => ({
	id: "",
	text: "",
	originalHref: "",
	originalScheduleURI: "",
	labels: [],
});
