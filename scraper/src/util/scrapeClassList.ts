import cheerio from "cheerio";

import { Class, createClass } from "@turbo-schedule/common";

/**
 * TODO extract into util to avoid duplication
 */
export const findIndex = (tableDescriptionArray: CheerioElement[], targetText: string): number => {
	for (let index = 0; index < tableDescriptionArray.length; ++index) {
		const td: CheerioElement = tableDescriptionArray[index];

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

		const potentialTargetText: string = td.children[0].children[0].children[0].data || "";

		if (potentialTargetText === targetText) {
			return index;
		}
	}

	throw new Error("Failed to find index...");

	return -1; /** typescript pls */
};

/**
 * TODO refactor & abostract (see `scrapeStudents`)
 */
export const scrapeClassList = (html: string): Class[] => {
	const $ = cheerio.load(html);

	// const student = $("font a")[300];

	// console.log("student", { ...student });

	/** first is useless and so is the last one, we take the middle table */
	const classesAndRoomsAndStudentsListTable = $("table")[1];

	const tableDescriptionArray = $("tr td", classesAndRoomsAndStudentsListTable).toArray();
	// console.log("TCL: tableDescriptionArray", tableDescriptionArray);

	const studentListStartIndex: number = findIndex(tableDescriptionArray, "Klasės");
	const studentListEndIndex: number = findIndex(tableDescriptionArray, "Mokytojai");

	console.log("studentListStartIndex", studentListStartIndex, "studentListEndIndex", studentListEndIndex);

	/** take only students */
	const studentsTds = tableDescriptionArray.splice(studentListStartIndex, studentListEndIndex);

	const students = $("font a", studentsTds).toArray();

	// const students = $("font a").toArray();
	// console.log(students);

	const studentsDataArray: Class[] = students.map(
		({ attribs, children }: CheerioElement): Class =>
			createClass({ originalHref: attribs.href, fullClassOrig: children[0].data || "" })
	);

	// console.log(studentsDataArray);

	// console.log("studentsDataArray", studentsDataArray);
	return studentsDataArray;
};
