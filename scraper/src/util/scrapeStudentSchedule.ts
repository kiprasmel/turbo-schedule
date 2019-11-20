import cheerio from "cheerio";

import { IStudent } from "../model/Student";

import { getHtml } from "./getHtml";

import { handleScheduleRowspans } from "./handleScheduleRowspans";
import { removeUselessTdsFromSchedule } from "./removeUselessTdsFromSchedule";
import { saveFile, fileIsAlreadySaved } from "./htmlSaving";
import { getYYYYMMDD } from "@turbo-schedule/common";
import { writeJSONToFileSimple } from "./writeJSONToFile";
import { inspect } from "util";
import { extractLessonsArray } from "./extractLessons";
import { removeCheerioesCirculars } from "./removeCheerioesCirculars";

import prettier from "prettier";
import { getSavedStudentDataAndSchedule, saveStudentDataAndSchedule } from "./saveStudentDataAndSchedule";

const savingPath: string = "saved-content" + "/" + getYYYYMMDD() + "/" + "students";

const extractStudentName = (scheduleItems: Array<CheerioElement>): string | undefined => {
	try {
		// const $ = cheerio.load(scheduleHtml);
		// const html = $.html();

		// console.log("html", html);

		// console.log("scheduleItems", scheduleItems);

		// console.log(
		// 	"scheduleItem0",
		// 	inspect(/**    */ scheduleItems[0]
		// 	// inspect(/**    */ scheduleItems[0].children[0].children[0].children[0].children[0].data)
		// );

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

// const prepareScheduleItems = async (studentData: IStudent) => {
// 	const html = await getHtml(studentData.fullScheduleURI);
// const prepareScheduleItems = (html: string): Array<string> | string => {
const prepareScheduleItems = (html: string): Array<CheerioElement> => {
	const $ = cheerio.load(html);

	/** we only need the first table */
	const firstTable: CheerioElement = $("table").toArray()[0];

	const rawScheduleItems: Array<CheerioElement> = $("tr td", firstTable).toArray();

	const studentNameAndClass: string | undefined = extractStudentName(rawScheduleItems);

	if (!studentNameAndClass) {
		/**
		 * TODO - is this considered an error & should we abort here?
		 */

		return [];
	}

	// writeJSONToFileSimple(rawScheduleItems, savingPath + "/" + studentNameAndClass, "schedule-items.0-raw.json");

	saveFile(
		inspect(rawScheduleItems, { showHidden: true, showProxy: true, compact: true }),
		// JSON.stringify(rawScheduleItems, getCircularReplacer()),
		savingPath + "/" + studentNameAndClass,
		"raw-schedule-items.json"
	);

	let removedCirculars = removeCheerioesCirculars(rawScheduleItems);

	removedCirculars = JSON.parse(prettier.format(JSON.stringify(removedCirculars), { parser: "json" }));

	// const prettified: string = prettier.format(stringified, { parser: "json" });

	writeJSONToFileSimple(
		removedCirculars,
		savingPath + "/" + studentNameAndClass,
		"schedule-items.0.5-removed-circular.json"
	);

	// saveFile(
	// 	// prettier.format(JSON.stringify(removedCirculars), { parser: "json-stringify`" }),

	// 	JSON.stringify(removedCirculars),
	// 	savingPath + "/" + studentNameAndClass,
	// 	"schedule-items.0.5-removed-circular.json"
	// );

	/** todo dynamic by how many `td`s a `tr` has */
	const tableColumnCount: number = 6; /** 1 for time + 5 for workdays */

	/** STEP 1 */

	let scheduleItemsWithProperRowspans: Array<CheerioElement> = handleScheduleRowspans(
		// rawScheduleItems,
		removedCirculars,
		tableColumnCount
	);

	scheduleItemsWithProperRowspans = removeCheerioesCirculars(scheduleItemsWithProperRowspans);

	writeJSONToFileSimple(
		scheduleItemsWithProperRowspans,
		savingPath + "/" + studentNameAndClass,
		"schedule-items.1-proper-rowspans.json"
	);

	/** STEP 2 */

	/** TEMP FIXME */
	// const scheduleItemsWithoutUselessTds: Array<CheerioElement> = scheduleItemsWithProperRowspans;
	let scheduleItemsWithoutUselessTds: Array<CheerioElement> = removeUselessTdsFromSchedule(
		scheduleItemsWithProperRowspans,
		tableColumnCount
	);

	scheduleItemsWithoutUselessTds = removeCheerioesCirculars(scheduleItemsWithoutUselessTds);

	writeJSONToFileSimple(
		scheduleItemsWithoutUselessTds,
		savingPath + "/" + studentNameAndClass,
		"schedule-items.2-no-useless-tds.json"
	);

	/** reference (todo - copy) for easier access (alias) */
	const scheduleItems = scheduleItemsWithoutUselessTds;

	return scheduleItems;

	// /** FINAL STEP - write to file & return */
	// const preparedHtmlStringArray: Array<string> = scheduleItems.map((rawItem) => $.html(rawItem)) /** works */;

	// /**
	//  * TODO - take care of `undefined` studentNameAndClass
	//  */
	// const preparedHtml: string = preparedHtmlStringArray.join("");

	// /** prep for saving */

	// /** take student's name */
	// // const studentNameAndClass: string = extractStudentName(preparedHtml); // "todo--student-name";

	// const studentSavingPath: string = savingPath + "/" + studentNameAndClass;

	// const filename: string = "schedule.html";

	// /** save as json */
	// writeJSONToFileSimple(preparedHtmlStringArray, studentSavingPath, filename + ".json");

	// /** save as html */
	// saveFile(preparedHtml, studentSavingPath, filename);

	// return preparedHtml;
};

export const scrapeStudentSchedule = async (studentData: IStudent): Promise<Array<any>> => {
	try {
	console.log("\n==> scrapeStudentSchedule:");
	const savingPathBase: string = "saved-content" + "/" + getYYYYMMDD() + "/" + "students" + "/" + studentData.text;

	const studentDataSavingPath: string = savingPathBase + "/" + "student-data.json";

	// console.log("saving path", savingPath);

	let lessonsArray: Array<any> = [];

	if (fileIsAlreadySaved(studentDataSavingPath)) {
		console.log(" -> lessonsArray IS saved, taking it from saved file");

		lessonsArray = getSavedStudentDataAndSchedule(studentDataSavingPath);
	} else {
		console.log(" -> lessonsArray IS NOT saved, getting it from url");

		const html: string = await getHtml(studentData.fullScheduleURI);
		saveFile(html, savingPathBase, "student-data.html");

		const scheduleItems: Array<CheerioElement> = prepareScheduleItems(html);

		if (!scheduleItems.length) {
			console.warn("\nscheduleItems were empty, skipping!\nsavingPathBase:", savingPathBase);
			return [];
		}

		lessonsArray = extractLessonsArray(scheduleItems);
		saveStudentDataAndSchedule(studentData, lessonsArray);
	}

	// console.log("TCL: scrapeStudentSchedule -> lessonsArray", lessonsArray);

	return lessonsArray;
	} catch (err) {
		console.error(err);
		return Promise.reject(new Error(err));
	}
};
