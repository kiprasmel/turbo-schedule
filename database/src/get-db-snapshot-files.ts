import fs from "fs";
import path from "path";

import { defaultDatabaseDataDirPath } from "./config";

/**
 * TODO filter out if valid data.
 * to not give some other .json file..
 */
export function getDatabaseSnapshotFiles(datadir: string = defaultDatabaseDataDirPath): string[] {
	const entries = fs.readdirSync(datadir).map((x) => path.join(datadir, x));
	const filepaths: string[] = entries.filter((x) => x.endsWith(".json") && fs.statSync(x).isFile());

	return filepaths;
}
