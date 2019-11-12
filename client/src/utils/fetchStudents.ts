import axios, { AxiosResponse } from "axios";
import { IStudent } from "@turbo-schedule/scraper/src/model/Student";

interface Response {
	students: IStudent[];
}

export const fetchStudents = async (): Promise<IStudent[]> => {
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
