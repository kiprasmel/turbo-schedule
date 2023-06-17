import path from "path";

import * as thread from "threads";

import { defaultDatabaseDataDirPath } from "./config";
import { getDatabaseSnapshotFiles } from "./get-db-snapshot-files";
// eslint-disable-next-line import/no-cycle
import { CheckIfNeedleExistsInDb /* checkIfNeedleExistsInDb */ } from "./find-needle-in-db";
import { timedJsonFileSort } from "./detect-data-changed";
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

	const filepaths: string[] = await getDatabaseSnapshotFiles({ datadir: databaseSnapshotDir, onlyMeaningful: true });

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

	snapshots.sort(timedJsonFileSort);

	return snapshots;
}
