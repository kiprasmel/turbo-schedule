/* eslint-disable no-plusplus */

import os from "os"
import fs from "fs-extra";
import path from "path";

import { noop } from "@turbo-schedule/common";

import { DbSchema, Db, defaultDbState, getDatabaseFilepath, databaseFileName } from "./config";
import { initDb } from "./initDb";

/** TODO get rid of this & have it here */
// eslint-disable-next-line import/no-cycle
import { DbStateReturn } from "./setNewDbState";
import { databaseSnapshotNameToFullFilepath } from "./paths";
import { execAsync } from "./commit-database-data-into-archive-if-changed";
import { syncEnvVarAndFile } from "./util/sync-env-var-and-file";
import { identifyMeaningfulFiles } from "./detect-data-changed";
import { getMeaningfulSnapshots } from "./get-meaningful-snapshots";

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

export type OnDestinationAlreadyExists = "do-nothing" | "create-another"
export type BackupDbStateOpts = {
	onDestinationAlreadyExists?: OnDestinationAlreadyExists
}

/**
 * backs up a database snapshot file (usually the latest one)
 * into a its own file, which will be named based on the scrapeInfo.timeStartISO.
 */
export async function backupDbStateWithEncrypt(
	snapshot: string = databaseFileName,
	{
		onDestinationAlreadyExists = "create-another"
	}: BackupDbStateOpts = {}
): Promise<string | null> {
	const snapshotFilepath: string = getDatabaseFilepath(snapshot);
	const currentFileExists: boolean = await fs.pathExists(snapshotFilepath);
	debug("backupDbState: currentFileExists =", currentFileExists, "; file =", snapshotFilepath);

	if (!currentFileExists) {
		const msg = `an explicit backup of the database state was requested, but path of current database file was non-existing. path = ${snapshotFilepath}`
		console.warn(msg)
		return null;
	}

	const db: Db = await initDb(snapshot);
	const timeStartISO: string = await db.get("scrapeInfo").value().timeStartISO || new Date().toISOString();

	let backupDestinationPath: string = databaseSnapshotNameToFullFilepath(timeStartISO)

	/**
	 * it's possible that a collision could happen (the backup file with the same name already exists),
	 * and thus we handle this situation
	 */
	if (await fs.pathExists(backupDestinationPath)) {
		if (onDestinationAlreadyExists === "do-nothing") {
			return null
		}

		let nth = 0
		const getPotentialPath = (x: string): string => x + "." + nth

		while (true) {
			++nth
			const potentialPath: string = getPotentialPath(backupDestinationPath)
			const exists: boolean = await fs.pathExists(potentialPath)
			if (!exists) {
				backupDestinationPath = potentialPath
				break
			}
		}
	}

	debug("backupDbState: backupDestinationPath = ", backupDestinationPath);

	/**
	 * encrypt & backup or don't backup at all
	 */

	const { hasVarOrFile: canEncrypt } = await syncEnvVarAndFile("ARCHIVE_ENCRYPT_KEY", ENCRYPT_KEY_FILEPATH, { mode: "600" })

	if (!canEncrypt) {
		const msg = `an explicit backup of the database state was requested, but encryption key for backup was not provided.\ntried $ARCHIVE_ENCRYPT_KEY and ${ENCRYPT_KEY_FILEPATH}`
		console.warn(msg)

		return null
	}

	await fs.copyFile(snapshotFilepath, backupDestinationPath);

	try {
		await encryptInplace(backupDestinationPath)
	} catch (err) {
		/** abort if encryption failed */

		const msg = `tried encrypting backup, but failed.`
		console.warn(msg, err)

		await fs.remove(backupDestinationPath)
		return null
	}

	return backupDestinationPath;
}

const ENCRYPT_KEY_FILEPATH = path.join(os.homedir(), ".gnupg", "turbo-schedule-archive.pub.asc")

async function encryptInplace(filepath: string) {
	const tmpfile = `${filepath}.gpg`
	await execAsync(`gpg --encrypt --yes --hidden-recipient-file ${ENCRYPT_KEY_FILEPATH} --output ${tmpfile} ${filepath}`)
	await fs.remove(filepath)
	await fs.rename(tmpfile, filepath)
}

noop(encryptCommitMeaningfulButNotYetProcessedFiles)
/**
 * in case forgot to setup encryption & now have some dangling files
 */
async function encryptCommitMeaningfulButNotYetProcessedFiles() {
	const alreadyCommittedThusEncrypted: string[] = getMeaningfulSnapshots();
	const allMeaningfulFiles: string[] = await identifyMeaningfulFiles();
	const meaningfulFilesNotYetEncrypted: string[] = allMeaningfulFiles.filter(x => !alreadyCommittedThusEncrypted.includes(x))

	for (const fp of meaningfulFilesNotYetEncrypted) {
		await encryptInplace(fp);
		await execAsync(`git add ${fp}`, { cwd: path.dirname(fp) })
	}
}

export async function setDbStateAndBackupCurrentOne(
	newState: Partial<DbSchema> = {},
	currentDatabaseFilename: string = databaseFileName,
): Promise<DbStateReturn> {
	/** make a backup to its own file, if doesn't exist already */
	await backupDbStateWithEncrypt(currentDatabaseFilename, { onDestinationAlreadyExists: "do-nothing" });

	/** override the state in the current file */
	const result: DbStateReturn = await setDbState(newState, currentDatabaseFilename);

	/**
	 * store the (now new) current database file into its own file,
	 * so that will be available immediatelly as its own file,
	 * instead of waiting for the next backup to happen.
	 *
	 * needed for e.g. `commitDatabaseDataIntoArchiveIfChanged`
	 */
	await backupDbStateWithEncrypt(currentDatabaseFilename, { onDestinationAlreadyExists: "create-another" })

	return result;
}

if (!module.parent) {
	// encryptCommitMeaningfulButNotYetProcessedFiles()
}
