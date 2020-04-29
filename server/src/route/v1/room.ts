/**
 * This is pretty much identical to the `student` API
 */

import { Router } from "express";

import { initDb, Db } from "@turbo-schedule/database";
import { getDefaultRoom, Lesson, Room } from "@turbo-schedule/common";

import { isProd } from "../../util/isProd";

const router: Router = Router();

/**
 * get an array of rooms (WITHOUT lessons)
 */
router.get("/", async (_req, res, next) => {
	try {
		const db: Db = await initDb();

		const rooms: Room[] = await db.get("rooms").value();

		if (!rooms?.length) {
			const msg: string = `Rooms not found (were \`${rooms}\`)`;

			console.error(msg);
			return res.status(404).json({ rooms: [], message: msg });
		}

		res.json({ rooms });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ rooms: [], message: err });
		return !isProd() ? next(err) : res.end();
	}
});

/**
 * get full schedule of single room by it's name
 */
router.get("/:roomName", async (req, res, next) => {
	try {
		const db: Db = await initDb();

		const roomName: string = decodeURIComponent(req.params.roomName);

		const room: Room | undefined = await db
			.get("rooms")
			.value()
			.find((t) => t.text.toLowerCase() === roomName.toLowerCase());

		if (!room) {
			const msg: string = `Room not found (was \`${room}\`)`;

			console.error(msg);
			return res.status(404).json({ room: getDefaultRoom(), message: msg });
		}

		const lessons: Lesson[] = await db
			.get("lessons")
			.filter((lesson) => lesson.rooms.includes(room.text))
			.value();

		if (!lessons?.length) {
			const msg: string = `Lessons for room not found (were \`${lessons}\`)`;

			console.error(msg);
			return res.status(404).json({ room, message: msg });
		}

		const roomWithLessons: Room = { ...room, lessons };

		res.json({ room: roomWithLessons });

		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ room: getDefaultRoom(), message: err });

		return !isProd() ? next(err) : res.end();
	}
});

/** --- */

export { router as roomRouter };
