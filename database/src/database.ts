import { Lesson, StudentFromList } from "@turbo-schedule/common";

import low, { AdapterAsync } from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

export interface DbSchema {
	students: StudentFromList[];
	lessons: Lesson[];
}

export const defaultDbState: DbSchema = { students: [], lessons: [] };

export type Db = low.LowdbAsync<DbSchema>;

const initDb = async (
	storageFile: string = process.env.NODE_ENV === "test" ? "database.test.json" : "database.json"
): Promise<Db> => {
	const adapter: AdapterAsync<DbSchema> = new FileAsync<DbSchema>(storageFile);
	const db: Db = await low(adapter);

	db.defaults(defaultDbState);

	return db;
};

export { initDb };
