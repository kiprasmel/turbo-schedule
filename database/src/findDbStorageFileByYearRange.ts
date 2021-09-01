import fs from "fs-extra";
import path from "path";

import { YearRange, latestYearRange, allYearsRange } from "@turbo-schedule/common";

import { DbSchema, defaultDatabaseDataDirPath } from "./config";

const isWithinTheSchoolYear = (yearStart: number, yearEnd: number) => (scrapeDate: Date): boolean => {
	/**
	 * months start from 0, (9 - 1) = 8th = September.
	 *
	 * days start from 0 too (?), 0th is the 1st, +7 to forward a week
	 * in case it gets withheld in any case, and +1 for the sake of it
	 */
	// const minDate: Date = new Date(yearStart, 9 - 1, 0 + 7 + 1);
	const minDate: Date = new Date(yearStart, 9 - 1, 0); // TODO FIXME HACK

	/**
	 * 6 - 1 = 5th = June
	 */
	const maxDate: Date = new Date(yearEnd, 6 - 1, 0 + 1);

	if (scrapeDate >= minDate && scrapeDate <= maxDate) {
		return true;
	}

	return false;
};

/**
 * @throws if anything goes wrong
 */
export const tryFindDbStorageFileByYearRange = async (
	yearRange: Omit<YearRange, typeof latestYearRange>,
	/**
	 * TODO FIXME: if we use the start of the year, the participant will not be found since in the beginning of the year, the school year isn't over yet. same with find vs findLast (must use findLast (by reverse()ing) atm)
	 *
	 * TODO FIXME: nvm this sucks bad; need to find when the school year starts and ends (~~(or use the before-start date)~~ don't know when updates so no)
	 *
	 */
	_findByStartOrEndOfYear: "start" | "end" = "end"
) => {
	const databaseFilePaths: string[] = await (await fs.readdir(defaultDatabaseDataDirPath))
		.filter((file) => file.match(/\.json$/))
		.map((file) => path.join(defaultDatabaseDataDirPath, file));

	if (yearRange === latestYearRange) {
		throw new Error(
			"yearRange cannot be the same as latestYearRange - you should not need to call `findDbStorageFileByYearRange` in that case"
		);
	}

	let yearStart: number, yearEnd: number;

	if (yearRange === allYearsRange) {
		[yearStart, yearEnd] = [2018, new Date().getFullYear()];
	} else {
		[yearStart, yearEnd] = (yearRange as string).split("-").map(Number);
	}

	if (yearRange !== allYearsRange && (Number.isNaN(yearStart) || Number.isNaN(yearEnd))) {
		throw new Error("incorrect yearRange format - cannot parse yearStart and yearEnd");
	}

	const candidateDatabaseFiles: string[] = databaseFilePaths.filter(
		async (dbFile): Promise<boolean> => {
			try {
				const fileContentUnconfirmed: Partial<DbSchema> | null | undefined = await fs.readJson(
					dbFile, //
					{
						encoding: "utf-8",
					}
				);
				if (!fileContentUnconfirmed?.scrapeInfo) return false;

				const fileContent: DbSchema = fileContentUnconfirmed as DbSchema;

				const scrapeDate: Date = new Date(fileContent.scrapeInfo.timeStartISO);
				const scrapeYear: number = scrapeDate.getFullYear();
				if (Number.isNaN(scrapeYear)) {
					return false;
				}

				const isWithin: boolean =
					yearRange === allYearsRange || isWithinTheSchoolYear(yearStart, yearEnd)(scrapeDate);

				if (isWithin) {
					return true;
				}

				// if (findByStartOrEndOfYear === "start") {
				// 	if (scrapeYear === yearStart) {
				// 		return true;
				// 	}
				// } else {
				// 	if (scrapeYear === yearEnd) {
				// 		return true;
				// 	}
				// }

				return false;
			} catch (e) {
				return false;
			}
		}
	);

	// console.log("candidateDatabaseFiles", candidateDatabaseFiles);

	if (!candidateDatabaseFiles) {
		throw new Error("did not find any files fitting the yearRange");
	}

	let mainDbFile: string, dbFiles: string[];

	const latestDotJsonFilePath = path.join(defaultDatabaseDataDirPath, "latest.json");
	if (candidateDatabaseFiles.includes(latestDotJsonFilePath)) {
		// console.log(
		// 	"has latest.json",
		// 	candidateDatabaseFiles.indexOf(latestDotJsonFilePath),
		// 	candidateDatabaseFiles.length
		// );
		mainDbFile = latestDotJsonFilePath;
		dbFiles = candidateDatabaseFiles.filter((file) => file !== latestDotJsonFilePath);
	} else {
		// console.log("no latest.json");
		mainDbFile = candidateDatabaseFiles[candidateDatabaseFiles.length - 1];
		dbFiles = candidateDatabaseFiles.slice(0, -1);
	}

	return [mainDbFile, dbFiles] as const;
};
