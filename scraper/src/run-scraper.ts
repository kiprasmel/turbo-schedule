#!/usr/bin/env node
// run-scraper.ts
/**
 * first compile with `tsc`,
 * then run with `node`
 *
 * `$1` is the `savePath`
 *
 */

import scraper from "./index";

let { argv } = process;

argv = argv.splice(2);

const savePath: string = argv[0];

scraper({ savePath });
