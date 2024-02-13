#!/usr/bin/env ts-node-dev

import fs from "fs";
import path from "path";

import { defaultDatabaseDataDirPath, getDatabaseFilepath } from "./config";
import { getMeaningfulSnapshots } from "./get-meaningful-snapshots";
import { canCommitMeaningfulSnapshots } from "./commit-database-data-into-archive-if-changed";
import { lastPath2dateSort } from "./detect-data-changed";
import { readRawDb } from "./read-raw-db";
import { DB_FILE_EXT } from "./paths";
import { initDb } from "./initDb";

export type GetDatabaseSnapshotFilesOpts = {
	datadir?: string;
	onlyMeaningful: boolean;

	/** by default, ignores files with fake data. */
	ignoreFilesWithFakeData?: boolean;

	/** by default, returns full paths. */
	filenamesInsteadOfPaths?: boolean;

	/**
	 * by default, files are read in-order, so archives would come oldest-first.
	 *
	 * however, in the UI, it's usually more convenient to see more recent archives first,
	 * thus by default we reverse the order & return the more recent archives first.
	 */
	moreRecentArchivesFirst?: boolean;
}

export async function getDatabaseSnapshotFiles({
	datadir = defaultDatabaseDataDirPath,
	onlyMeaningful,
	ignoreFilesWithFakeData = true,
	filenamesInsteadOfPaths = false,
	moreRecentArchivesFirst = true,
}: GetDatabaseSnapshotFilesOpts): Promise<string[]> {
	let filenames: string[] = fs.readdirSync(datadir).filter((x) => x.endsWith(DB_FILE_EXT));

	if (ignoreFilesWithFakeData) {
		filenames = (
			await Promise.all(
				filenames.map(async f => {
					const isFake: boolean = (await initDb(path.join(datadir, f))).get("isDataFake").value()
					return [isFake, f]
				})
			)
		)
		.filter(([isFake]) => !isFake)
		.map(([_, f]) => f) as string[]
	}

	if (moreRecentArchivesFirst) {
		filenames.sort(lastPath2dateSort);
	}

	if (onlyMeaningful) {
		const { hasEitherVarOrFile: canCommit } = await canCommitMeaningfulSnapshots();
		if (canCommit) {
			const allMeaningfulSnapshots: string[] = getMeaningfulSnapshots(datadir);
			filenames = filenames.filter(file => allMeaningfulSnapshots.includes(file));
		} else {
			const msg = `WARN: only meaningful snapshots were requested, but within current environment, meaningful snapshots CANNOT be committed.\n`;
			console.warn(msg);
		}
	}

	return filenamesInsteadOfPaths
		? filenames
		: filenames.map(x => path.join(datadir, x));
}

export function snapshotExistsInArchive(snapshot: string): boolean {
	const snapshotPath: string = getDatabaseFilepath(snapshot);

	const exists: boolean = fs.existsSync(snapshotPath);
	return exists;
}

if (!module.parent) {
	getDatabaseSnapshotFiles({ onlyMeaningful: true }).then(meaningfulSnaps => {
		for (const snap of meaningfulSnaps) {
			const isDataFake = readRawDb(snap)?.isDataFake
			const out = "\n" + snap + " " + isDataFake;
			process.stdout.write(out);
		}

		process.stdout.write("\n\n");
	});
}
