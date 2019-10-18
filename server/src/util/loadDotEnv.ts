// loadDotEnv.ts

/**
 * @note
 * you should provide the environment variables
 * `NODE_ENV` (`development` | `production` | `test`),
 * `DEBUG`
 * if you want a setup that works correctly
 *
 * it's recommended to do this via the package.json scripts
 * to make sure it's automatic.
 *
 * @usage
 *
 * ```ts
 * import "./path/to/loadDotEnv";
 * ```
 */

import dotenv from "dotenv";
import { join } from "path";

const dotenvFileName: string = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

const dotenvResult: dotenv.DotenvConfigOutput = dotenv.config({
	path: join(__dirname, "../", "../", dotenvFileName),
	debug: process.env.DEBUG === "true",
	encoding: "utf8",
});

if (dotenvResult.error) {
	throw dotenvResult.error;
} else {
	console.log(`\n~ Succesfully parsed .env (${dotenvFileName})`);

	if (process.env.NODE_ENV !== "production") {
		console.log(dotenvResult.parsed);
	}
}
