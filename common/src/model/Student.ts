import { Lesson } from "./Lesson";

export interface IStudent {
	href?: string;
	baseScheduleURI?: string;
	fullScheduleURI?: string;
	text?: string;
	lessons?: Lesson[];
}

export class Student implements IStudent {
	href: string = "";
	baseScheduleURI: string = "";
	fullScheduleURI: string = "";
	text: string = "";
	lessons: Lesson[] = [];

	constructor(data?: IStudent) {
		Object.assign(this, data);
	}
}
