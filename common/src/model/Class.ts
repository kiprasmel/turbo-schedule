/* eslint-disable import/no-cycle */

import { Participant } from "./Participant";
import { Lesson } from "./Lesson";

export const classNumMin = 0;
export const classNumMax = 12;

/** Use `0` ONLY FOR FAILED CASES */
export type TClassNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * A `class` describes all students within a particular class / grade,
 * for example the 6th grade students, the 11th grade students etc.
 *
 * TODO: https://github.com/sarpik/turbo-schedule/issues/34
 * TODO: https://github.com/sarpik/turbo-schedule/issues/36
 *
 */
export interface Class extends Participant {
	// 	/** BEGIN Scrapable */
	readonly id: string /** TODO */;
	readonly text: string;
	readonly originalHref: string;
	readonly originalScheduleURI: string;
	/** END Scrapable */

	/** BEGIN Class */
	readonly fullClassOrig: string;
	readonly classNumOrig: string;
	readonly classCharOrig: string;

	readonly fullClass: string;
	readonly classNum: TClassNum;
	readonly classChar: string;

	readonly lessons?: Lesson[] /** available only once populated from the database (we don't inline) */;
	/** END Class */
}

export const getDefaultClass = (): Class => ({
	id: "",
	handle: "",

	labels: [],
	text: "",
	originalHref: "",
	originalScheduleURI: "",

	fullClassOrig: "",
	classNumOrig: "",
	classCharOrig: "",

	fullClass: "",
	classNum: 0,
	classChar: "",

	lessons: [],
});
