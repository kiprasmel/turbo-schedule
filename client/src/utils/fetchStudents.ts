import axios, { AxiosResponse } from "axios";
import { StudentFromList } from "@turbo-schedule/common";

interface Response {
	students: StudentFromList[];
}

export const fetchStudents = async (): Promise<StudentFromList[]> => {
	try {
		const response: AxiosResponse<Response> = await axios.get<Response>(
			"/api/v1/student"
		);

		const {
			data: { students = [] }
		} = response;

		return students;
	} catch (err) {
		console.error("Error @ fetchStudents", err);
		return [];
	}
};
