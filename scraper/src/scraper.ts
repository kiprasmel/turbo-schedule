import fs from "fs-extra";

import {
	Class,
	StudentFromList, //
	Lesson,
	ScrapeInfo,
	timeElapsedMs,
	Teacher,
	Room,
	Participant,
	ParticipantLabel,
} from "@turbo-schedule/common";
import { DbSchema, setDbStateAndBackupCurrentOne } from "@turbo-schedule/database";

import { IScraperConfig } from "./config";

import { OrderedCollectorsOfParticipants } from "./initializer/Initializer";
import { createClass } from "./initializer/createClass";
import { createTeacher } from "./initializer/createTeacher";
import { createRoom } from "./initializer/createRoom";
import { createStudentFromList } from "./initializer/createStudent";

// import { getFrontPageHtml } from "./util/getFrontPageHtml";
import { scrapeScheduleItemListFactory } from "./util/scrapeScheduleItemList";
import { scrapeAndDoMagicWithLessonsFromParticipants } from "./util/scrapeAndDoMagicWithLessonsFromParticipants";
import { createPageVersionIdentifier } from "./util/createPageVersionIdentifier";

export const scrape = async (config: IScraperConfig): Promise<void> => {
	try {
		const startTime: Date = new Date();

		console.log("\n==> scraper\n");
		console.table(config);

		/**
		 * @NOTE the order matters (in the last step when we save to the database)
		 */
		const participantCollectors: OrderedCollectorsOfParticipants = [
			{
				from: "Klasės",
				to: "Mokytojai",
				labels: ["class", "student"],
				initializer: createClass,
			},
			{
				from: "Moksleiviai",
				to: undefined,
				labels: ["student"],
				initializer: createStudentFromList,
			},
			{
				from: "Mokytojai",
				to: "Kabinetai",
				labels: ["teacher"],
				initializer: createTeacher,
			},
			{
				from: "Kabinetai",
				to: "Moksleiviai",
				labels: ["room"],
				initializer: createRoom,
			},
		];

		const frontPageHtml: string = await fs.readFile("./frontpage.html", "utf8"); // getFrontPageHtml();

		/** TODO typescript should do this \/ automatically */
		// let participants2D: OrderedParticipants2D = participantCollectors.map((collector) =>
		let participants2D: Participant[][] = participantCollectors.map((collector) =>
			scrapeScheduleItemListFactory(
				collector.from,
				collector.to,
				collector.labels,
				collector.initializer
			)(frontPageHtml)
		);

		/**
		 * `[ [a, b], [c, d] ]` => `[ a, b, c, d ]`
		 */
		let participants: Participant[] = participants2D.flat();

		if (process.env.FAST) {
			/** TODO document */
			const limit: number = Number(process.env.LIMIT) || 10;
			participants2D = participants2D.map((p) => p.slice(0, limit));
			participants = participants.slice(0, limit);
		}

		const lessons: Lesson[] = await scrapeAndDoMagicWithLessonsFromParticipants(participants);

		/**
		 * done! Now just save to the database, log info etc.
		 */

		const endTime: Date = new Date();

		const scrapeInfo: ScrapeInfo = {
			timeStartISO: startTime.toISOString(),
			timeEndISO: endTime.toISOString(),
			timeElapsedInSeconds: timeElapsedMs(startTime, endTime) / 1000,
			pageVersionIdentifier: createPageVersionIdentifier(frontPageHtml),
		};

		/** type-safe saving of participants of different types into the database */
		const getIdx = (type: ParticipantLabel): number =>
			participantCollectors.findIndex((collector) => collector.labels[0] === type);

		const getParticipants = (type: ParticipantLabel): Participant[] => participants2D[getIdx(type)];

		/** create a new database state */
		const newDbState: Omit<DbSchema, "Changes"> = {
			scrapeInfo,
			participants,
			lessons,
			/**
			 * BEGIN TODO DEPRECATE
			 *
			 * `participants` replaces all of these,
			 * we just need to migrate our API etc.,
			 * which we'll do later
			 */
			classes: getParticipants("class") as Class[],
			students: getParticipants("student") as StudentFromList[],
			teachers: getParticipants("teacher") as Teacher[],
			rooms: getParticipants("room") as Room[],
			/** END TODO DEPRECATE */
		};

		await setDbStateAndBackupCurrentOne(newDbState);

		console.log("\n -> scraper finished \n\n");
		console.table(scrapeInfo);
		return;
	} catch (err) {
		console.error("\nError! \n==> `@turbo-schedule/scraper`\n -> function `scrape`");
		throw new Error(err);
	}
};
