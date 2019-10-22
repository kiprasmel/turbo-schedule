import { IStudent } from "./model/Student";

import { getStudentsListHtml, updateLatestDir } from "./util/getStudentsListHTML";
import { getStudentsDataArray } from "./util/scrapeStudents";
import { getAllStudentScheduleHtmlInParallel } from "./getAllStudentScheduleHtmlInParallel";

import { createUniqueLessonsArray } from "./createUniqueLessonsArray";
import { findLessonsForStudent } from "./findLessonsForStudent";
import { IOptions } from "./options";

import { move } from "fs-extra";

export interface IConfig {
	studentsPageURI: string;
	baseScheduleURI: string;
}

const config: IConfig = {
	studentsPageURI: "http://kpg.lt/Tvarkarastis/Index.htm",
	baseScheduleURI: "http://kpg.lt/Tvarkarastis",
};

export const scrape = async (options: IOptions = { savePath: "saved-content" }): Promise<void> => {
	/** TEMP - typescript fix - default params don't help -_- */
	if (!options.savePath) {
		options.savePath = "saved-content";
	}

	try {
		console.log("\n==> scraper\n");
		const studentsListHtml: string = await getStudentsListHtml(config.studentsPageURI);

		let studentsDataArray: Array<IStudent> = await getStudentsDataArray(studentsListHtml, config.baseScheduleURI);

		/** BEGIN testing - add limit for quick runs */
		// studentsDataArray = studentsDataArray.splice(0, 10);
		/** END testing */

		/** TODO - returns wrongly! */
		// const allStudentSchedulesArray__BAD_RETURN_FIXME: Array<any> = await getAllStudentScheduleHtmlInParallel(
		// 	studentsDataArray
		// );
		await getAllStudentScheduleHtmlInParallel(studentsDataArray);

		// const uniqueLessonsArray: Array<any> = await createUniqueLessonsArray(allStudentSchedulesArray);
		const uniqueLessonsArray: Array<any> = await createUniqueLessonsArray();

		studentsDataArray.forEach((student) => {
			findLessonsForStudent(student.text, uniqueLessonsArray);
		});

		/** TODO fixme! */
		updateLatestDir();

		try {
			/** TODO - this is NOT good lmao */
			if (options.savePath !== "saved-content") {
				await move("saved-content", options.savePath, { overwrite: true });
				console.log("Moved content");
			}
		} catch (err) {
			console.log("Failed moving, probly already exists");
		}

		console.log("\n -> scraper finished \n\n");
		return;
	} catch (err) {
		console.error("\nError! \n==> `@turbo-schedule/scraper`\n -> function `scrape`", err);
		return;
	}
};
