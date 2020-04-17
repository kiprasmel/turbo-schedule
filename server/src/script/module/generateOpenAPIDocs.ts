/**
 * 1. start the server
 *
 * 2. run the tests to hit all the endpoints
 * TODO - this is flipped up and does NOT work
 * because the tests make requests internally
 * and do not access the network,
 * thus the `express-oas-generator` cannot create the api docs...
 *
 * 3. modify the generated docs (`./modifyGeneratedAPIDocs.ts`)
 *
 */

import { OpenAPIV3 } from "openapi-types";
import fs from "fs-extra";
import { execSync } from "child_process";

import { parse } from "path";
import { modifyGeneratedAPIDocs } from "./modifyGeneratedAPIDocs";

// export function generateOpenAPIDocs(saveDirPath: string, saveFilename: string): OpenAPISpec | undefined {
export async function generateOpenAPIDocs(savePathAndFilename: string): Promise<OpenAPIV3.Document | undefined> {
	try {
		console.log("\n => generateOpenAPIDocs:");

		console.log("  -> path & filname: `%s`", savePathAndFilename);

		/** make sure the generated directory exists; create it otherwise */
		const savePath: string = parse(savePathAndFilename).dir;
		fs.ensureDirSync(savePath);

		/** remove old filename if exists */

		if (fs.pathExistsSync(savePathAndFilename)) {
			console.log("  -> old file exists - removing it");
			fs.removeSync(savePathAndFilename);
		}

		/**
		 * There are no official docs for running jest programmatically
		 * https://github.com/facebook/jest/issues/5048
		 * -_-
		 */

		// // await jest.run(["--config", join(__dirname, "..", "..", "test", "jest.config.js")]);

		console.log("  -> Running tests to generate API docs (stdout will be printed on finish):");

		/**
		 * @NOTE
		 *
		 * `yarn test` will spin up the server itselt & run the tests,
		 * thus automatically generating the openAPI docs.
		 */
		try {
			execSync("yarn test --forceExit --color=always");
			console.log("");
		} catch (err) {
			throw err;
		}

		const generatedDocsUnmodified: string = fs.readFileSync(savePathAndFilename, { encoding: "utf-8" });

		if (!generatedDocsUnmodified || generatedDocsUnmodified === "{}") {
			console.error("   ! error: Generated docs are empty:", generatedDocsUnmodified);
			throw new Error("Generated docs are empty!");
		}

		console.log("  -> cleaning up generated docs:");
		const generatedDocs: OpenAPIV3.Document | undefined = modifyGeneratedAPIDocs(savePathAndFilename);

		console.log("  -> done - returning docs");
		return generatedDocs;
	} catch (err) {
		console.error(err);
		return undefined;
	} finally {
		console.log("\n /generateOpenAPIDocs\n");
	}
}
