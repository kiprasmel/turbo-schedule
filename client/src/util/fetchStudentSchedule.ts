import fetch from "node-fetch";

export const fetchStudentSchedule = async (studentName: string) => {
	const response = await fetch(`/api/student/${encodeURIComponent(studentName)}`);
	console.log("TCL: fetchStudentSchedule -> response", response);
	const body: { studentSchedule: any } = await response.json();
	console.log("TCL: fetchStudentSchedule -> body", body);

	return body.studentSchedule;
};
