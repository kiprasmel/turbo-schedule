import { scrape } from "./scraper";
import { IScraperConfig, createScraperConfig } from "./config";

export * from "./config";
export * from "./wasScheduleUpdated";

const scraper = async (outDir: string): Promise<void> => {
	const config: IScraperConfig = createScraperConfig(outDir);

	await scrape(config);
};

export default scraper;
