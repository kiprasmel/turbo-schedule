import { StudentFromList } from "@turbo-schedule/common";

interface Response {
	participants: StudentFromList[];
}

export const fetchStudents = async (signal?: AbortSignal): Promise<StudentFromList[]> => {
	try {
		const res = await fetch("/api/v1/participant", { signal });
		const json: Response = await res.json();

		const { participants: students = [] } = json;

		return students;
	} catch (err) {
		console.error("Error @ fetchStudents", err);
		return [];
	}
};
