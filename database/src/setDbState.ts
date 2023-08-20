/* eslint-disable no-plusplus */

import fs from "fs-extra";
import path from "path";

import { DbSchema, Db, defaultDbState, getDatabaseFilepath, databaseFileName } from "./config";
import { initDb } from "./initDb";

/** TODO get rid of this & have it here */
// eslint-disable-next-line import/no-cycle
import { DbStateReturn } from "./setNewDbState";
import { iso2file } from "./iso2file";

const debug = require("debug")("turbo-schedule:database:setDbState");

/**
 * A sane version of `db.setState()`
 */
export async function setDbState(
	newState: Partial<DbSchema> = {},
	snapshotFile: string = databaseFileName
): Promise<DbStateReturn> {
	const fullNewState: DbSchema = { ...defaultDbState, ...newState };

	const db: Db = await initDb(snapshotFile);

	await db.setState(fullNewState).write();

	const databaseFilePath: string = getDatabaseFilepath(snapshotFile);

	return {
		db,
		state: fullNewState,
		databaseFilePath,
		databaseDirPath: path.parse(databaseFilePath).dir,
	};
}

/**
 * backs up the current database file into a filename
 * that's name composed of the state's `timeStartISO`
 */
export async function backupDbState(currentDatabaseFilePath: string = getDatabaseFilepath()): Promise<void> {
	const currentFileExists: boolean = await fs.pathExists(currentDatabaseFilePath);
	debug("backupDbState: currentFileExists =", currentFileExists, "; file =", currentDatabaseFilePath);

	if (!currentFileExists) {
		const msg = `an explicit backup of the database state was requested, but path of current database file was non-existing. path = ${currentDatabaseFilePath}`
		console.warn(msg)
		return;
	}

	const db: Db = await initDb();

	const { dir } = path.parse(currentDatabaseFilePath);

	const filenameExt: string = "json";
	const { timeStartISO } = await db.get("scrapeInfo").value() || new Date();
	const filename = iso2file(timeStartISO + "." + filenameExt);

	let backupDestinationPath: string = path.join(dir, filename);

	/**
	 * it's possible that a collision could happen (the backup file with the same name already exists),
	 * and thus we handle this situation
	 */
	if (await fs.pathExists(backupDestinationPath)) {
		/** cut `.json` */
		backupDestinationPath = backupDestinationPath.slice(0, -1 - filenameExt.length);

		let numberOfTries = 0;
		backupDestinationPath += `.${numberOfTries}`;

		do {
			/** remove the `.XYZ` */
			backupDestinationPath = backupDestinationPath.slice(0, -1 - numberOfTries.toString().length);

			/** append `.(XYZ + 1) */
			numberOfTries++;
			backupDestinationPath += `.${numberOfTries}`;

			/** & repeat until we finally get a unique filename */
		} while (await fs.pathExists(backupDestinationPath));

		/** bring back the `.json` */
		backupDestinationPath += `.${filenameExt}`;
	}

	debug("backupDbState: backupDestinationPath = ", backupDestinationPath);

	await fs.copyFile(currentDatabaseFilePath, backupDestinationPath);
}

/**
 * backs up the current state / file, and then overrides the current state
 * (without affecting the backup)
 */
export async function setDbStateAndBackupCurrentOne(
	newState: Partial<DbSchema> = {},
	currentDatabaseFileName: string = databaseFileName
): Promise<DbStateReturn> {
	/** make a backup to a different file */
	const fullDbFilePath = getDatabaseFilepath(currentDatabaseFileName)
	await backupDbState(fullDbFilePath);

	/** override the state in the current file */
	const result: DbStateReturn = await setDbState(newState, currentDatabaseFileName);

	return result;
}
