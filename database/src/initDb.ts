import fs from "fs-extra";
import low, { AdapterAsync } from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

import { getDatabaseFilepath, databaseFileName, Db, DbSchema, defaultDbState } from "./config";
// eslint-disable-next-line import/no-cycle
import { createFakeData } from "./script/module/createFakeData";

const debug = require("debug")("turbo-schedule:database:initDb");

export const initDb = async (snapshot: string = databaseFileName): Promise<Db> => {
	const databaseFilepath: string = getDatabaseFilepath(snapshot);
	debug("Initializing database. `storageFile` = ", databaseFilepath);

	if (!(await hasAnyDb(snapshot))) {
		console.log("~creating fake data temporarily until next scrape");
		await createFakeData({ snapshot });
	}

	const adapter: AdapterAsync<DbSchema> = new FileAsync<DbSchema>(databaseFilepath);
	const database: Db = await low(adapter);

	database.defaults(defaultDbState);

	return database;
};

export const hasAnyDb = async (snapshot: string = databaseFileName): Promise<boolean> => {
	const filepath: string = getDatabaseFilepath(snapshot);

	if (!(await fs.pathExists(filepath))) return false;

	const content: string = await fs.readFile(filepath, { encoding: "utf-8" }).then(x => x.trim())
	if (!content || content[0] !== "{") return false

	return true
}
