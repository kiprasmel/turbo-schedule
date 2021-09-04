import { Student, getDefaultStudent } from "@turbo-schedule/common";

export const fetchStudent = async (studentName: string): Promise<Student> =>
	fetch(`/api/v1/participant/${encodeURIComponent(studentName)}`)
		.then((res) => res.json())
		.then((data) => data.participant)
		.catch((e) => {
			console.error(e);
			return getDefaultStudent();
		});
