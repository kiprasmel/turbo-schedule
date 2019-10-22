import fetch from "node-fetch";

export const fetchStudentsList = async () => {
	try {
		const response = await fetch("api/v1/student");

		const body: { studentsList: Array<any> } = await response.json();

		return body.studentsList;
	} catch (err) {
		console.error("Error @ fetchStudentsList", err);
		return [];
	}
};
