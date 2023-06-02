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

	if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
		if (!fs.pathExistsSync(databaseFilepath)) {
			console.log("~creating fake data");
			createFakeData();
		}
	}

	await fs.ensureFile(databaseFilepath);

	const adapter: AdapterAsync<DbSchema> = new FileAsync<DbSchema>(databaseFilepath);
	const database: Db = await low(adapter);

	database.defaults(defaultDbState);

	return database;
};
