#!/usr/bin/env ts-node-dev
// run-scraper.ts

/**
 * @usage
 * `./run-scraper ./path/for/saving/content/`
 *
 * @note
 * when          in typescript, run with `ts-node-dev` or simply `./`;
 * when compiled to javascript, run with `node`;
 */

import scraper from "./index";

const argv: string[] = process.argv.splice(2);
const savePath: string = argv[0];

scraper({ savePath });
