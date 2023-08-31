import path from "path"

import { defaultDatabaseDataDirPath } from "./config"

export const iso2file = (iso: string): string => iso.replace(/\:/g, "_");
export const file2iso = (file: string): string => file.replace(/_/g, ":");

export const ISO_STRING_REGEX = /\d+\-\d+\-\d+\T\d+\:\d+\:\d+\.\d+\Z/
export const containsValidISOString = (x: string): boolean => ISO_STRING_REGEX.test(x)

/**
 * @depends {iso2file, file2iso}
 */
export const ISO_FILENAME_REGEX = /\d+\-\d+\-\d+\T\d+\_\d+\_\d+\.\d+\Z/
export const containsOurISOFilename = (x: string): boolean => ISO_FILENAME_REGEX.test(x)

export const DB_FILE_EXT = ".json"

export function databaseSnapshotNameToFullFilepath(snapshot: string, databaseDirPath: string = defaultDatabaseDataDirPath) {
	if (containsValidISOString(snapshot)) {
		/**
		 * if yes, then the raw ISO string was provided,
		 * without properly converting it via `iso2file`.
		 */
		snapshot = iso2file(snapshot)
	}

	const hasJsonSuffix = snapshot.endsWith(DB_FILE_EXT)
	if (!hasJsonSuffix) {
		snapshot += DB_FILE_EXT
	}

	return path.join(databaseDirPath, snapshot);
}

/**
 * @depends {databaseSnapshotToFullFilepath} (inverse)
 */
export function databaseFilepathToSnapshotName(fullDatabaseFilepathOrJustFile: string): string {
	let snapshot: string = path.basename(fullDatabaseFilepathOrJustFile)

	const hasFileExt = snapshot.endsWith(DB_FILE_EXT)
	if (hasFileExt) {
		snapshot = snapshot.slice(0, -DB_FILE_EXT.length)
	}

	if (containsOurISOFilename(snapshot)) {
		snapshot = file2iso(snapshot)
	}

	return snapshot
}
