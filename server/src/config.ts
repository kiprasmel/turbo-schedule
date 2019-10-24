// config.ts
/**
 * @note
 * paths are relative to THIS file (config.ts),
 * because we use `__dirname`
 * to keep everything consistant
 */

import { join } from "path";

export const scrapedDataDir: string = "saved-content";
export const scrapedDataSavePath: string = join(__dirname, "..", scrapedDataDir);
export const latestContentPath: string = scrapedDataSavePath + "/" + "latest";
export const generatedDirPath: string = join(__dirname, "..", "generated");
