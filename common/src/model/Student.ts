/* eslint-disable import/no-cycle */
import { Participant } from "./Participant";
import { TClassNum } from "./Class";
import { Lesson } from "./Lesson";

export interface StudentFromList extends Participant {
	id: string;

	text: string;
	originalHref: string;

	originalScheduleURI: string;

	firstName: string;
	lastName: string;
	fullName: string;

	/** BEGIN Class */
	classNum: TClassNum;
	classChar: string;
	fullClass: string /** TODO `className` */;

	classNumOrig: string;
	classCharOrig: string;
	fullClassOrig: string /** TODO `classNameOrig` */;
	/** END Class */
}

export interface Student extends StudentFromList {
	lessons: Lesson[];
}

export const getDefaultStudentFromList = (): StudentFromList => ({
	id: "",
	handle: "",

	text: "",
	originalHref: "",
	labels: [],

	originalScheduleURI: "",

	firstName: "",
	lastName: "",
	fullName: "",

	classNum: 0,
	classChar: "",
	fullClass: "",

	classNumOrig: "",
	classCharOrig: "",
	fullClassOrig: "",
});

export const getDefaultStudent = (): Student => ({
	...getDefaultStudentFromList(),
	lessons: [],
});
