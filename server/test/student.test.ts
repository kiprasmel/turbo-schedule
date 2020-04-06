/**
 * TODO FIXME WARN
 *
 * Aight, we've got a problem here:
 *
 * You cannot have more than 1 `initDb()` and/or `db.setState()` called,
 * otherwise all test suites with it will fail.
 *
 * Somehow, using `overrideDbState` once & `db.setState` the other time DOES work,
 * which is mind boggling and I'm completely lost as to why.
 *
 * I do not know what happens if we need more than 2 tests with database access.
 *
 * This has been a HUGE waste of time.
 * I tried fixing it in various ways.
 * I even tried running jest sequentially - see https://stackoverflow.com/a/57609093/9285308,
 * but that just didn't work either.
 *
 * This might help, but not necessarily - https://github.com/facebook/jest/issues/6194#issuecomment-419837314
 *
 * Oh boy did I waste a lot of time with this. pls no.
 *
 * P.S. JEST ******* SUCKS
 */

import { StudentFromList } from "@turbo-schedule/common";
import { defaultDbState, initDb, overrideDbState } from "@turbo-schedule/database";

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

		try {
			// const db = await initDb();
			// await db.setState({ ...defaultDbState, students: studentsFileContent });

			await overrideDbState({ ...defaultDbState, students: studentsFileContent });

			const res: Response = await request.get(`/api/v1/student`);

			expect(res.type).toMatch(/json/);
			expect(res.status).toBe(200);

			expect(res.body).toHaveProperty("students");

			expect(res.body.students).toEqual(studentsFileContent);
		} finally {
			//
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

		try {
			const db = await initDb();
			await db.setState({ ...defaultDbState, students: [studentWithoutLessons], lessons: [] });

			const res: Response = await request.get(`/api/v1/student/${encodedStudentName}`);

			expect(res.status).toBe(404);

			expect(res.body).toHaveProperty("message");
			expect(res.body).toHaveProperty("student");

			expect(res.body.student).toEqual(studentWithoutLessons);
		} finally {
			//
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
