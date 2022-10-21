/**
 * This is pretty much identical to the `student` & `class` API
 */

import { Router } from "express";

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
} from "@turbo-schedule/common";

import { WithErr, withSender } from "../../middleware/withSender";

const router: Router = Router();

/**
 * get an array of schedule items (WITHOUT lessons)
 */
export interface ParticipantsRes extends WithErr {
	participants: Omit<Participant, "lessons">[];
}

router.get<never, ParticipantsRes>("/", withSender({ participants: [] }), async (_req, res) => {
	const send = res.sender;

	try {
		const db: Db = await initDb();

		const participants: ParticipantsRes["participants"] = await db.get("participants").value();

		if (!participants?.length) {
			return send(404, { err: `Schedule items not found (were \`${participants}\`)` });
		}

		return send(200, { participants });
	} catch (err) {
		return send(500, { err });
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

	try {
		const db: Db = await initDb();
		const participants: Participant[] = await db.get("participants").value();

		if (!req.query["count"]) {
			const maxCount: number = Number(req.query["max"]) || 32;
			return send(200, { participants: pickSome(participants, { maxCount }) });
		} else {
			const n = Number(req.query["count"]);

			if (Number.isNaN(n)) {
				return send(400, {
					participants: [],
					err: `req.query.count NaN (provided as \`${req.query["count"]}\`, parsed as ${n})`,
				});
			} else {
				return send(200, { participants: pickNPseudoRandomly(n)(participants) });
			}
		}
	} catch (err) {
		return send(500, { err });
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

		try {
			const db: Db = await initDb();
			const participants: Participant[] = await db.get("participants").value();

			const hierarchy: ParticipantHierarchyManual = createParticipantHierarchy(participants);

			return send(200, { hierarchy });
		} catch (err) {
			return send(500, { err });
		}
	}
);

export type ParticipantCommonAvailabilityRes = WithErr & ParticipantCommonAvailability & {
	//
}

const getDefaultParticipantCommonAvailRes = (): ParticipantCommonAvailabilityRes => ({
	minDayIndex: -1, //
	maxDayIndex: -1,
	minTimeIndex: -1,
	maxTimeIndex: -1,
	availability: [],
});

router.get<never, ParticipantCommonAvailabilityRes>(
	"/common-availability",
	withSender(getDefaultParticipantCommonAvailRes()),
	async (req, res) => {
		const send = res.sender;

		try {
			const db: Db = await initDb();

			const wantedParticipants: Participant["text"][] =
				req.query?.["wanted-participants"]
					?.split(",")
					?.map((p: string | any) => p?.trim())
					.filter((p: string | any) => !!p) ?? [];

			const totalWantedParticipants: number = wantedParticipants.length;

			console.log(wantedParticipants, totalWantedParticipants);

			if (!wantedParticipants.length) {
				return send(400, {
					err: `Request query \`wanted-participants\` was empty (${wantedParticipants})`,
				});
			}

			const lessons: Lesson[] = await db
				.get("lessons")
				.filter(
					(l) =>
						wantedParticipants.some((w) => l.students.includes(w)) ||
						wantedParticipants.some((w) => l.classes.includes(w)) ||
						wantedParticipants.some((w) => l.teachers.includes(w)) ||
						wantedParticipants.some((w) => l.rooms.includes(w))
				)
				.value();

			const availability: ParticipantCommonAvailability = computeCommonAvailability(lessons, wantedParticipants);

			return send(200, availability);
		} catch (err) {
			return send(500, { err });
		}
	}
);

export interface ParticipantClassifyRes extends WithErr {
	participants: WantedParticipant[];
}

router.get<never, ParticipantClassifyRes>("/classify", withSender({ participants: [] }), async (req, res) => {
	const send = res.sender;

	try {
		const participants: string[] =
			req.query?.["participants"]
				?.split(",")
				?.map((p: string) => p?.trim())
				.filter((p: string) => !!p) ?? [];

		if (!participants.length) {
			return send(400, { err: `No participants included in request.query (${participants})` });
		}

		const db: Db = await initDb();

		const classifiedParticipants: ParticipantClassifyRes["participants"] = await db
			.get("participants")
			.filter((p) => participants.includes(p.text))
			.map((p) => ({ text: p.text, labels: p.labels }))
			.value();

		return send(200, { participants: classifiedParticipants });
	} catch (err) {
		return send(500, { err });
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

		try {
			const db: Db = await initDb();

			const participantName: string = decodeURIComponent(req.params.participantName);

			console.log("name", participantName);

			const participant: Participant = await db
				.get("participants")
				.find((p) => p.text.toLowerCase() === participantName.toLowerCase())
				.value();

			if (!participant) {
				return send(404, { err: `Participant not found (was \`${participant}\`)` });
			}

			const lessons: Lesson[] = await db
				.get("lessons")
				.filter(participantHasLesson(participant))
				.value();

			if (!lessons?.length) {
				return send(404, { participant, err: `Lessons for participant not found (were \`${lessons}\`)` });
			}

			const participantWithLessons: Participant = { ...participant, lessons };

			return send(200, { participant: participantWithLessons });
		} catch (err) {
			return send(500, { err });
		}
	}
);

/** --- */

export { router as participantRouter };
