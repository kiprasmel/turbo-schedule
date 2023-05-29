import fs from "fs-extra";

import { expose } from "threads/worker";

import { DbSchema } from "./config";

export type CheckIfNeedleExistsInDb = typeof checkIfNeedleExistsInDb;

expose(async (...args: Parameters<CheckIfNeedleExistsInDb>) => checkIfNeedleExistsInDb(...args));
export function checkIfNeedleExistsInDb(needle: string, filepath: string): boolean {
	if (!fs.existsSync(filepath)) {
		console.error(`db file does not exist: ${filepath}`);
		return false;
	}

	const db: DbSchema | null = readRawDb(filepath);

	if (!db) {
		console.error(`db file empty: ${filepath}`);
		return false;
	}

	if (!("participants" in db)) {
		// TODO FIXME
		console.warn(`key "participants" not found in database - probably old format. ${filepath}`);
		return false;
	}

	/**
	 * TODO FUZZY if direct doesn't match anything
	 */
	const hasNeedle = db.participants.some((x) => x.text === needle);

	return hasNeedle;
}

export function readRawDb(
	filepath: string,
	onEmpty: (opts: { filepath: string }) => void = (): void => {}
): DbSchema | null {
	const raw: string = fs.readFileSync(filepath, { encoding: "utf-8" }).trim();

	if (!raw) {
		onEmpty({ filepath });
		return null;
	}

	return JSON.parse(raw);
}
