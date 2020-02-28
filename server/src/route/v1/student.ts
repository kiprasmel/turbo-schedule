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

		if (!students?.length) {
			const msg: string = `Students not found (were \`${students}\`)`;

			console.error(msg);
			return res.status(404).json({ students: [], message: msg });
		}

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

		if (!studentFromList) {
			const msg: string = `Student not found (was \`${studentFromList}\`)`;

			console.error(msg);
			return res.status(404).json({ student: new Student(), message: msg });
		}

		const lessons: Lesson[] = db
			.get("lessons")
			.filter((lesson) => lesson.students.includes(studentFromList.text))
			.value();

		if (!lessons?.length) {
			const msg: string = `Lessons for student not found (were \`${lessons}\`)`;

			console.error(msg);
			return res.status(404).json({ student: studentFromList, message: msg });
		}

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
