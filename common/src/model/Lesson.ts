export interface ILesson {
	isEmpty: boolean;
	dayIndex: number;
	timeIndex: number;
	id: string;

	name: string;
	teacher: string;
	room: string;

	students: Array<string>;
}

export class Lesson implements ILesson {
	isEmpty: boolean = true;
	dayIndex: number = -1;
	timeIndex: number = -1;
	id: string = "";

	name: string = "";
	teacher: string = "";
	room: string = "";

	students: Array<string> = [];

	constructor(data?: ILesson) {
		Object.assign(this, data);
	}
}
