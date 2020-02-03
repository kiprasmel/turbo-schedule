import { Student } from "./Student.meh";

/** stage 1 */
export class BasicLesson {
	id: string = "";
	isEmpty: boolean = true;
	dayIndex: number = -1;
	timeIndex: number = -1;

	name: string = "";
	teacher: string = "";
	room: string = "";

	constructor(data?: Partial<BasicLesson>) {
		Object.assign(this, data);

		if (!this.id) {
			this.id = BasicLesson.createId(this);
		}
	}

	private static createId({ isEmpty, dayIndex, timeIndex, name, teacher, room }: BasicLesson): string {
		const id: string = `${isEmpty}/${dayIndex}/${timeIndex}/${name}/${teacher}/${room}`;
		return id;
	}
}

/** stage 2 */
export class LessonWithStudents extends BasicLesson {
	students: Array<Student["text"] | Student> = [];

	constructor(data?: Partial<LessonWithStudents>) {
		super(data);
		Object.assign(this, data);
	}
}

/** alias */
export class Lesson extends LessonWithStudents {
	constructor(data?: Partial<LessonWithStudents>) {
		super(data);
	}
}
