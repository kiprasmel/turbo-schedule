/**
 * This is pretty much identical to the `student` & `class` API
 */

import path from "path";

import { Router } from "express";
import workerpool from "workerpool";

import { initDb, Db } from "@turbo-schedule/database";
import {
	Participant, //
	Lesson,
	pickNPseudoRandomly,
	pickSome,
	participantHasLesson,
	findParticipantsWithMultipleLessonsInSameTime,
	WantedParticipant,
	getDefaultParticipant,
	createParticipantHierarchy,
	ParticipantHierarchyManual,
	computeCommonAvailability,
	ParticipantCommonAvailability,
	Perf,
	getDefaultParticipantCommonAvail,
} from "@turbo-schedule/common";

import { WithErr, withSender } from "../../middleware/withSender";
import { isProd } from "../../util/isProd";


const router: Router = Router();

const worker = workerpool.pool(path.join(__dirname, "participantWorker.js"), { workerType: "thread" });
// const worker = workerpool.pool({workerType: "thread"});

/**
 * get an array of schedule items (WITHOUT lessons)
 */
export interface ParticipantsRes extends WithErr {
	participants: Omit<Participant, "lessons">[];
}

router.get<never, ParticipantsRes>("/", withSender({ participants: [] }), async (_req, res) => {
	const send = res.sender;
	const perf = new Perf("participant-list");

	try {
		const db: Db = await initDb();
		perf.track("init-db");

		const participants: ParticipantsRes["participants"] = await db.get("participants").value();
		perf.track("db-get-participants");

		if (!participants?.length) {
			return send(404, { err: `Schedule items not found (were \`${participants}\`)` });
		}

		return send(200, { participants });
	} catch (err) {
		return send(500, { err });
	} finally {
		perf.end("send");
	}
});

/**
 * req.query:
 * - `count` (optional): exact count of how many participants to return
 * - `max`   (optional): maximum number of participants to return IF an exact count is not specified
 */
export interface ParticipantRandomRes extends WithErr {
	participants: Participant[];
}

router.get<never, ParticipantRandomRes>("/random", withSender({ participants: [] }), async (req, res) => {
	const send = res.sender;
	const perf = new Perf("participant-randoms");

	try {
		const db: Db = await initDb();
		perf.track("init-db");
		const participants: Participant[] = await db.get("participants").value();
		perf.track("db-get-participants");

		if (!req.query?.["count"]) {
			const maxCount: number = Number(req.query?.["max"]) || 32;
			return send(200, { participants: pickSome(participants, { maxCount }) });
		}

		const n = Number(req.query?.["count"]);

		if (Number.isNaN(n)) {
			return send(400, {
				participants: [],
				err: `req.query.count NaN (provided as \`${req.query?.["count"]}\`, parsed as ${n})`,
			});
		}

		return send(200, { participants: pickNPseudoRandomly(n)(participants) });
	} catch (err) {
		return send(500, { err });
	} finally {
		perf.end("send");
	}
});

export interface ParticipantHierarchyRes extends WithErr {
	hierarchy: ParticipantHierarchyManual;
}

router.get<never, ParticipantHierarchyRes>(
	"/hierarchy",
	withSender({ hierarchy: createParticipantHierarchy([]) }), // TODO - is this even working?
	async (_req, res) => {
		const send = res.sender;
		const perf = new Perf("participant-hierarchy");

		try {
			const db: Db = await initDb();
			perf.track("init-db");

			const participants: Participant[] = await db.get("participants").value();
			perf.track("db-get-participants");

			const hierarchy: ParticipantHierarchyManual = createParticipantHierarchy(participants);
			perf.trackCustom("participant-hierarchy");

			return send(200, { hierarchy });
		} catch (err) {
			return send(500, { err });
		} finally {
			perf.end("send");
		}
	}
);

export type ParticipantCommonAvailabilityRes = WithErr & ParticipantCommonAvailability & {
	//
}

