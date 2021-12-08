import { getDefaultScrapeInfo, ScrapeInfo } from "./ScrapeInfo";

export interface Health {
	scrapeInfo: ScrapeInfo;
	isDataFake: boolean;
}

export const getDefaultHealth = (): Health => ({
	isDataFake: true,
	scrapeInfo: getDefaultScrapeInfo(),
});
