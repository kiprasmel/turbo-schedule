import { Router } from "express";
import fs from "fs-extra";
import path from "path";

import { isProd } from "../../../src/util/isProd";
import { latestScrapedDataDirPath } from "../../config";

const router: Router = Router();

/**
 * get list of students
 */
router.get("/", async (_req, res, next) => {
	try {
		const studentsListFilePath: string = path.join(latestScrapedDataDirPath, "students-data-array.json");
		const fileExists: boolean = await fs.pathExists(studentsListFilePath);

		if (!fileExists) {
			/**
			 * this is bad because this is not dependant on any inputs -
			 * this only happens if we failed setting up something ourselves.
			 */
			const message: string = `Student list file not found (server error)!`;

			console.error(message);
			res.status(500).json({ studentsList: [], message });

			return !isProd() ? next(message) : res.end();
		}

		const studentsList: any[] = await fs.readJSON(studentsListFilePath, { encoding: "utf-8" });

		res.json({ studentsList });
		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ studentsList: [], message: err });
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
		const studentLessonsFilePath: string = path.join(latestScrapedDataDirPath, "lessons", studentName + ".json");
		const fileExists: boolean = await fs.pathExists(studentLessonsFilePath);

		if (!fileExists) {
			const message: string = "Student not found";

			console.warn(message);
			res.status(404).json({ studentSchedule: [], message });
			return !isProd() ? next(message) : res.end();
		}

		const studentLessons: any[] = await fs.readJSON(studentLessonsFilePath, { encoding: "utf-8" });

		res.json({ studentSchedule: studentLessons });
		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ studentSchedule: [], message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as studentRouter };
