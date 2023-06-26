import fs from "fs";
import path from "path";

import { defaultDatabaseDataDirPath, getDatabaseFilepath } from "./config";
import { getMeaningfulSnapshots } from "./get-meaningful-snapshots";
import { canCommitMeaningfulSnapshots } from "./commit-database-data-into-archive-if-changed";
import { lastPath2dateSort } from "./detect-data-changed";

export type GetDatabaseSnapshotFilesOpts = {
	datadir?: string;
	onlyMeaningful: boolean;

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

/**
 * to ensure that we indeed wrap the return
 */
type WrappedReturn = { __wrapped_return: never };
type GetDatabaseSnapshotFilesRet = (string & WrappedReturn)[]

export async function getDatabaseSnapshotFiles({
	datadir = defaultDatabaseDataDirPath,
	onlyMeaningful,
	filenamesInsteadOfPaths = false,
	moreRecentArchivesFirst = true,
}: GetDatabaseSnapshotFilesOpts): Promise<GetDatabaseSnapshotFilesRet> {
	const filenames: string[] = fs.readdirSync(datadir).filter((x) => x.endsWith(".json"));

	if (moreRecentArchivesFirst) {
		filenames.sort(lastPath2dateSort);
	}

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
