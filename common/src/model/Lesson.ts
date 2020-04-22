/* eslint-disable max-classes-per-file */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-cycle */
// import { Db } from "@turbo-schedule/database";

import { Student } from "./Student";
import { Constructor } from "../Constructor";

export class NonUniqueLesson {
	readonly id: string = "";

	readonly isEmpty: boolean = true;
	readonly dayIndex: number = -1;
	readonly timeIndex: number = -1;

	readonly name: string = "";
	readonly teacher: string = "";
	readonly room: string = "";

	constructor(data?: Partial<NonUniqueLesson>) {
		Object.assign(this, data);

		this.id = NonUniqueLesson.createNonUniqueId(this);
	}

	/**
	 * @note duplicates WILL exist!
	 *
	 * We use the `id` to merge together the duplicates
	 * and create the "Unique" lessons (`Lesson` class below),
	 * whom are indeed unique.
	 */
	// get id(): string {
	// 	const id: string = NonUniqueLesson.createNonUniqueId(this);
	// 	return id;
	// }

	/**
	 * the id:
	 * * WILL NOT BE unique, IF a {NonUniqueLesson} is passed in;
	 * * WILL     BE unique, IF a {Lesson}          is passed in.
	 */
	public static createNonUniqueId(lesson: NonUniqueLesson | Lesson): string {
		const { isEmpty, dayIndex, timeIndex, name, teacher, room } = lesson;

		const id: string = `${isEmpty}/${dayIndex}/${timeIndex}/${name}/${teacher}/${room}`;
		return id;
	}

	/**
	 * sorts the lessons array,
	 * first by the day index,
	 * then by the time index.
	 *
	 * Earlier day / earlier time comes first.
	 *
	 * Won't mutate.
	 *
	 * TODO use `subtraction || deeper subtraction`
	 */
	public static sortArray = (lessons: Lesson[]): Lesson[] =>
		[...lessons].sort((A: Lesson, B: Lesson) => {
			if (A.dayIndex < B.dayIndex) {
				return -1;
			}
			if (A.dayIndex > B.dayIndex) {
				return 1;
			}
			if (A.timeIndex < B.timeIndex) {
				return -1;
			}
			if (A.timeIndex > B.timeIndex) {
				return 1;
			}
			return 0;
		});
}
/**
 * the "Unique" lesson
 */
export class Lesson extends NonUniqueLesson implements Omit<NonUniqueLesson, "nonUniqueId"> {
	id: string;

	students: Array<Student["id"]> = [];

	constructor(data?: Partial<Lesson> | Partial<NonUniqueLesson>) {
		super(data);
		Object.assign(this, data);

		this.id = Lesson.createUniqueId(this);
	}

	public static createUniqueId(lesson: Lesson): string {
		/**
		 * this id WILL be unique, by definition, since we're passing in a unique lesson.
		 */
		const uniqueId: string = NonUniqueLesson.createNonUniqueId(lesson);
		return uniqueId;
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const HasLessonsMixin = <TBaseClass extends Constructor>(BaseClass: TBaseClass) =>
	class extends BaseClass {
		lessons: Lesson[] = [];
	};
