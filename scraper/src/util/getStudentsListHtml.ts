import fs, { pathExists } from "fs-extra";

import { getHtml } from "@turbo-schedule/common";

import { IScraperConfig } from "../config";

export const getStudentsListHtml = async (baseUrl: string): Promise<string> => {
	try {
		console.log("\n==> getStudentsListHtml:");

		const todaysHtml: string = await getHtml(baseUrl, "windows-1257");

		return todaysHtml;
	} catch (err) {
		const e: Error = new Error(err);

		console.error(e);
		return Promise.reject(e);
	}
};

/** TODO - only remake the symlink if the "latest" directory changed */
export const updateLatestDir = async ({
	latestScrapedDataSymlinkPath: symlinkFrom,
	latestScrapedDataDirPath: symlinkTo,
}: IScraperConfig): Promise<void> => {
	try {
		if (pathExists(symlinkFrom)) {
			await fs.unlink(symlinkFrom);
			console.log("\nUnlinked old symlink");
		}
	} catch (err) {
		/**
		 * ignore - the symlink did not exist previously
		 */
	}

	try {
		console.log(`\nCreating symlink from ${symlinkFrom} to ${symlinkTo}`);
		await fs.symlink(symlinkTo, symlinkFrom);
	} catch (err) {
		console.error("\nFailed creating symlink");
		throw new Error(err);
	}
};
