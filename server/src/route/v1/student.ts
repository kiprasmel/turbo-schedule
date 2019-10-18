import { Router } from "express";
import fs from "fs";

import { config } from "../../config";
const { latestContentPath } = config;

const router: Router = Router();

/**
 * get list of students
 */
router.get("/", async (_req, res, next) => {
	console.log("student/");

	let studentsListFile: string = "";
	let studentsList: Array<any> = [];

	fs.readFile(latestContentPath + "/students-data-array.json", { encoding: "utf-8" }, (err, data) => {
		if (err) {
			console.log("error!" + err);
			res.status(500).json({ error: err });
			return next(err);
		}

		studentsListFile = data;
		// console.log("TCL: studentsListFile", studentsListFile);

		studentsList = JSON.parse(studentsListFile);

		res.json({ studentsList });
		return next();
	});
});

/**
 * get full schedule of single student by it's name
 *
 * @note make sure to encode the URI component (`studentName`)! (TODO)
 */
router.get("/:studentName", async (req, res, next) => {
	try {
		console.log("student/:studentName");

		let { studentName } = req.params;

		console.log("studentName", studentName, "decoded", decodeURIComponent(studentName));

		studentName = decodeURIComponent(studentName);

		let studentLessonArrayFile: string = "";
		let studentLessonArray: Array<any> = [];

		const filePath: string = `${latestContentPath}/lessons/${studentName}.json`;

		// fs.access(filePath, (err) => {})
		// const error = await fsPromises.stat(filePath);
		// console.log("error?", error);

		// let fileExists: boolean = !!error;
		const fileExists: boolean = await fs.promises
			.access(filePath)
			.then(() => true)
			.catch(() => false);

		//(filePath, (exists: boolean) => {
		// 	fileExists = exists;
		// 	console.log("fileExists =", fileExists);
		// });

		if (!fileExists) {
			console.log("file does not exist");

			const errMsg: string = "Student not found";

			res.status(404).json({ error: errMsg });
			return next(errMsg);
		}

		console.log("continuing after testing if exists");

		// fs.readFile(`saved-content/2019-09-03/lessons/${studentName}`, { encoding: "utf-8" }, (err, data) => {
		fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
			if (err) {
				console.log("error!" + err);
				res.status(500).json({ error: err });
				return next(err);
			}

			studentLessonArrayFile = data;

			studentLessonArray = JSON.parse(studentLessonArrayFile);

			res.json({ studentSchedule: studentLessonArray });
			return next();
		});
	} catch (err) {
		console.log("error!", err);
		res.status(500).json({ error: err });
		return next(err);
	}

	return;
});

/** --- */

export { router as studentRouter };
