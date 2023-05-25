#!/usr/bin/env ts-node-dev

import os from "os";
import fs from "fs-extra";
import path from "path";

import * as thread from "threads";

import { DbSchema } from "./config";
// eslint-disable-next-line import/no-cycle

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

	const nproc: number = os.cpus().length;
	let proc: number = Math.min(nproc, files.length);
	let filesPerProc: number = Math.floor(files.length / proc);

	if (filesPerProc < 2) {
		proc /= 2;
		filesPerProc = files.length / proc;
	}

	const fileRanges = new Array(proc).fill(0).map((_, i) =>
		i === proc - 1
			? ([i * filesPerProc, files.length - 1] as const) // last thread should take on leftover files, if any
			: ([i * filesPerProc, (i + 1) * filesPerProc] as const)
	);

	console.log({ nproc, proc, fileCount: files.length, fileRanges });

	/**
	 * prep output dir
	 */
	const dataDiffDir = "data-diffs";
	fs.ensureDirSync(dataDiffDir);

	const threadpool = thread.Pool(() => thread.spawn(new thread.Worker("./compare-db-files.ts")), proc);
	const tasks = [];

	for (const [from, to] of fileRanges) {
		const filepaths: string[] = files.slice(from, to + 1);
		const task = threadpool.queue((compareDBFiles) => compareDBFiles(filepaths, dataDiffDir));
		tasks.push(task);
	}

	// await threadpool.completed(); // TODO use this?
	await Promise.all(tasks);
	await threadpool.terminate();
}

if (!module.parent) {
	defaultRun();
}
