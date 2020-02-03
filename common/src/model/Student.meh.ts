/**
 * TODO - instead of using the outdated mixin patter from the official docs (lol),
 * follow this: https://www.bryntum.com/blog/the-mixin-pattern-in-typescript-all-you-need-to-know/
 *
 * TODO WAIT do we actually need all of this if we end up using mongodb?
 * --> no?
 */

import { BasicLesson, Lesson } from "./Lesson.meh";
import { Friend } from "./Friend";

/**
 * stage 1
 * the basic student we scrape from the front page of the schedule
 */
export class BasicStudent {
	href: string = "";
	baseScheduleURI: string = "";
	fullScheduleURI: string = "";
	text: string = "";

	constructor(data?: Partial<BasicStudent>) {
		Object.assign(this, data);
	}
}

/** stage 2 */
export class StudentWithBasicLessons extends BasicStudent {
	lessons: BasicLesson[] = [];

	constructor(data?: Partial<StudentWithBasicLessons>) {
		super(data);
		Object.assign(this, data);
	}
}

/** stage 3 */
export class StudentWithLessons extends StudentWithBasicLessons {
	lessons: Lesson[] = [];

	constructor(data?: Partial<StudentWithLessons>) {
		super(data);
		Object.assign(this, data);
	}
}

/** stage 4 */
export class StudentWithLessonsAndFriends extends StudentWithLessons {
	friends: Friend[] = [];

	constructor(data?: Partial<StudentWithLessonsAndFriends>) {
		super(data);
		Object.assign(this, data);
	}
}

/** alias */
export class Student extends StudentWithLessonsAndFriends {
	constructor(data?: Partial<StudentWithLessonsAndFriends>) {
		super(data);
	}
}
