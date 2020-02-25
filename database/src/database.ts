import { Student, Lesson } from "@turbo-schedule/common";

import low from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";
// import { FileAsyncComfy } from "./FileAsyncComfy";

export interface DbSchema {
	students: Student[];
	lessons: Lesson[];
}

// // const initDb = (): low.LowdbAsyncComfy<DbSchema> => {
// const adapter: FileAsyncComfy<DbSchema> = new FileAsyncComfy<DbSchema>("database.json") /** TODO FIXME */;
// // const dbPromise = low(adapter as any /* TODO FIXME */);
// // const db: low.LowdbSync<DbSchema> = (low(adapter as any /** TODO FIXME */) as unknown) as low.LowdbSync<
// // 		DbSchema
// // 	> /** TODO FIXME */;

// const db: low.LowdbAsyncComfy<DbSchema> = low(adapter);

// // db.defaults({ students: [], lessons: [] });

// // return db;
// // };

// // const db: low.LowdbAsyncComfy<DbSchema> = initDb();

const adapter = new FileAsync<DbSchema>("database.json");
const db = low(adapter);

export { db };
