import axios, { AxiosResponse } from "axios";
import { Student } from "@turbo-schedule/common";

interface Response {
	scheduleItem: Student;
}

export const fetchStudent = async (studentName: string): Promise<Student> => {
	try {
		const response: AxiosResponse<Response> = await axios.get<Response>(
			`/api/v1/schedule-item/${encodeURIComponent(studentName)}`
		);

		const {
			data: { scheduleItem: student },
		} = response;

		return student;
	} catch (err) {
		console.error("Error @ fetchStudents", err);
		return new Student();
	}
};
