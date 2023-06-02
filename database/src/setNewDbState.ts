/**
 *
 * sidenote:
 * jest, i fucking hate you
 *
 * TODO - get the absolute rid of this ASAP!!! Use `setDbState` instead 🚀
 *
 */

/* eslint-disable @typescript-eslint/no-use-before-define */

import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { defaultDatabaseDataDirPath, getDatabaseFilepath, DbSchema, defaultDbState, Db } from "./config";
import { initDb } from "./initDb";

const debug = require("debug")("turbo-schedule:database:setNewDbState");

export interface DbStateReturn {
	db: Db;
	state: DbSchema;
	databaseFilePath: string;
	databaseDirPath: string;
}

export async function overrideDbState(
	newDbState: Partial<DbSchema> = {},
	dbStorageFilePath: string = getDatabaseFilepath()
): Promise<DbStateReturn> {
	return setNewDbState(newDbState, { databaseFilePath: dbStorageFilePath });
}

export interface NewStateOpts {
	databaseFilePath: string;
	shouldUseCurrentDatabaseFile: boolean;
	shouldHashDataDirPath: boolean;
}

export const defaultNewStateOpts: NewStateOpts = {
	databaseFilePath: getDatabaseFilepath(),
	shouldUseCurrentDatabaseFile: false /** create a new one & backup the current by default. Disable this if there isn't anything new and you just want to use the already existing file, for example once starting the server. */,
	shouldHashDataDirPath: false,
};

/**
 * Use this instead of `db.setState(...)`
 *
 * By using `createNewLatestDatabaseFileSync`,
 * we will NOT overwrite the previous state
 * and will instead create a new file for the new state,
 * making the current file a backup.
 *
 * If you want to overwrite it - instead of creating a new file,
 * use the same one.
 */
export async function setNewDbState(
	newDbState: Partial<DbSchema> = {},
	newStateOptsRef: Partial<NewStateOpts> = {}
): Promise<DbStateReturn> {
	debug("newDbState", newDbState, "newStateOpts", newStateOptsRef);

	const newStateOpts: NewStateOpts = { ...defaultNewStateOpts, ...newStateOptsRef };

	let dbStorageFilePath: string;
	let options: NewStateOpts;

	if (typeof newStateOpts === "string") {
		dbStorageFilePath = newStateOpts;
		options = defaultNewStateOpts;
	} else {
		options = {
			...defaultNewStateOpts,
			...newStateOpts,
		};

		dbStorageFilePath = createNewDatabaseFilePathSync(
			!options.shouldUseCurrentDatabaseFile,
			!options.shouldHashDataDirPath ? undefined : uuidv4()
		);
	}

	// await fs.ensureDir(dbStorageFilePath);

	debug("dbStorageFilePath", dbStorageFilePath);
	debug("databaseFile", getDatabaseFilepath);

	const db: Db = await initDb(newStateOptsRef.databaseFilePath);
	const fullNewDbState: DbSchema = { ...defaultDbState, ...newDbState };

	/**
	 * if we have backed up, we can set the new state;
	 * otherwise - keep it as-is.
	 */
	if (!options.shouldUseCurrentDatabaseFile) {
		await db.setState(fullNewDbState).write();
	}

	return {
		state: fullNewDbState,
		databaseDirPath: path.parse(dbStorageFilePath).dir,
		databaseFilePath: dbStorageFilePath,
		db,
	};
}

/**
 * keeps the current database file,
 * removes the symlink, pointing to it,
 * creates a new database file
 * & symlinks to it.
 *
 * @returns `newFilePath`
 */
export function createNewDatabaseFilePathSync(
	shouldPutTheNewDatabaseFileToAction: boolean,
	uniqueDataDirHash: string = "",
	newFileNameRef: string = `${new Date().toISOString()}.json`.replace(
		/:/g,
		"_"
	) /** replace invalid chars (see https://stackoverflow.com/a/45403355/9285308) */,
	newFilePath: string = path.join(
		path.resolve(defaultDatabaseDataDirPath) /** make sure no trailing slashes etc. for safe concatenation */ +
			uniqueDataDirHash,
		newFileNameRef
	)
): string {
	/** replace the invalid chars here too in case some args were provided & others weren't. */
	const newFileName: string = newFileNameRef.replace(/:/g, "_");

	debug(
		"shouldPutTheNewDatabaseFileToAction",
		shouldPutTheNewDatabaseFileToAction,
		"uniqueDataDirHash",
		uniqueDataDirHash,
		"newFileName",
		newFileName,
		"newFilePath",
		newFilePath
	);

	fs.ensureFileSync(newFilePath);

	if (shouldPutTheNewDatabaseFileToAction) {
		try {
			fs.unlinkSync(getDatabaseFilepath());
			fs.removeSync(getDatabaseFilepath());
		} catch (err) {
			/** ignore - the symlink just didn't exist previously */
		}

		fs.symlinkSync(newFilePath, getDatabaseFilepath());
	}

	return newFilePath;
}