router.get<never, ParticipantCommonAvailabilityRes>(
	"/common-availability",
	withSender(getDefaultParticipantCommonAvail()),
	async (req, res) => {
		const send = res.sender;
		const perf = new Perf("participant-common-avail");

		try {
			const db = await initDb();
			perf.track("init-db");

			const reqQueryWP = req.query?.["wanted-participants"];

			const wantedParticipants: Participant["text"][] = (reqQueryWP?.split?.(",") || [])
				.map((p: string) => p.trim())
				.filter((p: string) => !!p);
			perf.trackCustom("wanted participants");

			if (!wantedParticipants.length) {
				return send(400, {
					err: `Request query \`wanted-participants\` was empty (${wantedParticipants})`,
				});
			}

			const lessons: Lesson[] = db
				.get("lessons")
				.filter(
					(l) =>
						wantedParticipants.some((w) => l.students.includes(w)) ||
						wantedParticipants.some((w) => l.classes.includes(w)) ||
						wantedParticipants.some((w) => l.teachers.includes(w)) ||
						wantedParticipants.some((w) => l.rooms.includes(w))
				)
				.value();
			perf.trackCustom("find lessons");

			// const availability: ParticipantCommonAvailability = await worker.exec<typeof computeCommonAvailability>("computeCommonAvailability", [lessons, wantedParticipants]);
			// const availability: ParticipantCommonAvailability = await worker.exec(computeCommonAvailability, [lessons, wantedParticipants]);
			// const availability: ParticipantCommonAvailability = computeCommonAvailability(lessons, wantedParticipants);
			// const availability: ParticipantCommonAvailability | null = await worker.exec(fullCompute, [db, reqQueryWP]);

			// console.log("isProd:",isProd());

			/**
			 * the relative file will only be available once the project is built, thus in prod.
			 * otherwise, using dynamic loading of functions is worse than calling the fn regularly.
			 */
			const availability: ParticipantCommonAvailability = isProd() ? await worker.exec(computeCommonAvailability, [lessons, wantedParticipants]) : computeCommonAvailability(lessons,wantedParticipants);
			perf.trackCustom("compute avail");

			if (!availability) {
				return send(400, {
					err: `Request query \`wanted-participants\` was empty (${wantedParticipants})`,
					// err: `Request query \`wanted-participants\` was empty`,
				});
			}

			return send(200, availability);
		} catch (err) {
			return send(500, { err });
		} finally {
			perf.end("send");
		}
	}
);

export interface ParticipantClassifyRes extends WithErr {
	participants: WantedParticipant[];
}

router.get<never, ParticipantClassifyRes>("/classify", withSender({ participants: [] }), async (req, res) => {
	const send = res.sender;
	const perf = new Perf("participant-classifier");

	try {
		const participants: string = req.query?.["participants"];
		perf.trackCustom("req query participants", participants.length);

		if (!participants.length) {
			return send(400, { err: `No participants included in request.query (${participants})`});
		}

		const db: Db = await initDb();
		perf.track("init-db");

		const classifiedParticipants: ParticipantClassifyRes["participants"] = await db
			.get("participants")
			.filter((p) => participants.includes(p.text))
			.map((p) => ({ text: p.text, labels: p.labels }))
			.value();
		perf.trackCustom("db get participants & classify");

		return send(200, { participants: classifiedParticipants });
	} catch (err) {
		return send(500, { err });
	} finally {
		perf.end("send");
	}
});

export interface ParticipantDuplicatesRes extends WithErr {
	duplicates: Record<string, Record<string, Lesson[]>>;
}

router.get<never, ParticipantDuplicatesRes>("/debug/duplicates", withSender({ duplicates: {} }), async (_req, res) => {
	try {
		const db: Db = await initDb();

		const participants: Participant[] = db.get("participants").value();
		const lessons: Lesson[] = db.get("lessons").value();

		const duplicates = findParticipantsWithMultipleLessonsInSameTime(participants, lessons);

		return res.sender(200, { duplicates });
	} catch (err) {
		return res.sender(500, { err });
	}
});

/**
 * get full schedule of single participant by it's name
 */
export interface ParticipantScheduleByNameRes extends WithErr {
	participant: Participant;
}

router.get<{ participantName: string }, ParticipantScheduleByNameRes>(
	"/:participantName",
	withSender({ participant: getDefaultParticipant() }),
	async (req, res) => {
		const send = res.sender;
		const perf = new Perf("participant-with-lessons");

		try {
			const participantName: string = decodeURIComponent(req.params.participantName);
			perf.trackCustom("participant name", participantName);

			const db: Db = await initDb();
			perf.track("init-db");

			const participant: Participant = await db
				.get("participants")
				.find((p) => p.text.toLowerCase() === participantName.toLowerCase())
				.value();
				perf.trackCustom("find participant");

			if (!participant) {
				return send(404, { err: `Participant not found (was \`${participant}\`)` });
			}

			const lessons: Lesson[] = await db
				.get("lessons")
				.filter(participantHasLesson(participant))
				.value();
				perf.trackCustom("find lessons of participant");

			if (!lessons?.length) {
				return send(404, { participant, err: `Lessons for participant not found (were \`${lessons}\`)` });
			}

			const participantWithLessons: Participant = { ...participant, lessons };

			return send(200, { participant: participantWithLessons });
		} catch (err) {
			return send(500, { err });
		} finally {
			perf.end("send");
		}
	}
);

/** --- */

export { router as participantRouter };
