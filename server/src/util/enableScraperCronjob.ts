import { CronJob } from "cron";

import { runScraper } from "./runScraper";

export const enableScraperCronjob = (): void => {
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
		runScraper,
		undefined,
		runImmediately
	);

	/**
	 * does not actually start the cronjob - just enables it
	 */
	scraperCronJob.start();
};
