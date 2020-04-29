import axios, { AxiosResponse } from "axios";
import { StudentFromList } from "@turbo-schedule/common";

interface Response {
	participants: StudentFromList[];
}

export const fetchStudents = async (): Promise<StudentFromList[]> => {
	try {
		const response: AxiosResponse<Response> = await axios.get<Response>("/api/v1/participant");

		const {
			data: { participants: students = [] },
		} = response;

		return students;
	} catch (err) {
		console.error("Error @ fetchStudents", err);
		return [];
	}
};
