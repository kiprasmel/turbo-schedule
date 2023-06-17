import fs from "fs";
import path from "path";

import { defaultDatabaseDataDirPath, getDatabaseFilepath } from "./config";
import { getMeaningfulSnapshots } from "./get-meaningful-snapshots";
import { canCommitMeaningfulSnapshots } from "./commit-database-data-into-archive-if-changed";

export type GetDatabaseSnapshotFilesOpts = {
	datadir?: string;
	onlyMeaningful: boolean;
}

export async function getDatabaseSnapshotFiles({
	datadir = defaultDatabaseDataDirPath,
	onlyMeaningful
}: GetDatabaseSnapshotFilesOpts): Promise<string[]> {
	const entries = fs.readdirSync(datadir).map((x) => path.join(datadir, x));
	const filepaths: string[] = entries.filter((x) => x.endsWith(".json"));

	if (onlyMeaningful) {
		const { canCommit } = await canCommitMeaningfulSnapshots();
		if (canCommit) {
			const allMeaningfulSnapshots: string[] = getMeaningfulSnapshots();
			const filepathsThatMatchedMeaningful: string[] = filepaths.filter(fp => allMeaningfulSnapshots.includes(path.basename(fp)));

			return filepathsThatMatchedMeaningful;
		} else {
			const msg = `WARN: only meaningful snapshots were requested, but within current environment, meaningful snapshots CANNOT be committed.\n`;
			console.warn(msg);

			return filepaths;
		}
	}

	return filepaths;
}

export function snapshotExistsInArchive(snapshot: string): boolean {
	const snapshotPath: string = getDatabaseFilepath(snapshot);

	const exists: boolean = fs.existsSync(snapshotPath);
	return exists;
}
