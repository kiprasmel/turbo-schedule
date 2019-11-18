import fs from "fs-extra";
import path from "path";
import { IStudent } from "@turbo-schedule/common";

import { request, Response } from "./utils";
import { latestScrapedDataDirPath, studentDataArrayFilePath, getStudentFilePath } from "../src/config";

describe("/student API", () => {
	it("should fail if the students array file does not exist", async () => {
		try {
			const res: Response = await request.get(`/api/v1/student`);

			expect(res.status).toBe(500);
			expect(res.body).toMatchObject({
				students: [],
				message: "Students array file not found (server error)!",
			});
		} finally {
		}
	});

	it("should return an array of students", async () => {
		const content: IStudent[] = [
			{
				href: "x300111e_melni_kip220.htm",
				baseScheduleURI: "http://kpg.lt/Tvarkarastis",
				fullScheduleURI: "http://kpg.lt/Tvarkarastis/x300111e_melni_kip220.htm",
				text: "Melnikovas Kipras IIIe",
				lessons: [],
			},
			{
				href: "x300112c_baltu_sim457.htm",
				baseScheduleURI: "http://kpg.lt/Tvarkarastis",
				fullScheduleURI: "http://kpg.lt/Tvarkarastis/x300112c_baltu_sim457.htm",
				text: "Baltūsis Simonas IVGc",
				lessons: [],
			},
		];

		try {
			fs.ensureDirSync(latestScrapedDataDirPath);
			fs.writeJSONSync(studentDataArrayFilePath, content, {
				encoding: "utf-8",
			});

			const res: Response = await request.get(`/api/v1/student`);

			expect(res.type).toMatch(/json/);
			expect(res.status).toBe(200);

			expect(res.body).toHaveProperty("students");

			res.body.students.forEach((student: IStudent) => {
				expect(student).toHaveProperty("href");
				expect(student).toHaveProperty("baseScheduleURI");
				expect(student).toHaveProperty("fullScheduleURI");
				expect(student).toHaveProperty("text");
			});
		} finally {
			fs.removeSync(latestScrapedDataDirPath);
			fs.removeSync(studentDataArrayFilePath);
		}
	});

	it("should return an empty schedule for a non-existant student", async () => {
		const invalidStudentName: string = "ayyy lmao totally invalid student name XD " + new Date().getTime();

		const encodedInvalidStudentName: string = encodeURIComponent(invalidStudentName);

		try {
			const res: Response = await request.get(`/api/v1/student/${encodedInvalidStudentName}`);

			expect(res.status).toBe(404);

			expect(res.body).toHaveProperty("message");

			expect(res.body).toHaveProperty("student");
			expect(res.body.student).toHaveProperty("lessons");
			expect(res.body.student.lessons).toEqual([]);
		} finally {
		}
	});

	/**
	 * BEGIN HACK
	 *
	 * Alright, so currently there's an issue that we need to read
	 * from 2 separate files
	 * in order to get both the student's information
	 * AND it's lessons array.
	 *
	 * This is a problem in the current way we save things
	 * with out scraper, and we'll fix this sooner or later.
	 *
	 */
	it("should return a specific student", async () => {
		const studentName: string = "Chad RMarkdown";

		const student: IStudent = {
			href: "foo_bar.htm",
			baseScheduleURI: "http://kpg.lt/Tvarkarastis",
			fullScheduleURI: "http://kpg.lt/Tvarkarastis/foo_bar.htm",
			text: studentName,
			lessons: [
				{
					isEmpty: false,
					dayIndex: 0,
					timeIndex: 0,
					id: "day:0/time:0/name:The angle ain't blunt - I'm blunt",
					name: "The angle ain't blunt - I'm blunt",
					teacher: "Snoop Dawg",
					room: "The Chamber (36 - 9 = 25)",
					students: ["Alice from Wonderland IIIGe", "Bob the Builder IIIGa", "Charlie the Angel IVGx"],
				},
			],
		};

		const pathToLessonsDir: string = path.join(latestScrapedDataDirPath, "lessons");
		const pathToLessonsFile: string = path.join(pathToLessonsDir, studentName + ".json");

		const pathToStudentFile: string = getStudentFilePath(studentName);
		const pathToStudentDir: string = path.parse(pathToStudentFile).dir;

		try {
			fs.ensureDirSync(pathToLessonsDir);
			fs.writeJSONSync(pathToLessonsFile, student.lessons, { encoding: "utf-8" });

			fs.ensureDirSync(pathToStudentDir);
			fs.writeJSONSync(pathToStudentFile, { ...student, lessons: [] });

			const encodedStudentName: string = encodeURIComponent(studentName);
			const res: Response = await request.get(`/api/v1/student/${encodedStudentName}`);

			expect(res.status).toBe(200);

			expect(res.body).toHaveProperty("student");
			expect(res.body.student).toHaveProperty("lessons");
			expect(res.body.student).toMatchObject(student);

			res.body.student.lessons.forEach((scheduleItem: any) => {
				expect(scheduleItem).toHaveProperty("isEmpty");
				expect(scheduleItem).toHaveProperty("dayIndex");
				expect(scheduleItem).toHaveProperty("timeIndex");
				expect(scheduleItem).toHaveProperty("id");
				expect(scheduleItem).toHaveProperty("name");
				expect(scheduleItem).toHaveProperty("teacher");
				expect(scheduleItem).toHaveProperty("room");
				expect(scheduleItem).toHaveProperty("students");
			});
		} finally {
			fs.removeSync(pathToLessonsFile);
			fs.removeSync(pathToLessonsDir);

			fs.removeSync(pathToStudentFile);
			fs.removeSync(pathToStudentDir);
		}
	});
	/** END HACK */

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
