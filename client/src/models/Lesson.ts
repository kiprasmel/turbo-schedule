/** TODO - move to `@turbo-schedule/common`? */

export class ILesson {
	id: string = "";

	name: string = "";
	cabinet: string = "";
	teacher: string = "";
	students: Array<string> = [];

	dayIndex: number = -1;
	timeIndex: number = -1;
	isEmpty: boolean = true;

	constructor(data?: ILesson) {
		Object.assign(this, data);
	}
}
