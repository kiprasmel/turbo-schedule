#!/usr/bin/env ts-node-dev
// modifyGeneratedAPIDocs.ts

/**
 * @usage
 * `./modifyGeneratedAPIDocs [./path/to/docs.json]`
 *
 * @note
 * when          in typescript, run with `ts-node-dev` or simply `./`;
 * when compiled to javascript, run with `node`;
 */

import { modifyGeneratedAPIDocs } from "./module/modifyGeneratedAPIDocs";
import { openAPIFilePath } from "../src/config";

const argv: string[] = process.argv.splice(2);
let savePathAndFilename: string;

if (argv.length) {
	savePathAndFilename = argv[0];
} else {
	savePathAndFilename = openAPIFilePath;
}

modifyGeneratedAPIDocs(savePathAndFilename);
