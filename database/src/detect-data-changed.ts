#!/usr/bin/env ts-node-dev

import os from "os";
import fs from "fs-extra";
import path from "path";

import * as thread from "threads";

import { DbSchema } from "./config";

import { CompareDBFiles } from "./compare-db-files";
import { getDatabaseSnapshotFiles } from "./get-db-snapshot-files";

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

export async function defaultRun(): Promise<string[]> {
	const files: string[] = getDatabaseSnapshotFiles();

	const { proc, itemRanges: fileRanges } = splitItemsIntoNGroupsBasedOnCPUCores(files.length);

	/**
	 * prep output dir
	 */
	const dataDiffDir = "data-diffs";
	fs.ensureDirSync(dataDiffDir);

	const threadpool = thread.Pool(() => thread.spawn<CompareDBFiles>(new thread.Worker("./compare-db-files")), proc);

	const meaningfulFiles: string[] = [files[0] /** add very first file */];

	const tasks = [];
	let done = 0;
	const onDone = (meaningfulFilesThatChangedFromPrev: ReturnType<CompareDBFiles>): void => {
		console.log("done", ++done, "total", tasks.length);
		meaningfulFiles.push(...meaningfulFilesThatChangedFromPrev);
	};

	for (let i = 0; i < fileRanges.length; i++) {
		const [from, to] = fileRanges[i];
		const filepaths: string[] = files.slice(from, to + 1);
		const task = threadpool.queue((compareDBFiles) => compareDBFiles({ filepaths, dataDiffDir, threadId: i }));
		task.then(onDone);
		tasks.push(task);
	}

	await threadpool.completed();
	console.log("threadpool: all tasks completed.");

	meaningfulFiles.sort((A, B) => path2date(A) - path2date(B));

	console.log({ meaningfulFiles, meaningful_file_count: meaningfulFiles.length });

	await threadpool.terminate();
	console.log("threadpool: terminated.");

	return meaningfulFiles;
}

export const last = <T = any>(xs: T[]): T => xs[xs.length - 1];
export const path2date = (pathToFileWithDateFormatName: string): number =>
	new Date(last(pathToFileWithDateFormatName.split(path.sep))).getTime();

export function splitItemsIntoNGroupsBasedOnCPUCores(itemCount: number): { proc: number; itemRanges: number[][] } {
	const nproc: number = os.cpus().length;
	let proc: number = Math.min(Math.max(1, nproc - 2), itemCount);

	const calcItemsPerTask = () => Math.floor(itemCount / proc);
	let ITEMS_PER_TASK: number = calcItemsPerTask();

	if (ITEMS_PER_TASK < 2) {
		proc = Math.ceil(proc / 2);
		ITEMS_PER_TASK = calcItemsPerTask();
	}

	/**
	 * usually, a thread would receive a single range,
	 * and then would work on it the whole time,
	 * and then the threadpool would finish.
	 *
	 * a more efficient solution is to split the work up into smaller tasks,
	 * thus using smaller ranges & creating more tasks,
	 * so that after a thread finishes, it can take up a new task,
	 */
	// // https://math.stackexchange.com/a/470107/1149004
	// const RANGES_PER_THREAD = Math.ceil(Math.log2(itemCount) - Math.log2(proc));
	const TASK_SPLIT_FACTOR = Math.ceil(Math.log2(Math.max(2, itemCount / proc)));

	/**
	 * ceil, because it's better to make it slightly harder for all (excl last) processors,
	 * than to make it much harder for a single (the last) processor.
	 */
	const RANGE_STEP = Math.ceil(ITEMS_PER_TASK / TASK_SPLIT_FACTOR);

	const itemRanges = new Array(proc * TASK_SPLIT_FACTOR)
		.fill(0)
		.map((_, i) => [i * RANGE_STEP, (i + 1) * RANGE_STEP]);

	// last thread should take on leftover items, if any
	itemRanges[itemRanges.length - 1][1] = itemCount - 1;

	console.log({
		nproc,
		proc,
		item_count: itemCount,
		ITEMS_PER_TASK,
		TASK_SPLIT_FACTOR,
		RANGE_STEP,
		itemRanges,
		item_ranges_count: itemRanges.length,
	});

	return { proc, itemRanges };
}

if (!module.parent) {
	defaultRun();
}
