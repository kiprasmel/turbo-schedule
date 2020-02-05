// config.ts
/**
 * the exported values are the default ones.
 * TODO should there even be the default exports?
 * We'll use the dynamic ones anyway, right?
 *
 * You should create a config for yourself
 * using the `createScraperConfig` function.
 *
 * @note
 * paths are relative to THIS file (config.ts),
 * because we use `__dirname`
 * to keep everything consistant
 */

/* eslint-disable @typescript-eslint/interface-name-prefix */

import { join } from "path";
import { getYYYYMMDD } from "@turbo-schedule/common";

const defaultOutDir: string = join(__dirname, "scraped-content");

export interface IScraperConfig {
	/**  */
	outDir: string;
	/** dynamically generated based on `outDir`: */
	latestScrapedDataSymlinkPath: string;
	latestScrapedDataDirPath: string;
	studentsFilePath: string;
	uniqueLessonsFilePath: string;
	studentsDirPath: string;
	getStudentFilePath: (studentName: string) => string;
}

export const createScraperConfig = (outDir: string = defaultOutDir): IScraperConfig => {
	/** BEGIN porting from server */

	/**
	 * TODO rename to `latestDatabasePath`
	 */
	const latestScrapedDataSymlinkPath: string = join(outDir, "latest");

	/**
	 * TODO FIXME - this is ONLY for symlinking - use `latestScrapedDataSymlinkPath` instead!
	 *
	 * TODO rename to `latestScrapedDataDirPathForSymlinking`
	 */
	const latestScrapedDataDirPath: string = join(outDir, getYYYYMMDD());

	/**
	 * TODO - the scraper needs to use the join with `latestScrapedDataDirPath`,
	 * AND the consumer needs to use the join with `latestScrapedDataSymlinkPath`
	 */
	const studentsFilePath: string = join(latestScrapedDataDirPath, "students.json");
	const uniqueLessonsFilePath: string = join(latestScrapedDataDirPath, "lessons.json");
	const studentsDirPath: string = join(latestScrapedDataDirPath, "students");
	const getStudentFilePath = (studentName: string): string => join(studentsDirPath, `${studentName}.json`);
	/** END porting from server */

	return {
		/** */
		outDir,
		/** dynamically generated based on `outDir`: */
		latestScrapedDataSymlinkPath,
		latestScrapedDataDirPath,
		studentsFilePath,
		uniqueLessonsFilePath,
		studentsDirPath,
		getStudentFilePath,
	};
};

// export const { latestScrapedDataDirPath, studentsFilePath, getStudentFilePath } = createScraperConfig(
// 	defaultOutDir
// );
