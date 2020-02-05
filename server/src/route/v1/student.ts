import { Router } from "express";
import fs from "fs-extra";

import { Student } from "@turbo-schedule/common";
import { isProd } from "../../util/isProd";
import { studentsFilePath, getStudentFilePath } from "../../config";

const router: Router = Router();

/**
 * get an array of students
 */
router.get("/", async (_req, res, next) => {
	try {
		const fileExists: boolean = await fs.pathExists(studentsFilePath);

		if (!fileExists) {
			/**
			 * this is bad because this is not dependant on any inputs -
			 * this only happens if we failed setting up something ourselves.
			 */
			const message: string = `Students array file not found (server error)!\nWas \`${studentsFilePath}\``;

			console.error(message);
			res.status(500).json({ students: [], message });

			return !isProd() ? next(message) : res.end();
		}

		const students: Student[] = await fs.readJSON(studentsFilePath, {
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
