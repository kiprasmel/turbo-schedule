import fs from "fs";
import path from "path";

import { defaultDatabaseDataDirPath, getDatabaseFilepath } from "./config";
import { getMeaningfulSnapshots } from "./get-meaningful-snapshots";
import { canCommitMeaningfulSnapshots } from "./commit-database-data-into-archive-if-changed";

export type GetDatabaseSnapshotFilesOpts = {
	datadir?: string;
	onlyMeaningful: boolean;

	/** by default, returns full paths. */
	filenamesInsteadOfPaths?: boolean;
}

/**
 * to ensure that we indeed wrap the return
 */
type WrappedReturn = { __wrapped_return: never };
type GetDatabaseSnapshotFilesRet = (string & WrappedReturn)[]

export async function getDatabaseSnapshotFiles({
	datadir = defaultDatabaseDataDirPath,
	onlyMeaningful,
	filenamesInsteadOfPaths = false,
}: GetDatabaseSnapshotFilesOpts): Promise<GetDatabaseSnapshotFilesRet> {
	const entries = fs.readdirSync(datadir);
	const filenames: string[] = entries.filter((x) => x.endsWith(".json"));

	const ret = (xs: string[]): GetDatabaseSnapshotFilesRet => (filenamesInsteadOfPaths ? xs : xs.map(x => path.join(datadir, x))) as GetDatabaseSnapshotFilesRet;

	if (onlyMeaningful) {
		const { canCommit } = await canCommitMeaningfulSnapshots();
		if (canCommit) {
			const allMeaningfulSnapshots: string[] = getMeaningfulSnapshots();
			const filesThatMatchedMeaningful: string[] = filenames.filter(file => allMeaningfulSnapshots.includes(file));

			return ret(filesThatMatchedMeaningful);
		} else {
			const msg = `WARN: only meaningful snapshots were requested, but within current environment, meaningful snapshots CANNOT be committed.\n`;
			console.warn(msg);

			return ret(filenames);
		}
	}

	return ret(filenames);
}

export function snapshotExistsInArchive(snapshot: string): boolean {
	const snapshotPath: string = getDatabaseFilepath(snapshot);

	const exists: boolean = fs.existsSync(snapshotPath);
	return exists;
}
