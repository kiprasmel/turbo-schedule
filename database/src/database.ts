import low, { AdapterAsync } from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

import { Student, Lesson } from "@turbo-schedule/common";

export interface DbSchema {
	students: Student[];
	lessons: Lesson[];
}

const initDb = async (): Promise<low.LowdbAsync<DbSchema>> => {
	const adapter: AdapterAsync<DbSchema> = new FileAsync("database.json");
	const dbPromise = low(adapter);

	const db = await dbPromise;

	db.defaults({ students: [], lessons: [] });

	return db;
};

export { initDb };

// const students = (await db())
// 	.get("students")
// 	.value();
