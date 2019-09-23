#!/usr/bin/env node
// predeploy.ts (predeploy.js)

/**
 *
 * WARNING THIS IS NOT FINISHED YET
 *
 * This should be run ON PRODUCTION RELEASE (figure out when EXACTLY),
 * and on development environments,
 * because the files get moved to `dist/saved-content`,
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

// // import { join } from "path";
import scraper from "@turbo-schedule/scraper";
import { config } from "./config";

// // /**
// //  * since the `predeploy` script is going to be placed
// //  * into `./dist/`, we need to up the directory level
// //  * by 1
// //  *
// //  * TODO fix the scraper itself
// //  * or compile the predeploy script straight here
// //  * without placing into `dist`
// //  */
// // // let savePath: string = join(__dirname, "../", config.scrapedDataDir);
let savePath: string = config.scrapedDataSavePath;

scraper({ savePath });
