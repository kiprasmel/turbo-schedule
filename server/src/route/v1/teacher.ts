/**
 * This is pretty much identical to the `student` API
 */

import { Router } from "express";

import { initDb, Db } from "@turbo-schedule/database";
import { createTeacher, Lesson, Teacher } from "@turbo-schedule/common";

import { isProd } from "../../util/isProd";

const router: Router = Router();

/**
 * get an array of teachers (WITHOUT lessons)
 */
router.get("/", async (_req, res, next) => {
	try {
		const db: Db = await initDb();

		const teachers: Teacher[] = await db.get("teachers").value();

		if (!teachers?.length) {
			const msg: string = `Teachers not found (were \`${teachers}\`)`;

			console.error(msg);
			return res.status(404).json({ teachers: [], message: msg });
		}

		res.json({ teachers });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ teachers: [], message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/**
 * get full schedule of single teacher by it's name
 */
router.get("/:teacherName", async (req, res, next) => {
	try {
		const db: Db = await initDb();

		const teacherName: string = decodeURIComponent(req.params.teacherName);

		const teacher: Teacher | undefined = await db
			.get("teachers")
			.value()
			.find((t) => t.text.toLowerCase() === teacherName.toLowerCase());

		if (!teacher) {
			const msg: string = `Teacher not found (was \`${teacher}\`)`;

			console.error(msg);
			return res.status(404).json({ teacher: createTeacher(), message: msg });
		}

		const lessons: Lesson[] = await db
			.get("lessons")
			.filter(
				(lesson) =>
					lesson.teacher
						.split(",")
						.map((t: Teacher["text"]) => t.trim())
						.includes(teacher.text) ||
					/** BEGIN TODO PARTICIPANTS */ lesson.students.includes(teacher.text) /** END TODO PARTICIPANTS */
			)
			.value();

		if (!lessons?.length) {
			const msg: string = `Lessons for teacher not found (were \`${lessons}\`)`;

			console.error(msg);
			return res.status(404).json({ teacher, message: msg });
		}

		const teacherWithLessons: Teacher = { ...teacher, lessons };

		res.json({ teacher: teacherWithLessons });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ teacher: createTeacher(), message: err });

		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as teacherRouter };
