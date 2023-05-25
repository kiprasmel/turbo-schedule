#!/usr/bin/env ts-node-dev

import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";

import { DbSchema } from "./config";

export type DataChangedRet = {
	changed: boolean;
	reason: string;
};

export function detectIfDataChanged(db1: DbSchema, db2: DbSchema): DataChangedRet {
	// TODO FIXME ASSUMPTION: assume latest db schema format (see NEXT.md)
	if (!("scrapeInfo" in db1) || !("scrapeInfo" in db2)) {
		// throw new Error("database schema older than implemented yet (did not find `scrapeInfo`).\n");
		// TODO FIXME: throw error
		return {
			changed: false,
			reason: "error: db schema older than implemented",
		};
	}

	if (!db1.participants || !db2.participants) {
		// TODO
		return {
			changed: false,
			reason: "error: participants falsy",
		};
	}

	/**
	 * verify that all `participants` and all `lessons` are same.
	 * if found difference, then not the same.
	 *
	 * TODO: handle cases where we added extra data in an item,
	 * because then not a change (tho, should be overwritten as a new version..)
	 */

	if (db1.participants.length !== db2.participants.length) {
		return {
			changed: true,
			reason: "participant length mismatch" as const,
		};
	}
	if (db1.lessons.length !== db2.lessons.length) {
		return {
			changed: true,
			reason: "lesson length mismatch" as const,
		};
	}

	for (let i = 0; i < db1.participants.length; i++) {
		const fs1 = JSON.stringify(db1.participants[i]);
		const fs2 = JSON.stringify(db2.participants[i]);

		if (fs1 !== fs2) {
			return {
				changed: true,
				reason: `${i}th participants differed`,
			};
		}
	}

	for (let i = 0; i < db1.lessons.length; i++) {
		const fs1 = JSON.stringify(db1.lessons[i]);
		const fs2 = JSON.stringify(db2.lessons[i]);

		if (fs1 !== fs2) {
			return {
				changed: true,
				reason: `${i}th lessons differed`,
			};
		}
	}

	return {
		changed: false,
		reason: "" as const,
	};
}

export function basenameExtless(x: string): string {
	return path
		.basename(x)
		.split(".")
		.slice(0, -1)
		.join(".");
}

export const padFor = (x: number, maxlen: number, pad = " "): string => {
	const xlen = x.toString().length;
	if (xlen > maxlen) throw new Error(`x len > maxlen`);
	const delta = maxlen - xlen;
	const padding = pad.repeat(delta);
	return padding;
};

export async function defaultRun(): Promise<void> {
	// const datadir = path.join(__dirname, "..", "data");
	const datadir = path.join(__dirname, "..", "..", "data"); // DEBUG @ ROOT

	const entries = fs.readdirSync(datadir).map((x) => path.join(datadir, x));
	const files: string[] = entries.filter((x) => x.endsWith(".json") && fs.statSync(x).isFile());

	const dataDiffDir = "data-diffs";
	fs.ensureDirSync(dataDiffDir);

	const rawFileContentPromises = files.map(async (fp) => {
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

	console.log({ fileContents });

	const fileStrLen: number = files.length.toString().length;
	let n_changed: number = 0;
	for (let i = 0; i < files.length - 1; i++) {
		const fp1 = files[i];
		const fp2 = files[i + 1];

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
			const cmd = `json-diff "${db1}" "${db2}" > "${patchpath}"`;
			console.log(cmd);
			try {
				await exec(cmd);
			} catch (e) {
				// expected to exit 1
			}
		}
	}
}

if (!module.parent) {
	defaultRun();
}
