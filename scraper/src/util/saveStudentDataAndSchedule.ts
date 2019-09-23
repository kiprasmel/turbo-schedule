import { IStudent } from "../model/Student";
import { writeJSONToFileSimple } from "./writeJSONToFile";
import { getYYYYMMDD } from "@turbo-schedule/common";
import { getSavedFile } from "./htmlSaving";

const savingPath: string = "saved-content" + "/" + getYYYYMMDD() + "/" + "students";

const filename: string = "student-data.json";

export const saveStudentDataAndSchedule = (studentData: IStudent, schedule: any) => {
	const content = {
		...studentData,
		schedule: schedule,
	};

	writeJSONToFileSimple(content, savingPath + "/" + content.text, filename);

	return content;
};

// export const getSavedStudentDataAndSchedule = (studentData: IStudent) => {
export const getSavedStudentDataAndSchedule = (savingPath: string) => {
	// const fullPath: string = savingPath + "/" + studentData.text + "/" + filename;
	const savedData = JSON.parse(getSavedFile(savingPath)); //JSON.parse(getSavedFile(savingPath));
	return savedData;
};
