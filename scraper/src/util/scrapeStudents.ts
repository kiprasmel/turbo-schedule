import cheerio from "cheerio";

import { IStudent, extractStudent } from "../model/Student";
import { fileIsAlreadySaved, getSavedFile, saveFile } from "./htmlSaving";
import { getYYYYMMDD } from "@turbo-schedule/common";
import { writeJSONToFile, writeJSONToFileSimple } from "./writeJSONToFile";

export interface IScrapesStudentDataArray {
	html: string;
	baseScheduleURI: string;
}

const savingPath: string = "saved-content" + "/" + getYYYYMMDD();
const savingFilename: string = "students-data-array.json";
const savingPathAndFile: string = savingPath + "/" + savingFilename;

export const scrapeStudentsDataArray = (studentsListHtml: string, baseScheduleURI: string): Array<IStudent> => {
	const $ = cheerio.load(studentsListHtml);

	// const student = $("font a")[300];

	// console.log("student", { ...student });

	/** first is useless and so is the last one, we take the middle table */
	const classesAndCabinetsAndStudentsListTable = $("table")[1];

	const tableDescriptionArray = $("tr td", classesAndCabinetsAndStudentsListTable).toArray();
	// console.log("TCL: tableDescriptionArray", tableDescriptionArray);

	let studentListStartIndex: number = -1;

	for (let i = 0; i < tableDescriptionArray.length; ++i) {
		const td = tableDescriptionArray[i];

		if (
			!(
				td &&
				td.children &&
				td.children[0] &&
				td.children[0].children &&
				td.children[0].children[0] &&
				td.children[0].children[0].children &&
				td.children[0].children[0].children[0] &&
				td.children[0].children[0].children[0].data
			)
		) {
			continue;
		}

		const targetText: string = td.children[0].children[0].children[0].data || "";

		if (targetText === "Moksleiviai") {
			studentListStartIndex = i;
			break;
		}
	}

	console.log("studentListStartIndex", studentListStartIndex);

	/** take only students */
	const studentsTds = tableDescriptionArray.splice(studentListStartIndex, tableDescriptionArray.length);

	const students = $("font a", studentsTds).toArray();

	// const students = $("font a").toArray();
	// console.log(students);

	let studentsDataArray: Array<IStudent> = students.map(
		(rawStudentHtml: CheerioElement): IStudent => extractStudent(rawStudentHtml, baseScheduleURI)
	);

	// console.log(studentsDataArray);

	// console.log("studentsDataArray", studentsDataArray);
	return studentsDataArray;
};

export const getStudentsDataArray = async (
	studentsListHtml: string,
	baseScheduleURI: string
): Promise<Array<IStudent>> => {
	console.log("\n==> getStudentsDataArray:");

	let studentsDataArray: Array<IStudent> = [];

	if (fileIsAlreadySaved(savingPathAndFile)) {
		console.log(" -> json IS saved, taking it from saved file");

		studentsDataArray = JSON.parse(getSavedFile(savingPathAndFile));

		// 	// const parsedData = JSON.parse(getSavedFile(savingPathAndFile));

		// 	// Object.keys(parsedData).forEach((key) => {
		// 	// 	studentsDataArray.push(parsedData[key]);
		// 	// });
	} else {
		console.log(" -> json IS NOT saved, getting it from studentsListHtml");

		studentsDataArray = scrapeStudentsDataArray(studentsListHtml, baseScheduleURI);

		writeJSONToFileSimple(studentsDataArray, savingPath, savingFilename);
	}

	return studentsDataArray;
};
