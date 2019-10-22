import { Router } from "express";
import fs from "fs-extra";

import { isProd } from "../../../src/util/isProd";
import { config } from "../../config";
const { latestContentPath } = config;

const router: Router = Router();

/**
 * get list of students
 */
router.get("/", async (_req, res, next) => {
	try {
		console.log("student/");

		const studentsListFile: string = await fs.readFile(latestContentPath + "/students-data-array.json", {
			encoding: "utf-8",
		});

		const studentsList: Array<any> = JSON.parse(studentsListFile);

		res.json({ studentsList });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.log("error!", err);
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
		const studentName = decodeURIComponent(req.params.studentName);

		console.log(`/student:${studentName}`);

		const filePath: string = `${latestContentPath}/lessons/${studentName}.json`;

		const fileExists: boolean = await fs.pathExists(filePath);

		if (!fileExists) {
			const errMsg: string = "Student not found";

			res.status(404).json({ error: errMsg });
			return !isProd() ? next(errMsg) : res.end();
		}

		const studentLessonArrayFile: string = await fs.readFile(filePath, { encoding: "utf-8" });
		const studentLessonArray: Array<any> = JSON.parse(studentLessonArrayFile);

		res.json({ studentSchedule: studentLessonArray });
		return !isProd() ? next() : res.end();
	} catch (err) {
		console.log("error!", err);
		res.status(500).json({ error: err });
		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as studentRouter };
