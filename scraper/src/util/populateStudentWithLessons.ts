import cheerio from "cheerio";

import { StudentFromList, StudentWithNonUniqueLessons, NonUniqueLesson, getHtml } from "@turbo-schedule/common";

import { handleScheduleRowspans } from "./handleScheduleRowspans";
import { removeUselessTdsFromSchedule } from "./removeUselessTdsFromSchedule";
import { extractLessonsArray } from "./extractLessons";
import { removeCheerioesCirculars } from "./removeCheerioesCirculars";

const extractStudentName = (scheduleItems: Array<CheerioElement>): string | undefined => {
	try {
		/**
		 * 											   td               font    b           b           a           text name
		 */
		const studentNameAndClass: string | undefined =
			scheduleItems[0].children[0].children[0].children[0].children[0].data;

		console.log("studentNameAndClass", studentNameAndClass);

		return studentNameAndClass;
	} catch (err) {
		console.log("Errored, scheduleItems:", scheduleItems);
		console.error(err);

		return undefined;
	}
};

const prepareScheduleItems = (html: string): Array<CheerioElement> => {
	try {
		const $ = cheerio.load(html);

		/** we only need the first table */
		const firstTable: CheerioElement = $("table").toArray()[0];

		const rawScheduleItems: Array<CheerioElement> = $("tr td", firstTable).toArray();

		const studentNameAndClass: string | undefined = extractStudentName(rawScheduleItems);

		if (!studentNameAndClass) {
			throw new Error("student.text was empty after extracting");
		}

		const removedCirculars = removeCheerioesCirculars(rawScheduleItems);

		// removedCirculars = JSON.parse(prettier.format(JSON.stringify(removedCirculars), { parser: "json" }));

		/** todo dynamic by how many `td`s a `tr` has */
		const tableColumnCount: number = 6; /** 1 for time + 5 for workdays */

		/** STEP 1 */

		let scheduleItemsWithProperRowspans: Array<CheerioElement> = handleScheduleRowspans(
			// rawScheduleItems,
			removedCirculars,
			tableColumnCount
		);

		scheduleItemsWithProperRowspans = removeCheerioesCirculars(scheduleItemsWithProperRowspans);

		/** STEP 2 */

		/** TEMP FIXME */
		// const scheduleItemsWithoutUselessTds: Array<CheerioElement> = scheduleItemsWithProperRowspans;
		let scheduleItemsWithoutUselessTds: Array<CheerioElement> = removeUselessTdsFromSchedule(
			scheduleItemsWithProperRowspans,
			tableColumnCount
		);

		scheduleItemsWithoutUselessTds = removeCheerioesCirculars(scheduleItemsWithoutUselessTds);

		/** reference (todo - copy) for easier access (alias) */
		const scheduleItems = scheduleItemsWithoutUselessTds;

		return scheduleItems;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export const populateStudentWithLessons = async (
	studentFromList: StudentFromList
	// cacheFilePath: string
): Promise<StudentWithNonUniqueLessons> => {
	/** TODO FIXME DO NOT MEMOIZE HERE */
	// await memoize(cacheFilePath, async () => {
	try {
		// // console.log("populateStudentWithLessons", studentFromList.originalHref, studentFromList.originalScheduleURI);
		const html: string = await getHtml(studentFromList.originalScheduleURI, "windows-1257");

		const lessonElements: CheerioElement[] = prepareScheduleItems(html);
		const lessons: NonUniqueLesson[] = extractLessonsArray(lessonElements);

		const studentResource: StudentWithNonUniqueLessons = new StudentWithNonUniqueLessons({
			...studentFromList,
			lessons,
		});

		return studentResource;
	} catch (err) {
		console.error(err);
		return Promise.reject(new Error(err));
	}
	// });
};

// export const populateStudentWithLessonsNope = async () =>
// 	await memoize("", () => async (studentFromList: StudentFromList, cacheFilePath: string): Promise<Student> => {
// 		try {
// 			const html: string = await getHtml(studentFromList.originalScheduleURI);

// 			const lessonElements: CheerioElement[] = prepareScheduleItems(html);
// 			const lessons: Lesson[] = extractLessonsArray(lessonElements);

// 			const studentResource: Student = new Student({
// 				...studentFromList,
// 				lessons,
// 			});

// 			return studentResource;
// 		} catch (err) {
// 			console.error(err);
// 			return Promise.reject(new Error(err));
// 		}
// 	});
