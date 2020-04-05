import { StudentFromList, Lesson, Student } from "@turbo-schedule/common";

import { initDb, Db, defaultDbState } from "@turbo-schedule/database/src";
import { request, Response } from "./utils";

describe("/student API", () => {
	it("should fail if the students array file does not exist", async () => {
		try {
			const res: Response = await request.get(`/api/v1/student`);

			expect(res.status).toBe(404);
			expect(res.body.students).toEqual([]);
			expect(res.body).toHaveProperty("message");
		} finally {
			//
		}
	});

	it("should return a list of students", async () => {
		const studentsFileContent: StudentFromList[] = [
			new StudentFromList({
				originalHref: "x300111e_melni_kip220.htm",
				text: "Melnikovas Kipras IIIe",
			}),
			new StudentFromList({
				originalHref: "x300112c_baltu_sim457.htm",
				text: "Baltūsis Simonas IVGc",
			}),
		];

		const db: Db = await initDb();

		try {
			await db.setState({ students: studentsFileContent, lessons: [] }).write();

			const res: Response = await request.get(`/api/v1/student`);

			expect(res.type).toMatch(/json/);
			expect(res.status).toBe(200);

			expect(res.body).toHaveProperty("students");

			expect(res.body.students).toEqual(studentsFileContent);
		} finally {
			await db.setState(defaultDbState).write();
		}
	});

	it("should return an empty student if it does not exist", async () => {
		const invalidStudentName: string = `ayyy lmao totally invalid student name XD ${new Date().getTime()}`;

		const encodedInvalidStudentName: string = encodeURIComponent(invalidStudentName);

		try {
			const res: Response = await request.get(`/api/v1/student/${encodedInvalidStudentName}`);

			expect(res.status).toBe(404);

			expect(res.body).toHaveProperty("message");

			expect(res.body).toHaveProperty("student");
			expect(res.body.student).toHaveProperty("lessons");
			expect(res.body.student.lessons).toEqual([]);
		} finally {
			//
		}
	});

	it("should return a student from list (without lessons) if it exists but does not have lessons", async () => {
		const studentWithoutLessons: StudentFromList = new StudentFromList({
			originalHref: "x300111e_melni_kip220.htm",
			text: "Melnikovas Kipras IIIe",
		});

		const encodedStudentName: string = encodeURIComponent(studentWithoutLessons.text);

		const db: Db = await initDb();
		db.setState({ students: [studentWithoutLessons], lessons: [] }).write();

		try {
			const res: Response = await request.get(`/api/v1/student/${encodedStudentName}`);

			expect(res.status).toBe(404);

			expect(res.body).toHaveProperty("message");
			expect(res.body).toHaveProperty("student");

			expect(res.body.student).toEqual(studentWithoutLessons);
		} finally {
			await db.setState(defaultDbState).write();
		}
	});


	/**
	 * wtf
	 * the last test is not registered/parsed correctly
	 * by the express-oas-generator, I assume,
	 * and it's not registered.
	 *
	 * Calling `request.get` fixes this problem.
	 * I'll investigate.
	 */
	it("should be the last test to avoid a bug", async () => {
		try {
			await request.get(`/api/v1`); /** this solves the issue - the heck? */
		} finally {
			console.log("last test done");
		}
	});
});
