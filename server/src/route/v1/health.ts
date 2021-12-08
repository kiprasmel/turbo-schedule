/**
 * This is pretty much identical to the `student` & `class` API
 */

import { Router } from "express";

import { getDefaultHealth, Health } from "@turbo-schedule/common";
import { initDb, Db } from "@turbo-schedule/database";

import { WithErr, withSender } from "../../middleware/withSender";

const router: Router = Router();

/**
 * get an array of schedule items (WITHOUT lessons)
 */
export interface HealthRes extends WithErr {
	health: Health;
}

router.get<never, HealthRes>("/", withSender({ health: getDefaultHealth() }), async (_req, res) => {
	const send = res.sender;

	try {
		const db: Db = await initDb();

		/**
		 * TODO DB - put both into a `health` object
		 */
		const [isDataFake, scrapeInfo] = await Promise.all([
			db.get("isDataFake").value(),
			db.get("scrapeInfo").value(),
		] as const);

		const health: HealthRes["health"] = {
			isDataFake,
			scrapeInfo,
		};

		return send(200, { health });
	} catch (err) {
		return send(500, { err });
	}
});

export { router as healthRouter };
