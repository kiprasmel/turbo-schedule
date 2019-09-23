import { CronJob } from "cron";

/** TODO - select file save path */
import scraper from "@turbo-schedule/scraper";

import { config } from "../config";

export const runScraperCronjob = async () => {
	/** TODO REMOVE - this is for testing only! */
	if (!!process.env.TRY_INSTANT_SCRAPE) {
		await scraper({ savePath: config.scrapedDataSavePath });
	}

	const myCronJob: CronJob = new CronJob(
		/**
		 * cron ranges (@ https://www.npmjs.com/package/cron#cron-ranges):
		 *
		 * Seconds: 0-59
		 * Minutes: 0-59
		 * Hours: 0-23
		 * Day of Month: 1-31
		 * Months: 0-11 (Jan-Dec)
		 * Day of Week: 0-6 (Sun-Sat)
		 *
		 */
		"0 5 0 * * *",
		async function() {
			await scraper({ savePath: config.scrapedDataSavePath });

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

			console.log("running cron job!", new Date());
		},
		() => {}
	);

	myCronJob.start();
};
