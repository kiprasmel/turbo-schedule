import { Router } from "express";
import fs from "fs";

import { config } from "../../config";
const { latestContentPath } = config;

const router: Router = Router();

/**
 * get list of students
 */
router.get("/", async (_req, res) => {
	console.log("student/");

	let studentsListFile: string = "";
	let studentsList: Array<any> = [];

	fs.readFile(latestContentPath + "/students-data-array.json", { encoding: "utf-8" }, (err, data) => {
		if (err) {
			console.log("error!" + err);
			return res.status(500).json({ error: err });
		}

		studentsListFile = data;
		// console.log("TCL: studentsListFile", studentsListFile);

		studentsList = JSON.parse(studentsListFile);

		return res.json({ studentsList });
	});
});

/**
 * get full schedule of single student by it's name
 *
 * @note make sure to encode the URI component (`studentName`)! (TODO)
 */
router.get("/:studentName", async (req, res) => {
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
			return res.status(404).json({ error: "Student not found" });
		}

		console.log("continuing after testing if exists");

		// fs.readFile(`saved-content/2019-09-03/lessons/${studentName}`, { encoding: "utf-8" }, (err, data) => {
		fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
			if (err) {
				console.log("error!" + err);
				return res.status(500).json({ error: err });
			}

			studentLessonArrayFile = data;

			studentLessonArray = JSON.parse(studentLessonArrayFile);

			return res.json({ studentSchedule: studentLessonArray });
		});
	} catch (err) {
		console.log("error!", err);
		return res.status(500).json({ error: err });
	}

	return;
});

router.get("*", async (_req, res) => {
	console.log("student/* unmatched");
	return res.status(400).json({ error: "Unmatched route" });
});

/** --- */

export { router as studentRouter };
