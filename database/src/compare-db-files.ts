import path from "path";
import { execSync } from "child_process";

import { expose } from "threads/worker";

import { DbSchema } from "./config";

import { DataChangedRet, detectIfDataChanged, padFor, basenameExtless } from "./detect-data-changed";
import { readRawDb } from "./read-raw-db";

export type CompareDBFiles = typeof compareDBFiles;

export type CompareDBFilesOpts = {
	filepaths: string[];
	dataDiffDir: string;
	threadId?: number | string;
};

expose(async (opts: CompareDBFilesOpts) => compareDBFiles(opts));
export function compareDBFiles({
	filepaths,
	dataDiffDir, //
	threadId = 0,
}: CompareDBFilesOpts): string[] {
	const log = (...msgs: any[]): void => console.log(threadId, ...msgs);

	const fileStrLen: number = filepaths.length.toString().length;

	const readDb = (k: number): DbSchema | null =>
		readRawDb(filepaths[k], ({ filepath }) => log(`empty db file: ${filepath}`));

	let icurr: number = 0;
	let inext: number = 1;
	const meaningfulFilesThatChangedFromPrev: string[] = [];
	const dbcache: Map<number, DbSchema> = new Map();

	for (let i = 0; i < filepaths.length - 1; i++) {
		/** only set curr to next, if next was available. otherwise, stick to the existing `curr` */
		if (dbcache.has(inext)) {
			dbcache.delete(icurr);
			icurr = inext;
		}
		inext = i + 1;

		log(`comparing ${icurr} ${inext}`);

		if (!dbcache.has(icurr)) {
			const maybeDb = readDb(icurr);
			if (!maybeDb) continue;
			dbcache.set(icurr, maybeDb);
		}

		if (!dbcache.has(inext)) {
			const maybeDb = readDb(inext);
			if (!maybeDb) continue;
			dbcache.set(inext, maybeDb);
		}

		const db1 = dbcache.get(icurr)!;
		const db2 = dbcache.get(inext)!;
		const changed: DataChangedRet = detectIfDataChanged(db1, db2);
		if (changed.changed) {
			const fp1 = filepaths[icurr];
			const fp2 = filepaths[inext];

			meaningfulFilesThatChangedFromPrev.push(fp2);

			const info = [
				padFor(meaningfulFilesThatChangedFromPrev.length, fileStrLen),
				meaningfulFilesThatChangedFromPrev.length,
				padFor(icurr, fileStrLen),
				icurr,
				padFor(inext, fileStrLen),
				inext,
				"changed",
				path.basename(fp1),
				path.basename(fp2),
				changed.reason,
			];
			log(...info);

			const patchfile = `${basenameExtless(fp1)}...${basenameExtless(fp2)}.diff`;
			const patchpath = path.join(dataDiffDir, patchfile);
			/** https://github.com/andreyvit/json-diff */
			const cmd = `json-diff --raw-json --max-elisions 0 "${fp1}" "${fp2}" > "${patchpath}"`;
			try {
				execSync(cmd);
			} catch (e) {
				if ((e as any).status === 1) {
					// expected to exit 1 since has diff
				} else {
					log(`caught error from json-diff, exit code != 1, throwing.`, e);
					throw e;
				}
			}
		}
	}

	log("done.", meaningfulFilesThatChangedFromPrev.length, "changed.");

	return meaningfulFilesThatChangedFromPrev;
}
