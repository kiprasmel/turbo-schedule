import {
	Class,
	Lesson,
	StudentFromList,
	/** , Change */
	ScrapeInfo,
	getDefaultScrapeInfo,
	Teacher,
	Room,
	Participant,
} from "@turbo-schedule/common";

import low from "lowdb";
import path from "path";

export const defaultDatabaseDataDirPath: string =
	!!process && process.env.NODE_ENV === "test"
		? path.join(__dirname, "..", "data.test") // "database/data.test/"
		: path.join(__dirname, "..", "data"); // "database/data/"

export const databaseFileName: string = "latest.json";

export const getDatabaseFilepath = (snapshot: string = databaseFileName): string =>
	path.join(defaultDatabaseDataDirPath, snapshot);

export interface DbSchema {
	participants: Participant[];
	classes: Class[];
	students: StudentFromList[];
	teachers: Teacher[];
	rooms: Room[];
	lessons: Lesson[];
	/** changes: Change[]; */
	scrapeInfo: ScrapeInfo;

	/** defaults to `false` */
	isDataFake?: boolean;
}

export const defaultDbState: DbSchema = {
	participants: [],
	classes: [], //
	students: [],
	teachers: [],
	rooms: [],
	lessons: [],
	/** , changes: [] */
	scrapeInfo: getDefaultScrapeInfo(),
	isDataFake: false,
};

export type Db = low.LowdbAsync<DbSchema>;
