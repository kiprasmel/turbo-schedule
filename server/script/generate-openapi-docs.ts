#!/usr/bin/env ts-node-dev
// generateOpenAPIDocs.ts

/**
 * @usage
 * `./generateOpenAPIDocs ./path/to/openAPI.json`
 *
 * @note
 * when          in typescript, run with `ts-node-dev` or simply `./`;
 * when compiled to javascript, run with `node`;
 */

import { generateOpenAPIDocs } from "./module/generateOpenAPIDocs";
import { openAPIFilePath } from "../src/config";

const argv: string[] = process.argv.splice(2);
let savePathAndFilename: string;

if (argv.length) {
	savePathAndFilename = argv[0];
} else {
	savePathAndFilename = openAPIFilePath;
}

(async () => {
	await generateOpenAPIDocs(savePathAndFilename);
	process.exit();
})();
