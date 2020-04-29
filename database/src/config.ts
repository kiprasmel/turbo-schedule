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
	process.env.NODE_ENV === "test"
		? path.join(__dirname, "..", "data.test") // "database/data.test/"
		: path.join(__dirname, "..", "data"); // "database/data/"

export const databaseFileName: string = "latest.json";
/**
 * Always up to date - `latest.json` is a symlink to the actually latest file,
 * and we update it internally so that the end user does not have to worry about it.
 */
export const databaseFile: string = path.join(defaultDatabaseDataDirPath, databaseFileName);

export interface DbSchema {
	participants: Participant[];
	classes: Class[];
	students: StudentFromList[];
	teachers: Teacher[];
	rooms: Room[];
	lessons: Lesson[];
	/** changes: Change[]; */
	scrapeInfo: ScrapeInfo;
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
};

export type Db = low.LowdbAsync<DbSchema>;
