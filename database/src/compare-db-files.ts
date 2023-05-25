import path from "path";
import { execSync } from "child_process";

import fs from "fs-extra";
import { expose } from "threads/worker";

import { DbSchema } from "./config";

// eslint-disable-next-line import/no-cycle
import { DataChangedRet, detectIfDataChanged, padFor, basenameExtless } from "./detect-data-changed";

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
}: CompareDBFilesOpts): void {
	const log = (...msgs: any[]): void => console.log(threadId, ...msgs);

	const fileStrLen: number = filepaths.length.toString().length;

	// let rawcurr: string = "";
	// let rawnext: string = "";
	const readDb = (k: number): DbSchema | null => {
		const raw: string = fs.readFileSync(filepaths[k], { encoding: "utf-8" }).trim();

		if (!raw) {
			log(`empty file: ${k} ${filepaths[k]}`);
			return null;
		}

		return JSON.parse(raw);
	};

	let icurr: number = 0;
	let inext: number = 1;

	// let dbcurr: DbSchema;
	// let dbnext: DbSchema;
	const dbcache: Map<number, DbSchema> = new Map(); // TODO OPTIMIZE: keep only last 2

	let n_changed: number = 0;

	for (let i = 0; i < filepaths.length - 1; i++) {
		/** only set curr to next, if next was available. otherwise, stick to the existing `curr` */
		if (dbcache.has(inext)) {
			dbcache.delete(icurr);
			icurr = inext;
		}
		inext = i + 1;

		log(`${threadId} comparing ${icurr} ${inext}`);

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

		// if (i === 0) {
		// 	const maybeNext = readDB(i);
		// 	if (!maybeNext) continue;
		// 	dbnext = maybeNext;
		// }

		// icurr = inext;
		// inext = i + 1;

		// dbcurr = dbnext!;
		// const maybeNext2 = readDB(i);
		// if (!maybeNext2) continue;
		// dbnext = maybeNext2;

		const db1 = dbcache.get(icurr)!;
		const db2 = dbcache.get(inext)!;
		log("db1 length:", JSON.stringify(db1).length, "db2 length:", JSON.stringify(db2).length);
		const changed: DataChangedRet = detectIfDataChanged(db1, db2);
		if (changed.changed) {
			++n_changed;

			const fp1 = filepaths[icurr];
			const fp2 = filepaths[inext];

			const info = [
				padFor(n_changed, fileStrLen),
				n_changed,
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
			/**
			 * https://github.com/andreyvit/json-diff
			 */
			const cmd = `json-diff -n "${fp1}" "${fp1}" > "${patchpath}"`;
			log(cmd);
			try {
				execSync(cmd);
			} catch (e) {
				log("caught error with json-diff:", e);
				// expected to exit 1
			}
		}
	}

	log("done. n_changed =", n_changed);
}
