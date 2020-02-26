import { Router } from "express";

import { initDb, Db } from "@turbo-schedule/database";
import { Student, StudentFromList, Lesson } from "@turbo-schedule/common";

import { isProd } from "../../util/isProd";

const router: Router = Router();

/**
 * get an array of students (WITHOUT lessons)
 */
router.get("/", async (_req, res, next) => {
	try {
		const db: Db = await initDb(); /** TODO FIXME */

		const students: StudentFromList[] = db.get("students").value();

		res.json({ students });

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
	try {
		const db: Db = await initDb(); /** TODO FIXME */

		const studentName: string = decodeURIComponent(req.params.studentName);

		const studentFromList: StudentFromList = db
			.get("students")
			.find({ text: studentName })
			.value();

		const lessons: Lesson[] = db
			.get("lessons")
			.filter((lesson) => lesson.students.includes(studentFromList.text))
			.value();

		const student: Student = new Student({ ...studentFromList, lessons: lessons });

		res.json({ student });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ student: new Student(), message: err });

		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as studentRouter };
