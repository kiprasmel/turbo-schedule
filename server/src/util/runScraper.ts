import scraper, { wasScheduleUpdated } from "@turbo-schedule/scraper";
import { scrapedDataDirPath } from "../config";

export const runScraper = async (): Promise<void> => {
	const startDate: Date = new Date();

	console.log("\n~ Starting scraper:", startDate, "\n");

	await scraper(scrapedDataDirPath);

	const endDate: Date = new Date();

	const msDifference: number = endDate.getTime() - startDate.getTime();
	const secDifference: number = msDifference / 1000;

	console.log("\n~ Finished scraper.", endDate, "\n difference in secs: ", secDifference, "\n");

	/**
	 * TODO
	 *
	 * Implement @ scraper?
	 *
	 * * check X oftenly if new stuff is available
	 * 		if yes,
	 * 			then get the new stuff,
	 * 			inform the client through sockets probably that we're updating (preferably),
	 * 			& return the new stuff
	 * 		if no, then get the old stuff
	 *
	 */
};

export const runScraperIfUpdatesAvailable = async (): Promise<void> => {
	const updatesAvailable: boolean = await wasScheduleUpdated();

	if (updatesAvailable) {
		/** TODO lockfile for scraper - see https://github.com/kiprasmel/turbo-schedule/issues/44 */
		await runScraper();
	}
};
