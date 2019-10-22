import fs from "fs";

import { getYYYYMMDD } from "@turbo-schedule/common";
import { writeJSONToFileSimple } from "./util/writeJSONToFile";

const studentsPath: string = `saved-content/${getYYYYMMDD()}/students`;

export const getAllSchedules = async (): Promise<Array<any>> => {
	//
	const studentsFolderNames: Array<string> = await fs.promises.readdir(studentsPath, { encoding: "utf-8" });
	// console.log("studentsFolderNames", studentsFolderNames);

	let howManyFailed: number = 0;

	const studentsSchedules: Array<any> = studentsFolderNames.map((studentFolderName) => {
		// const studentsFiles = fs.readdirSync(studentsPath + "/" + studentFolderName);
		try {
			const studentScheduleBuffer: string = fs.readFileSync(
				studentsPath + "/" + studentFolderName + "/" + "student-data.json",
				{
					encoding: "utf-8",
				}
			);

			const studentSchedule = JSON.parse(studentScheduleBuffer);

			return studentSchedule;
		} catch (err) {
			howManyFailed++;

			console.error(
				`! Error - failed getting / parsing student's schedule from \`student-data.json\` ${howManyFailed}`,
				err
			);

			return null;
		}
	});

	// console.log("studentScheduels", studentsSchedules);

	// console.log("TCL: studentsSchedules", studentsSchedules.splice(0, 2));
	return studentsSchedules;
};

export const sortUniqueLessonsArray = (A: any, B: any) => {
	if (A.dayIndex < B.dayIndex) {
		return -1;
	} else if (A.dayIndex > B.dayIndex) {
		return 1;
	} else {
		if (A.timeIndex < B.timeIndex) {
			return -1;
		} else if (A.timeIndex > B.timeIndex) {
			return 1;
		} else return 0;
	}
};

export const createUniqueLessonsArray = async (allStudentSchedulesArray?: Array<any>) => {
	const studentSchedulesArray: Array<any> = allStudentSchedulesArray || (await getAllSchedules());

	// let uniqueLessonsSet: Set<ILesson> = new Set<ILesson>();
	let uniqueLessonsMap: Map<string, any> = new Map();

	for (const studentAndSchedule of studentSchedulesArray) {
		if (!studentAndSchedule) {
			continue;
		}

		// console.log("studentAndSchedule", studentAndSchedule);

		const lessonsArray: Array<any> = [...studentAndSchedule.schedule]; /** todo wut? */

		lessonsArray.forEach((lesson) => {
			// console.log("lesson", lesson);
			if (!uniqueLessonsMap.has(lesson.id)) {
				lesson.students = [studentAndSchedule.text /** TODO `id` */];

				uniqueLessonsMap.set(lesson.id, lesson);
			} else {
				let updatedLesson = uniqueLessonsMap.get(lesson.id);
				updatedLesson.students.push(studentAndSchedule.text); /** TODO `id` */

				uniqueLessonsMap.set(lesson.id, updatedLesson);
			}
		});
	}

	// const uniqueLessonsArray: Array<any> = [...uniqueLessonsMap.];
	let uniqueLessonsArray: Array<any> = [];

	for (let lesson of uniqueLessonsMap.values()) {
		uniqueLessonsArray.push(lesson);
	}

	uniqueLessonsArray.sort(sortUniqueLessonsArray);

	writeJSONToFileSimple(uniqueLessonsArray, `saved-content/${getYYYYMMDD()}`, "unique-lessons.json");

	return uniqueLessonsArray;
};
