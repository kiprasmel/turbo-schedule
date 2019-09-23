import fs from "fs";

import { getYYYYMMDD } from "@turbo-schedule/common";
import { writeJSONToFileSimple } from "./util/writeJSONToFile";

const savingPath: string = "saved-content" + "/" + getYYYYMMDD() + "/" + "unique-lessons.json";

const getUniqueLessons = () => {
	const uniqueLessonsFile = fs.readFileSync(savingPath, { encoding: "utf-8" });
	const uniqueLessons: Array<any> = JSON.parse(uniqueLessonsFile);

	return uniqueLessons;
};

export const findLessonsForStudent = (studentName: string, uniqueLessoonsArray?: Array<any>) => {
	const uniqueLessons = uniqueLessoonsArray || getUniqueLessons();

	const studentLessons: Array<any> = uniqueLessons.filter((lesson) => lesson.students.includes(studentName));

	writeStudentsLessons(studentLessons, studentName);

	return studentLessons;
};

export const writeStudentsLessons = (studentLessonsArray: Array<any>, studentName: string) => {
	writeJSONToFileSimple(
		studentLessonsArray,
		"saved-content" + "/" + getYYYYMMDD() + "/" + "lessons",
		studentName + ".json"
	);
};
