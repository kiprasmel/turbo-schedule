import request from "supertest";
import { app } from "../src/server";

describe("/student API", () => {
	it("should return a list of students", async () => {
		const res: request.Response = await request(app).get(`/api/v1/student`);

		expect(res.type).toMatch(/json/);
		expect(res.status).toBe(200);

		expect(res.body).toHaveProperty("studentsList");

		res.body.studentsList.forEach((student: any) => {
			expect(student).toHaveProperty("href");
			expect(student).toHaveProperty("baseScheduleURI");
			expect(student).toHaveProperty("fullScheduleURI");
			expect(student).toHaveProperty("text");
		});
	});

	it("should not return a non-existant student", async () => {
		const invalidStudentName: string = "ayyy lmao totally invalid student name XD";
		const res: request.Response = await request(app).get(`/api/v1/student/${invalidStudentName}`);

		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty("error");
	});

	it("should return a specific student", async () => {
		/**
		 * TODO - it'd be best to manually create the student here
		 * & clean up after.
		 * (applies to all tests; I'm just new to testing, we'll figure it out!)
		 */
		const studentName: string = "Melnikovas Kipras IIIe";

		const res: request.Response = await request(app).get(`/api/v1/student/${studentName}`);

		expect(res.status).toBe(200);

		expect(res.body).toHaveProperty("studentSchedule");

		res.body.studentSchedule.forEach((scheduleItem: any) => {
			expect(scheduleItem).toHaveProperty("isEmpty");
			expect(scheduleItem).toHaveProperty("dayIndex");
			expect(scheduleItem).toHaveProperty("timeIndex");
			expect(scheduleItem).toHaveProperty("id");
			expect(scheduleItem).toHaveProperty("name");
			expect(scheduleItem).toHaveProperty("teacher");
			expect(scheduleItem).toHaveProperty("cabinet");
			expect(scheduleItem).toHaveProperty("students");
		});
	});
});
