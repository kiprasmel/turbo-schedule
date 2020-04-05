import { Lesson, StudentFromList, Change } from "@turbo-schedule/common";

import low from "lowdb";
import path from "path";

export const defaultDatabaseDataDirPath: string =
	process.env.NODE_ENV === "test" ? path.join(__dirname, "..", "data.test") : path.join(__dirname, "..", "data");

export const databaseFileName: string = "latest.json";
/**
 * Always up to date - `latest.json` is a symlink to the actually latest file,
 * and we update it internally so that the end user does not have to worry about it.
 */
export const databaseFile: string = path.join(defaultDatabaseDataDirPath, databaseFileName);

export interface DbSchema {
	students: StudentFromList[];
	lessons: Lesson[];
	changes: Change[];
}

export const defaultDbState: DbSchema = { students: [], lessons: [], changes: [] };

export type Db = low.LowdbAsync<DbSchema>;