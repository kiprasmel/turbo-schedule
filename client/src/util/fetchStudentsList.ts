import fetch from "node-fetch";

export const fetchStudentsList = async () => {
	const response = await fetch("api/student");

	console.log("response", response);
	const body: { studentsList: Array<any> } = await response.json();

	return body.studentsList;
};
