import { StudentFromList } from "@turbo-schedule/common";

export const fetchStudents = async (): Promise<StudentFromList[]> =>
	fetch("/api/v1/participant")
		.then((res) => res.json())
		.then((data) => data.participants)
		.catch((e) => {
			console.error(e);
			return [];
		});
