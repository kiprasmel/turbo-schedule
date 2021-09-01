import { Student, getDefaultStudent, defaultYearRange, YearRange } from "@turbo-schedule/common";

interface Response {
	participant: Student;
}

export const fetchStudent = async (
	studentName: string, //
	signal?: AbortSignal,
	yearRange: YearRange = defaultYearRange
): Promise<Student> => {
	try {
		const res = await fetch(`/api/v1/participant/${encodeURIComponent(studentName)}?yearRange=${yearRange}`, {
			...(signal ? { signal } : {}),
		});
		const json: Response = await res.json();

		const { participant: student } = json;

		return student;
	} catch (err) {
		console.error("Error @ fetchStudents", err);
		return getDefaultStudent();
	}
};
