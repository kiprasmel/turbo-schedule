import fs from "fs-extra";
import path from "path";

import * as thread from "threads";

import { defaultDatabaseDataDirPath } from "./config";
// eslint-disable-next-line import/no-cycle
import { CheckIfNeedleExistsInDb /* checkIfNeedleExistsInDb */ } from "./find-needle-in-db";
// eslint-disable-next-line import/no-cycle
// import { splitItemsIntoNGroupsBasedOnCPUCores } from "./detect-data-changed";

/**
 * will prolly need a threadpool to go thru all db files
 * (they will all be relevant at this point),
 * to check where the lost participant exists (if anywhere).
 *
 */
export async function tryFindParticipantInArchive(
	needle: string, //
	databaseSnapshotDir: string = defaultDatabaseDataDirPath
): Promise<string[]> {
	const snapshots: string[] = [];

	const filepaths: string[] = getDatabaseSnapshotFiles(databaseSnapshotDir);

	const threadpool = thread.Pool(() =>
		thread.spawn<CheckIfNeedleExistsInDb>(new thread.Worker("./find-needle-in-db"))
	);

	for (let i = 0; i < filepaths.length; i++) {
		const filepath = filepaths[i];

		const task = threadpool.queue((checkIfNeedleExistsInDb) => checkIfNeedleExistsInDb(needle, filepath));

		task.then((hasNeedle) => {
			if (hasNeedle) {
				snapshots.push(path.basename(filepath));
			}
		});
	}

	await threadpool.completed();
	await threadpool.terminate();

	console.log({ needle, snapshots });

	return snapshots;
}

/**
 * TODO filter out if valid data.
 * to not give some other .json file..
 */
export function getDatabaseSnapshotFiles(/** TODO use */ _databaseDir: string = defaultDatabaseDataDirPath): string[] {
	// const datadir = path.join(__dirname, "..", "data");
	const datadir = path.join(__dirname, "..", "..", "data"); // DEBUG @ ROOT

	const entries = fs.readdirSync(datadir).map((x) => path.join(datadir, x));
	const files: string[] = entries.filter((x) => x.endsWith(".json") && fs.statSync(x).isFile());

	return files;
}
