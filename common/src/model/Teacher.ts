import { Lesson } from "./Lesson";
import { Student } from "./Student";
import { getSpecificScheduleURI } from "./Schedule";

export interface Teacher {
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
	text: "",
	originalHref: "",
	originalScheduleURI: "",
	firstName: "",
	lastName: "",
	fullName: "",
});

export interface TeacherInitData extends Partial<Teacher> {
	text: string;
	originalHref: string;
}

export const createTeacher = (data: TeacherInitData = { text: "", originalHref: "" }): Teacher => {
	const text = data.text.trim();
	const originalHref = data.originalHref.trim();
	const originalScheduleURI = getSpecificScheduleURI(originalHref.trim());

	const splitText = text.split(" ");
	const firstName = splitText.slice(-1).join(" ");
	const lastName = splitText.slice(0, -1).join(" ");
	const fullName = text;

	const teacher: Teacher = {
		id: text /** TODO ID */,
		text,
		originalHref,
		originalScheduleURI,
		firstName,
		lastName,
		fullName,
	};

	return teacher;
};
