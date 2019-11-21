// config.ts
/**
 * @note
 * paths are relative to THIS file (config.ts),
 * because we use `__dirname`
 * to keep everything consistant
 */

import { join } from "path";

export const generatedDirPath: string = join(__dirname, "..", "generated"); /** dir for all generated stuff */
export const openAPIFilePath = join(generatedDirPath, "openAPI.json");
export const scrapedDataDirPath: string = join(__dirname, "..", "saved-content");
export const latestScrapedDataDirPath: string = join(scrapedDataDirPath, "latest");
export const studentDataArrayFilePath: string = join(latestScrapedDataDirPath, "students-data-array.json");
export const getStudentFilePath = (studentName: string): string =>
	join(latestScrapedDataDirPath, "students", studentName, "student-data.json");
