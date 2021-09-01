/**
 * This is pretty much identical to the `student` & `class` API
 */

/* eslint-disable indent */

import { Router } from "express";

import { initDb, Db } from "@turbo-schedule/database";
import {
	Participant, //
	Lesson,
	Availability,
	pickNPseudoRandomly,
	pickSome,
	participantHasLesson,
	findParticipantsWithMultipleLessonsInSameTime,
	MinimalLesson,
	WantedParticipant,
	getDefaultParticipant,
	createParticipantHierarchy,
	ParticipantHierarchyManual,
	Student,
	uniq,
	mergeBy2,
} from "@turbo-schedule/common";

import { WithErr, withSender } from "../../middleware/withSender";

const router: Router = Router();

/**
 * get an array of schedule items (WITHOUT lessons)
 */
export interface ParticipantsRes extends WithErr {
	participants: Participant[];
}

router.get<any, ParticipantsRes>("/", withSender({ participants: [] }), async (_req, res) => {
	const send = res.sender;

	try {
		const db: Db = await initDb();

		const participants: Participant[] = await db.get("participants").value();

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

router.get<any, ParticipantRandomRes>("/random", withSender({ participants: [] }), async (req, res) => {
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

router.get<any, ParticipantHierarchyRes>(
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

export interface ParticipantCommonAvailabilityRes extends WithErr {
	minDayIndex: number;
	maxDayIndex: number;
	minTimeIndex: number;
	maxTimeIndex: number;
	availability: Availability[][];
}

const getDefaultParticipantCommonAvailRes = (): ParticipantCommonAvailabilityRes => ({
	minDayIndex: -1, //
	maxDayIndex: -1,
	minTimeIndex: -1,
	maxTimeIndex: -1,
	availability: [],
});

router.get<any, ParticipantCommonAvailabilityRes>(
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

			const minDayIndex = lessons.reduce((prevMin, curr) => Math.min(prevMin, curr.dayIndex), 1e9);
			const maxDayIndex = lessons.reduce((prevMax, curr) => Math.max(prevMax, curr.dayIndex), 0);

			const minTimeIndex = lessons.reduce((prevMin, curr) => Math.min(prevMin, curr.timeIndex), 1e9);
			const maxTimeIndex = lessons.reduce((prevMax, curr) => Math.max(prevMax, curr.timeIndex), 0);

			const availability: Availability[][] = [];

			/**
			 * O(fast enough)
			 */
			for (let i = minDayIndex; i <= maxDayIndex; i++) {
				availability[i] = [];

				for (let j = minTimeIndex; j <= maxTimeIndex; j++) {
					const related: Lesson[] = lessons.filter((l) => l.dayIndex === i && l.timeIndex === j);

					type Ret = {
						participant: Participant["text"];
						lesson: MinimalLesson;
					};
					/**
					 * there could be multiple participants in the same lesson,
					 * thus account for them all, not once.
					 */
					const getParticipants = (filterPred: (l: Lesson) => boolean): Ret[] => [
						...new Set(
							related.filter(filterPred).flatMap((l) =>
								[l.students, l.teachers, l.classes, l.rooms].flatMap((participants) =>
									participants
										.filter((participant) => wantedParticipants.includes(participant))
										.map(
											(participant): Ret => ({
												participant,
												lesson: {
													id: l.id,
													name: l.name,
												},
											})
										)
								)
							)
						),
					];

					let availableParticipants = getParticipants((l) => l.isEmpty);
					const bussyParticipants = getParticipants((l) => !l.isEmpty);

					/**
					 * TODO FIXME HACK:
					 *
					 * The scraper is messed up for some edge cases (upstream -_-),
					 * and there might be duplicate lessons, some not properly scraped.
					 *
					 * We know for a fact, though, that if a participant is bussy,
					 * it cannot be available -- this fixes the issue (temporarily),
					 * before we fix the underlying issue.
					 *
					 */
					availableParticipants = availableParticipants.filter(
						(p) => !bussyParticipants.some((bussyP) => p.participant === bussyP.participant)
					);

					availability[i][j] = {
						dayIndex: i, //
						timeIndex: j,
						availableParticipants,
						bussyParticipants,
					};
				}
			}

			return send(200, {
				minDayIndex, //
				maxDayIndex,
				minTimeIndex,
				maxTimeIndex,
				availability,
			});
		} catch (err) {
			return send(500, { err });
		}
	}
);

export interface ParticipantClassifyRes extends WithErr {
	participants: WantedParticipant[];
}

router.get<any, ParticipantClassifyRes>("/classify", withSender({ participants: [] }), async (req, res) => {
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

router.get<any, ParticipantDuplicatesRes>("/debug/duplicates", withSender({ duplicates: {} }), async (_req, res) => {
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

export type SimilarParticipant = { participant: Participant; foundInDbs: string[] };

/**
 * get full schedule of single participant by it's name
 */
export interface ParticipantScheduleByNameRes extends WithErr {
	participant: Participant;
	similarParticipants?: SimilarParticipant[];
}

router.get<any, ParticipantScheduleByNameRes>(
	"/:participantName",
	withSender({ participant: getDefaultParticipant(), similarParticipants: undefined }),
	async (req, res) => {
		// TODO:
		// const { sender: send, db } = res as any;
		const send = res.sender;

		let cancelled = false;

		try {
			// const db = await initDb(); // TODO FIXME

			const participantName: string = decodeURIComponent(req.params.participantName);

			console.log("name", participantName);

			req.on("close", () => {
				cancelled = true;
				console.log("request (1) cancelled!", participantName);
			});

			req.connection.on("close", () => {
				cancelled = true;
				console.log("connection (2) cancelled!", participantName);
			});

			if (cancelled) {
				return send(400, { err: `request cancelled (${participantName})` });
				// throw new Error("b4 1 request cancelled " + participantName);
			} else {
				console.log("b4 0 getdb: not cancelled (3)", participantName);
			}

			const db: Db = await (res as any).getdb();

			const participant: Participant = await db
				.get("participants")
				.find((p) => p.text.toLowerCase() === participantName.toLowerCase())
				.value();

			console.log("participant", participant?.text, !!participant);

			if (participant) {
				console.log("participant", participant);
				// const stateBefore = db.getState().scrapeInfo;
				// const stateAfter = await (await initDb()).getState().scrapeInfo;
				// console.log("db", stateBefore, stateAfter);

				const lessons: Lesson[] = await db
					.get("lessons")
					// .tap((tmplessons) => {
					// 	console.log("lessons", tmplessons.length);
					// 	console.log(tmplessons.map((l) => l.students));
					// 	console.log(
					// 		tmplessons.map((l) => l.students.length),
					// 		tmplessons.map((l) => l.classes.length),
					// 		tmplessons.map((l) => l.teachers.length),
					// 		tmplessons.map((l) => l.rooms.length)
					// 	);
					// })
					.filter(participantHasLesson(participant)) // TODO FIXME RE-ENABLE
					.value();

				if (!lessons?.length) {
					return send(404, { participant, err: `Lessons for participant not found (were \`${lessons}\`)` });
				}

				const participantWithLessons: Participant = { ...participant, lessons };

				return send(200, { participant: participantWithLessons });
			}

			/** attempt to find similar participants */

			if (cancelled) {
				return send(400, { err: `request cancelled (${participantName})` });
				// throw new Error("b4 1 request cancelled " + participantName);
			} else {
				console.log("b4 1 not cancelled (3)", participantName);
			}

			// const otherDbs: Promise<Db>[] = await (res as any).initOtherDbsSequential();
			const otherDbs: Db[] = await (res as any).initOtherDbsParallel();

			if (cancelled) {
				return send(400, { err: `request cancelled (${participantName})` });
				// throw new Error("b4 1 request cancelled " + participantName);
			} else {
				console.log("after parallel dbs: not cancelled (3)", participantName);
			}

			let similarParticipants: SimilarParticipant[] = [];

			for await (const otherDb of otherDbs) {
				if (cancelled) {
					return send(400, { err: `request cancelled (${participantName})` });
					// throw new Error("request cancelled " + participantName);
				} else {
					console.log("not cancelled (3)", participantName);
				}

				// const otherParticipants = await (await otherDb).get("participants");
				// const otherDb = await _otherDb;

				const otherParticipants = await otherDb.get("participants");

				const predicate = (p: Participant): boolean =>
					p.text.toLowerCase().includes(participantName.toLowerCase()) || //
					(p.labels[0] === "student" &&
						!!(p as Student).fullName &&
						(p as Student).fullName.toLowerCase().includes(
							participantName
								.toLowerCase()
								.split(" ")
								.slice(0, 2) // last + first name
								.join(" ")
						)) ||
					(p.labels[0] === "student" &&
						!!(p as Student).fullName &&
						(p as Student).fullName.toLowerCase().includes(
							participantName
								.toLowerCase()
								.split(" ")
								.slice(0, 2)
								.reverse() // first + last name
								.join(" ")
						)) ||
					false;

				const matchesInThisDb = otherParticipants.filter(predicate).value() ?? [];

				const mergeStrat = <
					T = Participant, //
					U extends { participant: T; foundInDbs: string[] } = { participant: T; foundInDbs: string[] }
				>(
					left: U,
					right: U
				): U => ({
					...left,
					...right,
					foundInDbs: uniq(left.foundInDbs, right.foundInDbs),
				});

				const merger = mergeBy2<SimilarParticipant, "participant", "text">(
					"participant", //
					"text",
					mergeStrat
				);

				similarParticipants = merger([
					...similarParticipants,
					...matchesInThisDb.map(
						(m): SimilarParticipant => ({
							participant: m,
							foundInDbs: [otherDb.get("scrapeInfo").value().pageVersionIdentifier],
						})
					),
				]);

				/** BEGIN INTENTIONALLY DISABLED - SEPARATE FOR SEPARETE GRADES A STUDENT HAS BEEN TO */

				// type SimilarStudent = { participant: Student; foundInDbs: string[] };

				// const additionalMergerForParticipantsWhoUpgradedClasses = mergeBy2<
				// 	SimilarStudent, //
				// 	"participant",
				// 	"fullName"
				// >("participant", "fullName", mergeStrat);

				// similarParticipants = [
				// 	/** ignore non-students */
				// 	...similarParticipants.filter((sp) => sp.participant.labels[0] !== "student"),
				// 	/** only merge students */
				// 	...additionalMergerForParticipantsWhoUpgradedClasses([
				// 		...(similarParticipants.filter(
				// 			(sp) => sp.participant.labels[0] === "student"
				// 		) as SimilarStudent[]),
				// 	]),
				// ];

				/** END INTENTIONALLY DISABLED - SEPARATE FOR SEPARETE GRADES A STUDENT HAS BEEN TO */
			}

			if (!similarParticipants.length) {
				return send(404, { err: `Participant not found (was \`${participant}\`)` });
			}

			/** https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300 */
			const multipleChoiceResCode: number = 300;

			return send(multipleChoiceResCode, {
				participant: undefined,
				similarParticipants: similarParticipants,
			});
		} catch (err) {
			return send(500, { err });
		}
	}
);

/** --- */

export { router as participantRouter };
