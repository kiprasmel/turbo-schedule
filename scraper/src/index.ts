import { ScrapeInfo } from "@turbo-schedule/common";

import { scrape } from "./scraper";
import { IScraperConfig, createScraperConfig } from "./config";

export * from "./config";
export * from "./wasScheduleUpdated";

const scraper = async (outDir: string): Promise<ScrapeInfo> => {
	const config: IScraperConfig = createScraperConfig(outDir);

	return await scrape(config);
};

export default scraper;
