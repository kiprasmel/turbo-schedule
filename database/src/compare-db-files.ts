import path from "path";
import { exec } from "child_process";

import fs from "fs-extra";
import { expose } from "threads/worker";

import { DbSchema } from "./config";

// eslint-disable-next-line import/no-cycle
import { DataChangedRet, detectIfDataChanged, padFor, basenameExtless } from "./detect-data-changed";

expose(compareDBFiles);
export async function compareDBFiles(filepaths: string[], dataDiffDir: string): Promise<void> {
	const rawFileContentPromises = filepaths.map(async (fp) => {
		const raw: string = await fs.readFile(fp, { encoding: "utf-8" });

		const isEmpty = !raw.trim();
		if (isEmpty) {
			console.warn(`empty file: ${fp}`);
		}

		return [isEmpty, raw] as const;
	});
	const rawFileContents = await Promise.all(rawFileContentPromises);
	const fileContents: DbSchema[] = rawFileContents
		.filter(([isEmpty]) => !isEmpty)
		.map(([, raw]): DbSchema => JSON.parse(raw));

	const fileStrLen: number = filepaths.length.toString().length;
	let n_changed: number = 0;
	for (let i = 0; i < filepaths.length - 1; i++) {
		const fp1 = filepaths[i];
		const fp2 = filepaths[i + 1];

		const db1: DbSchema = fileContents[i];
		const db2: DbSchema = fileContents[i + 1];

		const changed: DataChangedRet = detectIfDataChanged(db1, db2);
		if (changed.changed) {
			++n_changed;

			const info = [
				padFor(n_changed, fileStrLen),
				n_changed,
				padFor(i, fileStrLen),
				i,
				"changed",
				path.basename(fp1),
				path.basename(fp2),
				changed.reason,
			];
			console.log(...info);

			const patchfile = `${basenameExtless(fp1)}...${basenameExtless(fp2)}.diff`;
			const patchpath = path.join(dataDiffDir, patchfile);
			/**
			 * https://github.com/andreyvit/json-diff
			 */
			const cmd = `json-diff "${fp1}" "${fp1}" > "${patchpath}"`;
			console.log(cmd);
			try {
				await exec(cmd);
			} catch (e) {
				// expected to exit 1
			}
		}
	}
}
