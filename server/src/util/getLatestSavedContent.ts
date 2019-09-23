import { config } from "../config";
const { scrapedDataSavePath } = config;

export const getSpecificSavedContentPath = (yyyymmdd: string): string => {
	const savePath: string = scrapedDataSavePath + "/" + yyyymmdd;
	return savePath;
};
