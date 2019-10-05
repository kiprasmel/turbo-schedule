import fetch from "node-fetch";

export const fetchStudentsList = async () => {
	const response = await fetch("api/v1/student");

	const body: { studentsList: Array<any> } = await response.json();

	return body.studentsList;
};
