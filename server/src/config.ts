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
 * TODO rename
 */
export const scrapedDataDirPath: string = join(__dirname, "..", "..", "database", "data");

export const { studentsFilePath, latestScrapedDataDirPath, getStudentFilePath }: IScraperConfig = createScraperConfig(
	scrapedDataDirPath
);

export const apiDocsRoutePath: string = "/api/v1/docs";
