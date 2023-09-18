import cp from "child_process";

import { defaultDatabaseDataDirPath } from "./config";

/**
 * relies on `commitDatabaseDataIntoArchiveIfChanged`,
 * i.e. meaningful snapshots should be committed into the archive git repo.
 *
 * NOTE: you must check that `canCommitMeaningfulSnapshots()` is true;
 * otherwise there'll be 0 snapshots committed.
 *
 */
export function getMeaningfulSnapshots(datadir: string = defaultDatabaseDataDirPath): string[] {
	return cp.execSync(`git ls-files | grep "\.json$"`, { cwd: datadir, encoding: "utf-8" }).split("\n");
}
