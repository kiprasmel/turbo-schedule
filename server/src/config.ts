import { join } from "path";

export interface IConfig {
	scrapedDataDir: string;
	scrapedDataSavePath: string;
	latestContentPath: string;
	generatedDirPath: string;
}

const scrapedDataDir: string = "saved-content";

const scrapedDataSavePath: string = join(__dirname, "..", scrapedDataDir);

/**
 *
 * @note
 *
 * paths are relative to the directory this config is placed at.
 *
 */
export const config: IConfig = {
	scrapedDataDir,
	scrapedDataSavePath,
	latestContentPath: scrapedDataSavePath + "/" + "latest",
	generatedDirPath: join(__dirname, "..", "generated"),
};
