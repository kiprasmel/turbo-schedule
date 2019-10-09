/** TODO - select file save path */
import scraper from "@turbo-schedule/scraper";
import { CronJob } from "cron";
import { config } from "../config";

export const runScraperCronjob = () => {
	const runImmediately: boolean = !!process.env.START_SCRAPER_NOW;

	const scraperCronJob: CronJob = new CronJob(
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
		"00 05 00 * * *",
		async function() {
			const startDate: Date = new Date();

			console.log("\n~ Starting scraper:", startDate, "\n");

			await scraper({ savePath: config.scrapedDataSavePath });

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
		},
		undefined,
		runImmediately
	);

	/**
	 * does not actually start the cronjob - just enables it
	 */
	scraperCronJob.start();
};
