/* eslint-disable @typescript-eslint/no-use-before-define */

import {
	ParticipantInitData,
	getDefaultParticipant,
	Class,
	getSpecificScheduleURI,
	TClassNum,
	classNumMin,
	classNumMax,
} from "@turbo-schedule/common";

export function createClass(data: ParticipantInitData = getDefaultParticipant()): Class {
	const { text, originalHref } = data;

	const fullClassOrig = text;
	const originalScheduleURI = getSpecificScheduleURI(originalHref);

	const classNumOrig = parseClassNumOrig(fullClassOrig);
	const classCharOrig = parseClassCharOrig(fullClassOrig);

	const fullClass = parseFullClass(fullClassOrig);
	const classNum = parseClassNum(fullClassOrig);
	const classChar = parseClassChar(fullClassOrig);

	const handle = `${fullClass}`;

	const theClass: Class = {
		id: text /** TODO ID */,
		handle,

		text,
		originalHref,
		labels: data.labels,

		originalScheduleURI,

		fullClassOrig,
		classNumOrig,
		classCharOrig,

		fullClass,
		classNum,
		classChar,
	};

	return theClass;
}

function parseClassCharOrig(fullClassOrig: string): string {
	return fullClassOrig[fullClassOrig.length - 1];
}

function parseClassNumOrig(fullClassOrig: string): string {
	return fullClassOrig.slice(0, -1);
}

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
