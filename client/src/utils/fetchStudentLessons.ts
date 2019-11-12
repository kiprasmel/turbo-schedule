import axios, { AxiosResponse } from "axios";

interface Response {
	lessons: any[];
}

export const fetchStudentLessons = async (
	studentName: string
): Promise<any[]> => {
	try {
		const response: AxiosResponse<Response> = await axios.get<Response>(
			`/api/v1/student/${encodeURIComponent(studentName)}`
		);

		const {
			data: { lessons }
		} = response;

		return lessons;
	} catch (err) {
		console.error("Error @ fetchStudents", err);
		return [];
	}
};
