/* eslint-disable no-plusplus */

import fs from "fs-extra";
import path from "path";

import { DbSchema, Db, defaultDbState, databaseFile } from "./config";
import { initDb } from "./initDb";

/** TODO get rid of this & have it here */
// eslint-disable-next-line import/no-cycle
import { DbStateReturn } from "./setNewDbState";

const debug = require("debug")("turbo-schedule:database:setDbState");

/**
 * A sane version of `db.setState()`
 */
export async function setDbState(
	newState: Partial<DbSchema> = {},
	databaseFilePath: string = databaseFile
): Promise<DbStateReturn> {
	const fullNewState: DbSchema = { ...defaultDbState, ...newState };

	const db: Db = await initDb(databaseFilePath);

	await db.setState(fullNewState).write();

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
export async function backupDbState(currentDatabaseFilePath: string = databaseFile): Promise<void> {
	const currentFileExists: boolean = await fs.pathExists(currentDatabaseFilePath);
	debug("backupDbState: currentFileExists =", currentFileExists);

	if (!currentFileExists) {
		return;
	}

	const db: Db = await initDb();

	const filenameExt: string = "json";

	let backupDestinationPath: string = path.join(
		path.parse(currentDatabaseFilePath).dir,
		`${
			((await db.get("scrapeInfo").value()?.timeStartISO) || new Date().toISOString()).replace(
				/:/g,
				"_"
			) /** replace invalid chars (see https://stackoverflow.com/a/45403355/9285308) */
		}.${filenameExt}`
	);

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
	currentDatabaseFilePath: string = databaseFile
): Promise<DbStateReturn> {
	/** make a backup to a different file */
	await backupDbState(currentDatabaseFilePath);

	/** override the state in the current file */
	const result: DbStateReturn = await setDbState(newState, currentDatabaseFilePath);

	return result;
}
