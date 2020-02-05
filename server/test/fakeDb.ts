import fs from "fs-extra";
import path from "path";
import os from "os";

import { scrapedDataDirPath } from "../src/config";

export const startFakeDbSync = (): (() => void) => {
	console.log("\nStarting fake db\n");
	const pathToDisabledDir: string = `${scrapedDataDirPath}.disabled`;

	/** `/tmp/saved-content-XYZABC/` */
	const tempPathToLatestScrapedDataDir: string = fs.mkdtempSync(path.join(os.tmpdir(), "saved-content-"));

	if (fs.pathExistsSync(scrapedDataDirPath)) {
		if (!fs.pathExistsSync(pathToDisabledDir)) {
			/** `saved-content/` -> `saved-content.disabled/` */
			fs.moveSync(scrapedDataDirPath, pathToDisabledDir);
		} else {
			const message: string = `(starting) Couldn't move \`${scrapedDataDirPath}\` to \`${pathToDisabledDir}\` - already exists`;
			console.error(message);
			throw new Error(message);
		}
	}

	/** `/tmp/saved-content-XYZABC/` <-- `saved-content/` */
	fs.symlinkSync(tempPathToLatestScrapedDataDir, scrapedDataDirPath);

	const stopFakeDbSync: () => void = () => {
		if (fs.pathExistsSync(scrapedDataDirPath)) {
			/** unlink `/tmp/saved-content-XYZABC/` <-- `saved-content/` */
			fs.unlinkSync(scrapedDataDirPath);
		}

		if (fs.pathExistsSync(tempPathToLatestScrapedDataDir)) {
			/** remove `/tmp/saved-content-XYZABC/` */
			fs.rmdirSync(tempPathToLatestScrapedDataDir, { recursive: true });
		}

		if (fs.pathExistsSync(pathToDisabledDir)) {
			if (!fs.pathExistsSync(scrapedDataDirPath)) {
				/** `saved-content.disabled/` -> `saved-content/` */
				fs.moveSync(pathToDisabledDir, scrapedDataDirPath);
			} else {
				const message: string = `(stopping) Couldn't move \`${pathToDisabledDir}\` to \`${scrapedDataDirPath}\` - already exists`;
				console.error(message);
				throw new Error(message);
			}
		}

		console.log("\nSuccessfully stopped fake db.\n");
	};

	return stopFakeDbSync;
};
