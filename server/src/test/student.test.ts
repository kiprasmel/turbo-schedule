import {
	StudentFromList,
	Lesson,
	Student,
	getDefaultStudentFromList,
	getDefaultStudent,
	getDefaultLesson,
} from "@turbo-schedule/common";
import { defaultDbState, initDb, Db } from "@turbo-schedule/database";

import { request, Response } from "./utils";

describe("/student API", () => {
	it("should fail if the students array file does not exist", async () => {
		try {
			const db: Db = await initDb();
			await db.setState({ ...defaultDbState, students: [] }).write();

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
			{
				...getDefaultStudentFromList(),
				originalHref: "x300111e_melni_kip220.htm",
				text: "Melnikovas Kipras IIIe",
			},
			{
				...getDefaultStudentFromList(),
				originalHref: "x300112c_baltu_sim457.htm",
				text: "Baltūsis Simonas IVGc",
			},
		];

		try {
			const db = await initDb();
			await db.setState({ ...defaultDbState, students: studentsFileContent }).write();

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
			const db: Db = await initDb();
			await db.setState({ ...defaultDbState, students: [] }).write();

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
		const studentWithoutLessons: StudentFromList = {
			...getDefaultStudentFromList(),
			originalHref: "x300111e_melni_kip220.htm",
			text: "Melnikovas Kipras IIIe",
		};

		const encodedStudentName: string = encodeURIComponent(studentWithoutLessons.text);

		try {
			const db = await initDb();
			await db.setState({ ...defaultDbState, students: [studentWithoutLessons], lessons: [] }).write();

			const res: Response = await request.get(`/api/v1/student/${encodedStudentName}`);

			expect(res.status).toBe(404);

			expect(res.body).toHaveProperty("message");
			expect(res.body).toHaveProperty("student");

			expect(res.body.student).toEqual(studentWithoutLessons);
		} finally {
			//
		}
	});

	it("should return a specific student with lessons", async () => {
		const studentWITHOUTLessons: StudentFromList = {
			...getDefaultStudentFromList(),
			originalHref: "x300111e_melni_kip220.htm",
			text: "Melnikovas Kipras IIIe",
		};

		/** TODO PARTICIPANTS */
		const lessons: Lesson[] = [
			{
				...getDefaultLesson(),
				isEmpty: false,
				dayIndex: 0,
				timeIndex: 0,
				id: "day:0/time:0/name:The angle ain't blunt - I'm blunt",
				name: "The angle ain't blunt - I'm blunt",
				/** BEGIN TODO DEPRECATE */
				teacher: "Snoop Dawg",
				room: "The Chamber (36 - 9 = 25)",
				/** END TODO DEPRECATE */
				teachers: ["Snoop Dawg"],
				rooms: ["The Chamber (36 - 9 = 25)"],
				students: [
					studentWITHOUTLessons.text /** the student must exist in the lesson's students' list to get the lesson populated */,
					"Alice Wonderland IIIGe",
					"Bob Builder IIIa",
					"Charlie Angel IVGx",
				],
			},
		];

		const encodedStudentName: string = encodeURIComponent(studentWITHOUTLessons.text);

		try {
			const db = await initDb();
			await db.setState({ ...defaultDbState, students: [studentWITHOUTLessons], lessons }).write();

			const res: Response = await request.get(`/api/v1/student/${encodedStudentName}`);

			expect(res.status).toBe(200);

			expect(res.body).toHaveProperty("student");
			expect(res.body.student).toHaveProperty("lessons");

			const studentWITHLessons: Student = { ...getDefaultStudent(), ...studentWITHOUTLessons, lessons };

			expect(res.body.student).toEqual(studentWITHLessons);
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
	 *
	 * Edit: see https://github.com/mpashkovskiy/express-oas-generator/issues/50
	 */
	it("should be the last test to avoid a bug", async () => {
		try {
			await request.get(`/api/v1`); /** this solves the issue - the heck? */
		} finally {
			console.log("last test done");
		}
	});
});
