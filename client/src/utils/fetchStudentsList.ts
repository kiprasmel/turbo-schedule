import axios, { AxiosResponse } from "axios";

interface Response {
	studentsList: any[];
}

export const fetchStudentsList = async (): Promise<any[]> => {
	try {
		const response: AxiosResponse<Response> = await axios.get<Response>("/api/v1/student");

		const {
			data: { studentsList = [] },
		} = response;

		return studentsList;
	} catch (err) {
		console.error("Error @ fetchStudentsList", err);
		return [];
	}
};
