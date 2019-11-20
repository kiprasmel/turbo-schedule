import fs, { pathExists } from "fs-extra";

import { getHtml } from "./getHtml";
import { fileIsAlreadySaved, getSavedFile, saveFile } from "./htmlSaving";
import { getYYYYMMDD } from "@turbo-schedule/common";

/** TODO config */
const baseHtmlSaveFolder: string = "saved-content";

/** necessary */
const today: string = getYYYYMMDD();

/** relative to file or from where the script was ran */
// const savingPath: string = "../" + baseHtmlSaveFolder + "/" + today;
const savingPath: string = baseHtmlSaveFolder + "/" + today;

const savingFilename: string = "students-list.html";

const savingPathAndFile: string = savingPath + "/" + savingFilename;

/** the thing that's actually used by the utility functions */

export const getStudentsListHtml = async (baseUrl: string): Promise<string> => {
	try {
		console.log("\n==> getStudentsListHtml:");

		let todaysHtml: string;

		if (fileIsAlreadySaved(savingPathAndFile)) {
			console.log(" -> html IS saved, taking it from saved file");
			todaysHtml = getSavedFile(savingPathAndFile);
		} else {
			console.log(" -> html IS NOT saved, getting it from url");
			todaysHtml = await getHtml(baseUrl);
			saveFile(todaysHtml, savingPath, savingFilename);
		}

		return todaysHtml;
	} catch (err) {
		console.error(err);
		return Promise.reject(new Error(err));
	}
};

/** TODO - only remake the symlink if the "latest" directory changed */
export const updateLatestDir = async (): Promise<void> => {
	/**
	 *  TODO WARN
	 *
	 * Do this ONLY AFTER the script is finished,
	 * meaning that ALL the required files are already available!!!
	 */
	// await fs.promises.symlink(baseHtmlSaveFolder + "/" + "latest", savingPath);
	const symlinkFrom = baseHtmlSaveFolder + "/" + "latest";
	const symlinkTo = today;

	try {
		if (pathExists(symlinkFrom)) {
			await fs.unlink(symlinkFrom);
			console.log("\nUnlinked old symlink");
		}
	} catch (err) {
		console.warn("\nFailed to unlink symlink, probably didn't exist yet", err);
	}

	try {
		await fs.symlink(symlinkTo, symlinkFrom);
		console.log("\nCreated new symlink");
	} catch (err) {
		console.error("\nFailed to symlink - this is bad!", err);
	}
};
