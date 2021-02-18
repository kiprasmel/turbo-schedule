/**
 * This is pretty much identical to the `student` & `class` API
 */

import { Router } from "express";

import { initDb, Db } from "@turbo-schedule/database";
import { Participant, Lesson } from "@turbo-schedule/common";

import { isProd } from "../../util/isProd";

const router: Router = Router();

/**
 * get an array of schedule items (WITHOUT lessons)
 */
router.get("/", async (_req, res, next) => {
	try {
		const db: Db = await initDb();

		const participants: Participant[] = await db.get("participants").value();

		if (!participants?.length) {
			const msg: string = `Schedule items not found (were \`${participants}\`)`;

			console.error(msg);
			return res.status(404).json({ participants: [], message: msg });
		}

		res.json({ participants });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ participants: [], message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/**
 * get full schedule of single participant by it's name
 */
router.get("/:participantName", async (req, res, next) => {
	try {
		const db: Db = await initDb();

		const participantName: string = decodeURIComponent(req.params.participantName);

		console.log("name", participantName);

		const participant: Participant = await db
			.get("participants")
			.find((p) => p.text.toLowerCase() === participantName.toLowerCase())
			.value();

		if (!participant) {
			const msg: string = `Participant not found (was \`${participant}\`)`;

			console.error(msg);
			return res.status(404).json({ participant: {}, message: msg });
		}

		const lessons: Lesson[] = await db
			.get("lessons")
			.filter(
				(lesson) =>
					lesson.students.includes(participant.text) ||
					lesson.classes.includes(participant.text) ||
					lesson.teachers.includes(participant.text) ||
					lesson.rooms.includes(participant.text)
			)
			.value();

		if (!lessons?.length) {
			const msg: string = `Lessons for participant not found (were \`${lessons}\`)`;

			console.error(msg);
			return res.status(404).json({ participant, message: msg });
		}

		const participantWithLessons: Participant = { ...participant, lessons };

		res.json({ participant: participantWithLessons });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ participant: {}, message: err });

		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as participantRouter };
