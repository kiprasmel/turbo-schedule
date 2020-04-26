/**
 * This is pretty much identical to the `student` & `class` API
 */

import { Router } from "express";

import { initDb, Db } from "@turbo-schedule/database";
import { Class, Lesson, StudentFromList, Teacher, Room } from "@turbo-schedule/common";

import { isProd } from "../../util/isProd";

const router: Router = Router();

/**
 * get an array of schedule items (WITHOUT lessons)
 */
router.get("/", async (_req, res, next) => {
	try {
		const db: Db = await initDb();

		const classes: Class[] = await db.get("classes").value();
		const students: StudentFromList[] = await db.get("students").value();
		const teachers: Teacher[] = await db.get("teachers").value();
		const rooms: Room[] = await db.get("rooms").value();

		const scheduleItems = [...students, ...classes, ...teachers, ...rooms];

		if (!scheduleItems?.length) {
			const msg: string = `Schedule items not found (were \`${scheduleItems}\`)`;

			console.error(msg);
			return res.status(404).json({ scheduleItems: [], message: msg });
		}

		res.json({ scheduleItems });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ scheduleItems: [], message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/**
 * get full schedule of single scheduleItem by it's name
 */
router.get("/:scheduleItemName", async (req, res, next) => {
	try {
		const db: Db = await initDb();

		const scheduleItemName: string = decodeURIComponent(req.params.scheduleItemName);

		/**
		 * TODO use a function to determine if this is a class or a student
		 * & query only once.
		 */
		const student: StudentFromList = await db
			.get("students")
			.find({ text: scheduleItemName })
			.value();

		const theClass: Class | undefined = await db
			.get("classes")
			.value()
			.find((c) => c.text.toLowerCase() === scheduleItemName.toLowerCase());

		const teacher: Teacher = await db
			.get("teachers")
			.find({ text: scheduleItemName })
			.value();

		const room: Room = await db
			.get("rooms")
			.find({ text: scheduleItemName })
			.value();

		const scheduleItem = student ?? theClass ?? teacher ?? room;

		if (!scheduleItem) {
			const msg: string = `ScheduleItem not found (was \`${scheduleItem}\`)`;

			console.error(msg);
			return res.status(404).json({ scheduleItem: {}, message: msg });
		}

		const lessons: Lesson[] = db
			.get("lessons")
			.filter(
				(lesson) =>
					lesson.students.includes(scheduleItem.text) ||
					/** BEGIN TODO PARTICIPANTS */ lesson.teacher
						.split(",")
						.map((t: Teacher["text"]) => t.trim())
						.includes(scheduleItem.text) ||
					lesson.room
						.split(",")
						.map((r: Room["text"]) => r.trim())
						.includes(scheduleItem.text)
				/** END TODO PARTICIPANTS */
			)
			.value();

		if (!lessons?.length) {
			const msg: string = `Lessons for scheduleItem not found (were \`${lessons}\`)`;

			console.error(msg);
			return res.status(404).json({ scheduleItem, message: msg });
		}

		const scheduleItemWithLessons = { ...scheduleItem, lessons };

		res.json({ scheduleItem: scheduleItemWithLessons });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ scheduleItem: {}, message: err });

		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as scheduleItemRouter };
