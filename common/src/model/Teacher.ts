/* eslint-disable import/no-cycle */
import { Participant } from "./Participant";
import { Lesson } from "./Lesson";
import { Student } from "./Student";

export interface Teacher extends Participant {
	readonly id: string;

	readonly text: string;
	readonly originalHref: string;

	readonly originalScheduleURI: string;

	readonly firstName: string;
	readonly lastName: string;
	readonly fullName: string;

	lessons?: Lesson[];
	students?: Student[];
}

export const getDefaultTeacher = (): Teacher => ({
	id: "",
	handle: "",
	text: "",
	originalHref: "",
	originalScheduleURI: "",
	labels: [],
	firstName: "",
	lastName: "",
	fullName: "",
});
