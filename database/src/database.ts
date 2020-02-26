import { Lesson, StudentFromList } from "@turbo-schedule/common";

import low, { AdapterAsync } from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

export interface DbSchema {
	students: StudentFromList[];
	lessons: Lesson[];
}

export type Db = low.LowdbAsync<DbSchema>;

const initDb = async (): Promise<Db> => {
	const adapter: AdapterAsync<DbSchema> = new FileAsync<DbSchema>("database.json");
	const db: Db = await low(adapter);

	const dbDefaults: DbSchema = { students: [], lessons: [] };
	db.defaults(dbDefaults);

	return db;
};

export { initDb };
