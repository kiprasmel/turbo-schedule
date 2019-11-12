import { IStudent } from "../model/Student";
import { writeJSONToFileSimple } from "./writeJSONToFile";
import { getYYYYMMDD } from "@turbo-schedule/common";
import { getSavedFile } from "./htmlSaving";

const savingPath: string = "saved-content" + "/" + getYYYYMMDD() + "/" + "students";

const filename: string = "student-data.json";

export const saveStudentDataAndSchedule = (studentData: IStudent, lessons: any): IStudent => {
	const student: IStudent = {
		...studentData,
		lessons: lessons,
	};

	writeJSONToFileSimple(student, savingPath + "/" + student.text, filename);

	return student;
};

// export const getSavedStudentDataAndSchedule = (studentData: IStudent) => {
export const getSavedStudentDataAndSchedule = (savingPath: string) => {
	// const fullPath: string = savingPath + "/" + studentData.text + "/" + filename;
	const savedData = JSON.parse(getSavedFile(savingPath)); //JSON.parse(getSavedFile(savingPath));
	return savedData;
};
