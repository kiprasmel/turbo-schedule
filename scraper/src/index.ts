import { IOptions } from "./options";
import { scrape } from "./scraper";

const scraper = async (options: IOptions) => {
	await scrape(options);
};

export default scraper;
