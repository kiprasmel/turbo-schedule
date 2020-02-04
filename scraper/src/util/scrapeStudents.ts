import cheerio from "cheerio";

import { studentsPageURI, StudentFromList } from "@turbo-schedule/common";
import { getStudentsListHtml } from "./getStudentsListHtml";

const scrapeStudentList = (studentsListHtml: string): StudentFromList[] => {
	const $ = cheerio.load(studentsListHtml);

	// const student = $("font a")[300];

	// console.log("student", { ...student });

	/** first is useless and so is the last one, we take the middle table */
	const classesAndRoomsAndStudentsListTable = $("table")[1];

	const tableDescriptionArray = $("tr td", classesAndRoomsAndStudentsListTable).toArray();
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

	const studentsDataArray: StudentFromList[] = students.map(
		({ attribs, children }: CheerioElement): StudentFromList =>
			new StudentFromList({ originalHref: attribs.href, text: children[0].data || "" })
	);

	// console.log(studentsDataArray);

	// console.log("studentsDataArray", studentsDataArray);
	return studentsDataArray;
};

/**
 * studentsWithoutLessons
 */
export const getStudentList = async (): Promise<StudentFromList[]> => {
	const studentsListHtml: string = await getStudentsListHtml(studentsPageURI);

	const studentList: StudentFromList[] = scrapeStudentList(studentsListHtml);

	return studentList;
};
