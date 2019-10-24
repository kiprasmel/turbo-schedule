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
		const studentsList: any[] = await fs.readJSON(studentsListFilePath, { encoding: "utf-8" });

		res.json({ studentsList });

		return !isProd() ? next() : res.end();
	} catch (err) {
		res.status(500).json({ studentsList: [], error: err });
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
			const errMsg: string = "Student not found";

			res.status(404).json({ studentSchedule: [], error: errMsg });
			return !isProd() ? next(errMsg) : res.end();
		}

		const studentLessons: any[] = await fs.readJSON(studentLessonsFilePath, { encoding: "utf-8" });

		res.json({ studentSchedule: studentLessons });
		return !isProd() ? next() : res.end();
	} catch (err) {
		res.status(500).json({ studentSchedule: [], error: err });
		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as studentRouter };
