import axios, { AxiosResponse } from "axios";
import { Student, getDefaultStudent } from "@turbo-schedule/common";

interface Response {
	participant: Student;
}

export const fetchStudent = async (studentName: string): Promise<Student> => {
	try {
		const response: AxiosResponse<Response> = await axios.get<Response>(
			`/api/v1/participant/${encodeURIComponent(studentName)}`
		);

		const {
			data: { participant: student },
		} = response;

		return student;
	} catch (err) {
		console.error("Error @ fetchStudents", err);
		return getDefaultStudent();
	}
};
