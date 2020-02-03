/* eslint-disable import/no-cycle */
import { Lesson, NonUniqueLesson } from "./Lesson";
import { Friend } from "./Friend";

/**
 * `get`ters don't work well
 * because they aren't included in the JSON.stringify serialization,
 * meaning that the values aren't saved.
 *
 * This might be a great storage space improvement later on,
 * but currently it just seems a little too complicated.
 *
 * + this optimization is questionable,
 * since we'd then need to create instances of students
 * when a query happens to get all the required fields,
 * then probably cache the result,
 * which results in the whole thing becoming pointless.
 */

/** these are non-configurable, they just stay the same */
export const baseScheduleURI: string = "http://kpg.lt/Tvarkarastis";
export const studentsPageURI: string = `${baseScheduleURI}/Index.htm`;

/**
 * only `href` & `text` are mandatory;
 * everything else gets created from them.
 */
// export interface StudentFromListInitData {
export interface StudentFromListInitData extends Partial<StudentFromList> {
	href: string;
	text: string;
}

export class StudentFromList {
	readonly href: string = "";
	readonly text: string = "";

	constructor(data: StudentFromListInitData) {
		Object.assign(this, data);
	}

	get baseScheduleURI(): string {
		return baseScheduleURI;
	}

	get fullScheduleURI(): string {
		return this.baseScheduleURI + "/" + this.href;
	}

	get id(): string {
		return this.text;
	}

	get firstName(): string {
		return this.text.split(" ")[0];
	}

	get lastName(): string {
		return this.text.split(" ")[1];
	}

	get fullName(): string {
		return this.firstName + " " + this.lastName;
	}

	/**
	 * the `text` might not be correct,
	 * but the `href` always is.
	 * It's harder to parse it though:D
	 */
	get classNum(): number {
		const classNumStr: string = this.href /**  "x300111e_melni_kip220.htm"         */
			.split("_") /**                       ["x300111e", "melni", "kip220.htm"] */
			[0] /**                                "x300111e"                         */
			.slice(0, -1) /**                      "x300111"                          */
			.slice(-2); /**                             "11"                          */

		return Number(classNumStr);
	}

	get classChar(): string {
		const classChar: string = this.href /**  "x300111e_melni_kip220.htm"         */
				.split("_") /**                 ["x300111e", "melni", "kip220.htm"] */
				[0] /**                          "x300111e"                         */
				.slice(-1) /**                          "e"                         */;

		return classChar;
	}

	get fullClass(): string {
		return this.classNum + this.classChar;
	}

	/** TODO (or just start using mongodb?) */
	public static findById(): Student | undefined {
		return undefined;
	}
}

export interface StudentWithNonUniqueLessonsInitData extends StudentFromListInitData {
	lessons: NonUniqueLesson[];
}

export class StudentWithNonUniqueLessons extends StudentFromList {
	lessons: NonUniqueLesson[] = [];

	constructor(data: StudentWithNonUniqueLessonsInitData) {
		super(data);
		Object.assign(this, data);
	}
}

export interface StudentInitData extends StudentWithNonUniqueLessonsInitData {
	lessons: Lesson[];
}

/**
 * Student with the Unique lessons
 */
export class Student extends StudentFromList {
	/**
	 * TODO
	 * TODO - consider `readonly`
	 */
	// lessons: Array<Lesson["id"] | Lesson> = [];
	lessons: Lesson[] = [];

	/** TODO */
	friends: Friend[] = [];
	// get friends(): Array<Friend["id"] | Friend> {
	// 	return [];
	// }

	constructor(data: StudentInitData) {
		super(data);
		Object.assign(this, data);
	}
}
