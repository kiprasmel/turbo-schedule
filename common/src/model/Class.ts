/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable lines-between-class-members */

import { getSpecificScheduleURI } from "./Schedule";
// eslint-disable-next-line import/no-cycle
import { Lesson } from "./Lesson";

export const classNumMin = 0;
export const classNumMax = 12;

/** Use `0` ONLY FOR FAILED CASES */
export type TClassNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface ClassInitData extends Partial<Class> {
	text: string;
	originalHref: string;
}

/**
 * A `class` describes all students within a particular class / grade,
 * for example the 6th grade students, the 11th grade students etc.
 *
 * TODO: https://github.com/sarpik/turbo-schedule/issues/34
 * TODO: https://github.com/sarpik/turbo-schedule/issues/36
 *
 */
export interface Class {
	// 	/** BEGIN Scrapable */
	// readonly id: string; /** TODO */
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

export function createClass(data: ClassInitData = { text: "", originalHref: "" }): Class {
	const { text, originalHref } = data;

	const fullClassOrig = text;
	const originalScheduleURI = getSpecificScheduleURI(originalHref);

	const classNumOrig = parseClassNumOrig(fullClassOrig);
	const classCharOrig = parseClassCharOrig(fullClassOrig);

	const fullClass = parseFullClass(fullClassOrig);
	const classNum = parseClassNum(fullClassOrig);
	const classChar = parseClassChar(fullClassOrig);

	const theClass: Class = {
		text,
		originalHref,
		originalScheduleURI,
		//
		fullClassOrig,
		classNumOrig,
		classCharOrig,
		//
		fullClass,
		classNum,
		classChar,
	};

	return theClass;
}

// class Class {
// 	/** BEGIN Scrapable */
// 	// readonly id: string; /** TODO */

// 	readonly text: string;
// 	readonly originalHref: string;

// 	readonly originalScheduleURI: string;
// 	/** END Scrapable */

// 	/** BEGIN Class */
// 	readonly classNum: TClassNum;
// 	readonly classChar: string;
// 	readonly fullClass: string;

// 	readonly classNumOrig: string;
// 	readonly classCharOrig: string;
// 	readonly fullClassOrig: string;
// 	/** END Class */

// 	constructor(data?: ClassInitData) {
// 		// const class = {
// 		// 	text,
// 		// 	originalHref,
// 		// 	originalScheduleURI: getSpecificScheduleURI(originalHref),
// 		// 	// classNum:
// 		// };
// 	}

// }

function parseClassCharOrig(fullClassOrig: string): string {
	return fullClassOrig[fullClassOrig.length - 1];
}

function parseClassNumOrig(fullClassOrig: string): string {
	return fullClassOrig.slice(0, -1);
}

//
function parseClassChar(fullClassOrig: string): string {
	return parseClassCharOrig(fullClassOrig);
}

const retardedClassNumToNormalClassNumDict = {
	i: 9,
	ig: 9,
	ii: 10,
	iig: 10,
	iii: 11,
	iiig: 11,
	iv: 12,
	ivg: 12,
};

type TRetardedClassNum = typeof retardedClassNumToNormalClassNumDict;

function parseRetardedClassNum(fullClassNameOrig: string): number {
	return retardedClassNumToNormalClassNumDict[fullClassNameOrig.toLowerCase() as keyof TRetardedClassNum];
}

function parseClassNum(fullClassOrig: string): TClassNum {
	console.log("parseClassNum: fullClassOrig:", fullClassOrig);

	const classNumStr: string = fullClassOrig /**  "6a" or "IIGc" */
		.slice(0, -1); /**                         "6"  or "IIG"  */

	const classNumDangerous: number = classNumStr.toLowerCase().includes("i")
		? parseRetardedClassNum(classNumStr)
		: Number(classNumStr);

	if (!Number.isInteger(classNumDangerous)) {
		throw new Error(
			`\
\`classNum\` is NOT an integer!

provided = \`${fullClassOrig}\`
parsed & invalid = \`${classNumDangerous}\`,
typeof = \`${typeof classNumDangerous}\``
		);
	}

	if (classNumDangerous < classNumMin || classNumDangerous > classNumMax) {
		throw new Error(
			`\
\`classNum\` was out of range!

min = \`${classNumMin}\`,
max = \`${classNumMax}\`,
provided = \`${classNumDangerous}\``
		);
	}

	const classNumSafe: TClassNum = classNumDangerous as TClassNum;

	return classNumSafe;
}

function parseFullClass(fullClassOrig: string): string {
	return parseClassNum(fullClassOrig) + parseClassChar(fullClassOrig);
}
