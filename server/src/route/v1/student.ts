import { Router } from "express";
import fs from "fs-extra";
import path from "path";
import { IStudent, Student } from "@turbo-schedule/common";

import { isProd } from "../../../src/util/isProd";
import { latestScrapedDataDirPath, studentDataArrayFilePath, getStudentFilePath } from "../../config";

const router: Router = Router();

/**
 * get an array of students
 */
router.get("/", async (_req, res, next) => {
	try {
		const fileExists: boolean = await fs.pathExists(studentDataArrayFilePath);

		if (!fileExists) {
			/**
			 * this is bad because this is not dependant on any inputs -
			 * this only happens if we failed setting up something ourselves.
			 */
			const message: string = `Students array file not found (server error)!`;

			console.error(message);
			res.status(500).json({ students: [], message });

			return !isProd() ? next(message) : res.end();
		}

		const students: IStudent[] = await fs.readJSON(studentDataArrayFilePath, {
			encoding: "utf-8",
		});

		res.json({ students: students });
		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ students: [], message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/**
 * get full schedule of single student by it's name
 *
 * @note make sure to encode the URI component (`studentName`)! (TODO)
 *
 * TODO - this needs to return the WHOLE student + it's lessons array!
 */
router.get("/:studentName", async (req, res, next) => {
	let student: Student = new Student();

	try {
		/** BEGIN HACK */
		/**
		 * TODO
		 *
		 * We need to reach consistency and have both things
		 * in both places (both student's data & it's lessons WITH student names).
		 */

		const studentName: string = decodeURIComponent(req.params.studentName);
		const studentFilePath: string = getStudentFilePath(studentName);
		const fileExists: boolean = await fs.pathExists(studentFilePath);

		if (!fileExists) {
			const message: string = `Student not found (${studentName}) (${studentFilePath})`;

			console.warn(message);
			res.status(404).json({ student: student, message });

			return !isProd() ? next(message) : res.end();
		}

		student = { ...student, ...(await fs.readJSON(studentFilePath, { encoding: "utf-8" })) };

		/** BEGIN HACK PART 2 */

		const studentLessonsFilePath: string = path.join(latestScrapedDataDirPath, "lessons", studentName + ".json");
		const lessonsFileExists: boolean = await fs.pathExists(studentLessonsFilePath);

		if (!lessonsFileExists) {
			const message: string = `Student's lessons not found (${studentName})`;

			console.warn(message);
			res.status(404).json({ student: student, message });

			return !isProd() ? next(message) : res.end();
		}

		const lessons: any[] = await fs.readJSON(studentLessonsFilePath, {
			encoding: "utf-8",
		});

		student.lessons = lessons || [];

		/** END HACK PART 2*/
		/** END HACK */

		res.json({ student: student });
		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ student: student, message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as studentRouter };
