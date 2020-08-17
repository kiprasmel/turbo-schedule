/**
 * This is the old implementation which is honestly more appealing
 * than the new one for sure:D
 */

/* eslint-disable @typescript-eslint/no-use-before-define */

import fs from "fs-extra";
import path from "path";

import { databaseFile, DbSchema, defaultDbState, Db, defaultDatabaseDataDirPath } from "./config";
import { initDb } from "./initDb";

/**
 * Use this instead of `db.setState(...)`
 */
export async function setNewDbStateSimple(newDbState: Partial<DbSchema> = {}): Promise<DbSchema> {
	try {
		await createNewLatestDatabaseFileSimple();

		const db: Db = await initDb();
		const fullNewDbState: DbSchema = { ...defaultDbState, ...newDbState };

		await db.setState(fullNewDbState).write();

		return fullNewDbState;
	} catch (err) {
		/** TODO */
		throw err;
	}
}

/**
 * keeps the current database file,
 * removes the symlink, pointing to it,
 * creates a new database file
 * & symlinks to it.
 */
export async function createNewLatestDatabaseFileSimple(
	newFileName: string = new Date().toISOString() + ".json",
	newFilePath: string = path.join(defaultDatabaseDataDirPath, newFileName)
): Promise<void> {
	await fs.ensureDir(newFilePath);

	try {
		await fs.unlink(databaseFile);
		await fs.remove(databaseFile);
	} catch (err) {
		/** ignore - the symlink just didn't exist previously */
	}

	await fs.createFile(newFilePath);

	await fs.symlink(newFilePath, databaseFile);
}
