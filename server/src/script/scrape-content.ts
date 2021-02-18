#!/usr/bin/env ts-node-dev
// scrape-content.ts (scrape-content.js)

/**
 *
 * WARNING THIS IS NOT FINISHED YET
 *
 * This should be run ON PRODUCTION RELEASE (figure out when EXACTLY),
 * and on development environments,
 * because the files get moved to `dist/src/saved-content`,
 * and on development this is NOT what we want!
 *
 * the server should (maybe) himself activate the scrapign stuff,
 * since it doesn't matter
 *
 * we should think about a better solution in the scraper itself
 * to aovid such problems
 *
 * ---
 *
 * oh wait this is not even useful in the docker build
 *
 * ---
 *
 * first compile with `tsc`,
 * then run with `node`
 *
 */

import { createFakeData } from "@turbo-schedule/database";
import scraper from "@turbo-schedule/scraper";

import { scrapedDataDirPath } from "../config";

if (process.env.USE_FAKE_DATA_INSTEAD_OF_SCRAPING) {
	console.log("going fake");
	createFakeData();
} else {
	console.log("going scrape");
	scraper(scrapedDataDirPath);
}
