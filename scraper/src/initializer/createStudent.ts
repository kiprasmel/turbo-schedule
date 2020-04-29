/* eslint-disable @typescript-eslint/no-use-before-define */

import {
	Participant,
	ParticipantInitData,
	getDefaultParticipant,
	getDefaultStudent,
	StudentFromList,
	getSpecificScheduleURI,
	TClassNum,
	classNumMin,
	classNumMax,
	Lesson,
	Student,
} from "@turbo-schedule/common";

export const createStudentFromList = (data: ParticipantInitData = getDefaultParticipant()): StudentFromList => {
	const text = data.text.trim();
	const originalHref = data.originalHref.trim();

	const originalScheduleURI = parseOriginalScheduleURI(originalHref);

	const firstName = parseFirstName(text);
	const lastName = parseLastName(text);
	const fullName = parseFullName(firstName, lastName);

	const classNum = parseClassNum(originalHref);
	const classChar = parseClassChar(originalHref);
	const fullClass = parseFullClass(classNum, classChar);

	const fullClassOrig = parseFullClassOrig(text);
	const classCharOrig = parseClassCharOrig(fullClassOrig);
	const classNumOrig = parseClassNumOrig(fullClassOrig);

	return {
		id: text /** TODO ID */,

		text,
		originalHref,
		labels: data.labels,

		originalScheduleURI,

		firstName,
		lastName,
		fullName,

		classNum,
		classChar,
		fullClass,

		classNumOrig,
		classCharOrig,
		fullClassOrig,
	};
};

export interface StudentInitData extends Participant {
	lessons: Lesson[];
}

export const createStudent = (data: StudentInitData = getDefaultStudent()): Student => ({
	...createStudentFromList(data),
	lessons: data.lessons,
});

const parseOriginalScheduleURI = (originalHref: string): string => getSpecificScheduleURI(originalHref);

const parseFirstName = (text: string): string => (!text ? "" : text.split(" ")[1]);

const parseLastName = (text: string): string => (!text ? "" : text.split(" ")[0]);

const parseFullName = (firstName: string, lastName: string): string =>
	!firstName || !lastName ? "" : `${firstName} ${lastName}`;

const parseClassNum = (originalHref: string): TClassNum => {
	/**
	 * `0` is the only number that evaluates to false.
	 * This might or might not be a good idea -
	 * we'll have to find out.
	 */
	const defaultClassNumValue: TClassNum = 0;

	if (!originalHref) {
		return defaultClassNumValue;
	}

	const classNumStr: string = originalHref /**  "x300111e_melni_kip220.htm"        */
		.split("_") /**                       ["x300111e", "melni", "kip220.htm"] */
		[0] /**                                "x300111e"                         */
		.slice(0, -1) /**                      "x300111"                          */
		.slice(-2); /**                             "11"                          */

	const classNumDangerous: number = Number(classNumStr);

	if (!Number.isInteger(classNumDangerous)) {
		throw new Error(
			`\
\`classNum\` is NOT an integer!


provided = \`${originalHref}\`
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
};

const parseClassChar = (originalHref: string): string =>
	/**
	 *  "x300111e_melni_kip220.htm"
	 * ["x300111e", "melni", "kip220.htm"]
	 *  "x300111e"
	 *         "e"
	 *         "e"
	 */
	!originalHref
		? ""
		: originalHref
				.split("_")[0]
				.slice(-1)
				.toLowerCase();

const parseFullClass = (classNum: number, classChar: string): string =>
	!Number.isInteger(classNum) || !classChar ? "" : classNum.toString() + classChar;

/**
 * should work for all classes,
 * because the chars we're looking for are always the first ones up until the last one, not including it.
 */
const parseClassNumOrig = (fullClassOrig: string): string =>
	/** "IIIGe" */
	/** "IIIG" */
	!fullClassOrig ? "" : fullClassOrig.slice(0, -1);

/**
 * should work for all classes,
 * because the char we're looking for is always the last one.
 */
const parseClassCharOrig = (fullClassOrig: string): string =>
	/** "IIIGe" */
	/**     "e" */
	!fullClassOrig ? "" : fullClassOrig.slice(-1);

/**
 * @NOTE
 *
 * The class number + char might
 * * NOT have the `G` between them,
 * * have the `G` or `g` as either upper or lower case
 *
 * The `text` might contain more than two words:
 * someone might have two first names or two last names,
 * and only now I have noticed it:D
 *
 * and other bs, because as far as we understand,
 * it's typed in manually, without selection or assertion.
 *
 */
const parseFullClassOrig = (text: string): string =>
	/**
	 *        "Melnikovas Kipras IIIGe"
	 * ["Melnikovas", "Kipras", "IIIGe"]
	 *                          "IIIGe"
	 */
	!text ? "" : text.split(" ").slice(-1)[0];
