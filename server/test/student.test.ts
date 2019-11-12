import fs from "fs-extra";
import path from "path";
import { IStudent } from "@turbo-schedule/scraper/src/model/Student";

import { request, Response } from "./utils";
import {
	latestScrapedDataDirPath,
	pathToStudentDataArrayFile
} from "../src/config";

describe("/student API", () => {
	it("should fail if the students array file does not exist", async () => {
		try {
			const res: Response = await request.get(`/api/v1/student`);

			expect(res.status).toBe(500);
			expect(res.body).toMatchObject({
				students: [],
				message: "Students array file not found (server error)!"
			});
		} finally {
		}
	});

	it("should return an array of students", async () => {
		const content: IStudent[] = [
			{
				href: "x300111e_melni_kip220.htm",
				baseScheduleURI: "http://kpg.lt/Tvarkarastis",
				fullScheduleURI:
					"http://kpg.lt/Tvarkarastis/x300111e_melni_kip220.htm",
				text: "Melnikovas Kipras IIIe"
			},
			{
				href: "x300112c_baltu_sim457.htm",
				baseScheduleURI: "http://kpg.lt/Tvarkarastis",
				fullScheduleURI:
					"http://kpg.lt/Tvarkarastis/x300112c_baltu_sim457.htm",
				text: "Baltūsis Simonas IVGc"
			}
		];

		try {
			fs.ensureDirSync(latestScrapedDataDirPath);
			fs.writeJSONSync(pathToStudentDataArrayFile, content, {
				encoding: "utf-8"
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
			fs.removeSync(pathToStudentDataArrayFile);
		}
	});

	it("should return an empty schedule for a non-existant student", async () => {
		const invalidStudentName: string =
			"ayyy lmao totally invalid student name XD " + new Date().getTime();

		const encodedInvalidStudentName: string = encodeURIComponent(
			invalidStudentName
		);

		try {
			const res: Response = await request.get(
				`/api/v1/student/${encodedInvalidStudentName}`
			);

			expect(res.status).toBe(404);

			expect(res.body).toHaveProperty("message");

			expect(res.body).toHaveProperty("lessons");
			expect(res.body.lessons).toEqual([]);
		} finally {
		}
	});

	it("should return a specific student", async () => {
		const studentName: string = "Chad RMarkdown";
		const content = [
			{
				isEmpty: false,
				dayIndex: 0,
				timeIndex: 0,
				id: "day:0/time:0/name:The angle ain't blunt - I'm blunt",
				name: "The angle ain't blunt - I'm blunt",
				teacher: "Snoop Dawg",
				cabinet: "The Chamber (36 - 9 = 25)",
				students: [
					"Alice from Wonderland IIIGe",
					"Bob the Builder IIIGa",
					"Charlie the Angel IVGx"
				]
			}
		];

		const pathToDir: string = path.join(
			latestScrapedDataDirPath,
			"lessons"
		);
		const pathToFile: string = path.join(pathToDir, studentName + ".json");

		try {
			fs.ensureDirSync(pathToDir);
			fs.writeJSONSync(pathToFile, content, { encoding: "utf-8" });

			const encodedStudentName: string = encodeURIComponent(studentName);
			const res: Response = await request.get(
				`/api/v1/student/${encodedStudentName}`
			);

			expect(res.status).toBe(200);

			expect(res.body).toHaveProperty("lessons");
			expect(res.body.lessons).toMatchObject(content);

			res.body.lessons.forEach((scheduleItem: any) => {
				expect(scheduleItem).toHaveProperty("isEmpty");
				expect(scheduleItem).toHaveProperty("dayIndex");
				expect(scheduleItem).toHaveProperty("timeIndex");
				expect(scheduleItem).toHaveProperty("id");
				expect(scheduleItem).toHaveProperty("name");
				expect(scheduleItem).toHaveProperty("teacher");
				expect(scheduleItem).toHaveProperty("cabinet");
				expect(scheduleItem).toHaveProperty("students");
			});
		} finally {
			fs.removeSync(pathToFile);
			fs.removeSync(pathToDir);
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
			await request.get(
				`/api/v1`
			); /** this solves the issue - the heck? */
		} finally {
			console.log("last test done");
		}
	});
});
