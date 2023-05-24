#!/usr/bin/env ts-node-dev

import fs from "fs-extra";
import path from "path";

import { DbSchema } from "./config";

export type DataChangedRet = {
	changed: boolean;
	reason: string;
};

export function detectIfDataChanged(fp1: string, fp2: string): DataChangedRet {
	// console.log({ fp1, fp2 });
	const fr1: string = fs.readFileSync(fp1, { encoding: "utf-8" });
	const fr2: string = fs.readFileSync(fp2, { encoding: "utf-8" });

	if (!fr1.trim() || !fr2.trim()) {
		// TODO
		return {
			changed: false,
			reason: "error: empty file",
		};
	}

	const f1: DbSchema = JSON.parse(fr1);
	const f2: DbSchema = JSON.parse(fr2);

	// TODO FIXME ASSUMPTION: assume latest db schema format (see NEXT.md)
	if (!("scrapeInfo" in f1) || !("scrapeInfo" in f2)) {
		// throw new Error("database schema older than implemented yet (did not find `scrapeInfo`).\n");
		// TODO FIXME: throw error
		return {
			changed: false,
			reason: "error: db schema older than implemented",
		};
	}

	if (!f1.participants || !f2.participants) {
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

	if (f1.participants.length !== f2.participants.length) {
		return {
			changed: true,
			reason: "participant length mismatch" as const,
		};
	}
	if (f1.lessons.length !== f2.lessons.length) {
		return {
			changed: true,
			reason: "lesson length mismatch" as const,
		};
	}

	for (let i = 0; i < f1.participants.length; i++) {
		const fs1 = JSON.stringify(f1.participants[i]);
		const fs2 = JSON.stringify(f2.participants[i]);

		if (fs1 !== fs2) {
			return {
				changed: true,
				reason: `${i}th participants differed`,
			};
		}
	}

	for (let i = 0; i < f1.lessons.length; i++) {
		const fs1 = JSON.stringify(f1.lessons[i]);
		const fs2 = JSON.stringify(f2.lessons[i]);

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

if (!module.parent) {
	// const datadir = path.join(__dirname, "..", "data");
	const datadir = path.join(__dirname, "..", "..", "data"); // DEBUG @ ROOT

	const entries = fs.readdirSync(datadir).map((x) => path.join(datadir, x));
	const files: string[] = entries.filter((x) => x.endsWith(".json") && fs.statSync(x).isFile());

	const padFor = (x: number, maxlen: number = files.length.toString().length, pad = " "): string => {
		const xlen = x.toString().length;
		if (xlen > maxlen) throw new Error(`x len > maxlen`);
		const delta = maxlen - xlen;
		const padding = pad.repeat(delta);
		return padding;
	};

	let n_changed: number = 0;
	for (let i = 0; i < files.length - 1; i++) {
		const fp1 = files[i];
		const fp2 = files[i + 1];

		const changed: DataChangedRet = detectIfDataChanged(fp1, fp2);
		if (changed.changed) {
			++n_changed;

			const info = [
				padFor(n_changed),
				n_changed,
				padFor(i),
				i,
				"changed",
				path.basename(fp1),
				path.basename(fp2),
				changed.reason,
			];
			console.log(...info);
		}
	}
}
