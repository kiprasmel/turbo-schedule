/**
 *
 * sidenote:
 * jest, i fucking hate you
 *
 */

/* eslint-disable @typescript-eslint/no-use-before-define */

import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { defaultDatabaseDataDirPath, databaseFile, DbSchema, defaultDbState, Db } from "./config";
import { initDb } from "./initDb";

const debug = require("debug")("turbo-schedule:database:setNewDbState");

export interface DbStateReturn {
	state: DbSchema;
	dbStorageDirPath: string;
	dbStorageFilePath: string;
	db: Db;
}

export async function overrideDbState(
	newDbState: Partial<DbSchema> = {},
	dbStorageFilePath: string = databaseFile
): Promise<DbStateReturn> {
	return setNewDbState(newDbState, { databaseFilePath: dbStorageFilePath });
}

export interface NewStateOpts {
	databaseFilePath: string;
	shouldUseCurrentDatabaseFile: boolean;
	shouldHashDataDirPath: boolean;
}

export const defaultNewStateOpts: NewStateOpts = {
	databaseFilePath: databaseFile,
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
	debug("databaseFile", databaseFile);

	const db: Db = await initDb(databaseFile); /** TODO `databaseFile` */
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
		dbStorageDirPath: path.parse(dbStorageFilePath).dir,
		dbStorageFilePath,
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
	newFileName: string = `${new Date().toISOString()}.json`,
	newFilePath: string = path.join(
		path.resolve(defaultDatabaseDataDirPath) /** make sure no trailing slashes etc. for safe concatenation */ +
			uniqueDataDirHash,
		newFileName
	)
): string {
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
	/**
	 * `databaseDataDirPath` will differ from the `defaultDatabaseDataDirPath`
	 * if the `uniqueHash` is not an empty string
	 */
	const databaseDataDirPath: string = path.parse(newFilePath).dir;
	fs.ensureDirSync(databaseDataDirPath);

	if (shouldPutTheNewDatabaseFileToAction) {
		fs.createFileSync(newFilePath);

		try {
			fs.unlinkSync(databaseFile);
			fs.removeSync(databaseFile);
		} catch (err) {
			/** ignore - the symlink just didn't exist previously */
		}

		fs.symlinkSync(newFilePath, databaseFile);
	}

	return newFilePath;
}
