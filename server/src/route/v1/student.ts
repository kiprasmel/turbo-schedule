import { Router } from "express";
import fs from "fs-extra";
import path from "path";
import { IStudent, Student } from "@turbo-schedule/common";

import { isProd } from "../../../src/util/isProd";
import { latestScrapedDataDirPath } from "../../config";

const router: Router = Router();

/**
 * get an array of students
 */
router.get("/", async (_req, res, next) => {
	try {
		const studentsArrayFilePath: string = path.join(
			latestScrapedDataDirPath,
			"students-data-array.json"
		);
		const fileExists: boolean = await fs.pathExists(studentsArrayFilePath);

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

		const students: IStudent[] = await fs.readJSON(studentsArrayFilePath, {
			encoding: "utf-8"
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
 */
router.get("/:studentName", async (req, res, next) => {
	try {
		const studentName: string = decodeURIComponent(req.params.studentName);
		const studentLessonsFilePath: string = path.join(
			latestScrapedDataDirPath,
			"lessons",
			studentName + ".json"
		);
		const fileExists: boolean = await fs.pathExists(studentLessonsFilePath);

		if (!fileExists) {
			const message: string = `Student not found (${studentName})`;

			console.warn(message);
			res.status(404).json({ lessons: [], message });

			return !isProd() ? next(message) : res.end();
		}

		const lessons: any[] = await fs.readJSON(studentLessonsFilePath, {
			encoding: "utf-8"
		});

		res.json({ lessons: lessons });
		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ lessons: [], message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as studentRouter };
