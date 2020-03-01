import { Lesson, StudentFromList } from "@turbo-schedule/common";

import low, { AdapterAsync } from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";
import lodashId from "lodash-id";

export const databaseFile: string = process.env.NODE_ENV === "test" ? "database.test.json" : "database.json";

export interface DbSchema {
	students: StudentFromList[];
	lessons: Lesson[];
}

export const defaultDbState: DbSchema = { students: [], lessons: [] };

export type Db = low.LowdbAsync<DbSchema>;

const initDb = async (storageFile: string = databaseFile): Promise<Db> => {
	const adapter: AdapterAsync<DbSchema> = new FileAsync<DbSchema>(storageFile);
	const db: Db = await low(adapter);

	/**
	 * `lodash-id` makes it easy to manipulate id-based resources with lodash or lowdb
	 * https://github.com/typicode/lowdb#how-to-use-id-based-resources
	 */
	db._.mixin(lodashId);

	db.defaults(defaultDbState);

	return db;
};

export { initDb };
