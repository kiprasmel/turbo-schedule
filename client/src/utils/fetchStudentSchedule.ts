import fetch from "node-fetch";

export const fetchStudentSchedule = async (studentName: string) => {
	const response = await fetch(`api/student/${encodeURIComponent(studentName)}`);

	const body: { studentSchedule: any } = await response.json();

	return body.studentSchedule;
};
