import { getDefaultScrapeInfo, ScrapeInfo } from "./ScrapeInfo";
import { BuildInfo } from "./BuildInfo";

export interface Health {
	scrapeInfo: ScrapeInfo;
	isDataFake: boolean;
	buildInfo: BuildInfo | null;
}

export const getDefaultHealth = (): Health => ({
	isDataFake: true,
	scrapeInfo: getDefaultScrapeInfo(),
	buildInfo: null,
});
