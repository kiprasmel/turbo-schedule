import fs from "fs-extra";
import low, { AdapterAsync } from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

import { databaseFile, Db, DbSchema, defaultDbState } from "./config";
// eslint-disable-next-line import/no-cycle
import { createFakeData } from "./script/module/createFakeData";

const debug = require("debug")("turbo-schedule:database:initDb");

export const initDb = async (storageFile: string = databaseFile): Promise<Db> => {
	debug("Initializing database. `storageFile` = ", storageFile);

	if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
		if (!fs.pathExistsSync(storageFile)) {
			console.log("~creating fake data");
			createFakeData();
		}
	}

	await fs.ensureFile(storageFile);

	const adapter: AdapterAsync<DbSchema> = new FileAsync<DbSchema>(storageFile);
	const database: Db = await low(adapter);

	database.defaults(defaultDbState);

	return database;
};
