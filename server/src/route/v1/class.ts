/**
 * This is pretty much identical to the `student` API
 */

import { Router } from "express";

import { initDb, Db } from "@turbo-schedule/database";
import { Class, createClass, Lesson } from "@turbo-schedule/common";

import { isProd } from "../../util/isProd";

const router: Router = Router();

/**
 * get an array of classes (WITHOUT lessons)
 */
router.get("/", async (_req, res, next) => {
	try {
		const db: Db = await initDb();

		const classes: Class[] = await db.get("classes").value();

		if (!classes?.length) {
			const msg: string = `Classes not found (were \`${classes}\`)`;

			console.error(msg);
			return res.status(404).json({ classes: [], message: msg });
		}

		res.json({ classes });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ classes: [], message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/**
 * get full schedule of single class by it's name
 */
router.get("/:className", async (req, res, next) => {
	try {
		const db: Db = await initDb();

		const className: string = decodeURIComponent(req.params.className);

		const theClass: Class | undefined = await db
			.get("classes")
			.value()
			.find((c) => c.text.toLowerCase() === className.toLowerCase());

		if (!theClass) {
			const msg: string = `Class not found (was \`${theClass}\`)`;

			console.error(msg);
			return res.status(404).json({ class: createClass(), message: msg });
		}

		const lessons: Lesson[] = await db
			.get("lessons")
			.filter((lesson) => lesson.students.includes(theClass.text))
			.value();

		if (!lessons?.length) {
			const msg: string = `Lessons for class not found (were \`${lessons}\`)`;

			console.error(msg);
			return res.status(404).json({ class: theClass, message: msg });
		}

		const classWithLessons: Class = { ...theClass, lessons };

		res.json({ class: classWithLessons });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ class: createClass(), message: err });

		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as classRouter };
