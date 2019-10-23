import axios, { AxiosResponse } from "axios";

interface Response {
	studentSchedule: any[];
}

export const fetchStudentSchedule = async (studentName: string): Promise<any[]> => {
	const response: AxiosResponse<Response> = await axios.get<Response>(
		`/api/v1/student/${encodeURIComponent(studentName)}`
	);

	const {
		data: { studentSchedule },
	} = response;

	return studentSchedule;
};
