import axios, { AxiosResponse } from "axios";
import { Student } from "@turbo-schedule/common";

interface Response {
	student: Student;
}

export const fetchStudent = async (studentName: string): Promise<Student> => {
	try {
		const response: AxiosResponse<Response> = await axios.get<Response>(
			`/api/v1/student/${encodeURIComponent(studentName)}`
		);

		const {
			data: { student },
		} = response;

		return student;
	} catch (err) {
		console.error("Error @ fetchStudents", err);
		return new Student();
	}
};
