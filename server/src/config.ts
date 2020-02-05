// config.ts
/**
 * @note
 * paths are relative to THIS file (config.ts),
 * because we use `__dirname`
 * to keep everything consistant
 */

import { join } from "path";

import { createScraperConfig, IScraperConfig } from "@turbo-schedule/scraper";

export const generatedDirPath: string = join(__dirname, "..", "generated"); /** dir for all generated stuff */
export const openAPIFilePath = join(generatedDirPath, "openAPI.json");

/**
 * @note this is not only the scraped data -
 * it also contains saved data such as the `emails.json` file
 * with user submitted emails etc.
 *
 * TODO rename
 */
export const scrapedDataDirPath: string = join(__dirname, "..", "database");

export const { studentsFilePath, latestScrapedDataDirPath, getStudentFilePath }: IScraperConfig = createScraperConfig(
	scrapedDataDirPath
);
