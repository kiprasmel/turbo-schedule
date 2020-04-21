import fs from "fs-extra";
// import path from "path";
import low, { AdapterAsync } from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";

import { databaseFile, Db, DbSchema, defaultDbState } from "./config";

const debug = require("debug")("turbo-schedule:database:initDb");

export const initDb = async (storageFile: string = databaseFile): Promise<Db> => {
	debug("Initializing database. `storageFile` = ", storageFile);

	// const storageDirPath: string = path.parse(storageFile).dir;
	// await fs.ensureDir(storageDirPath);

	// if (!(await fs.pathExists(storageFile))) {
	// 	// await fs.symlink(, storageFile);
	// 	await fs.writeFile(storageFile, "{}", { encoding: "utf-8" });
	// }
	debug("ensuring file");
	try {
		await fs.ensureFile(storageFile);
	} catch (e) {
		console.error("failed ensuring file", e);
	}
	debug("ensured file");

	debug("creating adapter");
	const adapter: AdapterAsync<DbSchema> = new FileAsync<DbSchema>(storageFile);
	debug("created adapter");

	debug("creating db");
	const database: Db = await low(adapter);
	debug("created db");

	database.defaults(defaultDbState);

	return database;
};
