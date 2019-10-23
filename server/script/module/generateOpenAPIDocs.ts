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

import fs from "fs-extra";
import { Server } from "http";
import fetch from "node-fetch";

import { OpenAPISpec } from "./index";
import { startServer } from "../../src/server";
import { modifyGeneratedAPIDocs } from "./modifyGeneratedAPIDocs";
import { parse } from "path";

// export function generateOpenAPIDocs(saveDirPath: string, saveFilename: string): OpenAPISpec | undefined {
export async function generateOpenAPIDocs(savePathAndFilename: string): Promise<OpenAPISpec | undefined> {
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

		const serverPort: number = 5069;

		/** start the server */
		console.log("  -> starting server:");
		const server: Server = startServer({
			openAPISavePathAndFilename: savePathAndFilename,
			portOverride: serverPort,
		});

		/** access the API docs so that the json file is written. TODO UPSTREAM */
		await fetch(`http://localhost:${serverPort}/api-docs`);

		/**
		 * TODO FIXME UPSTREAM
		 * This was needed previously.
		 * Currently it's working without this
		 * but some patching might be needed,
		 * so until upstream fixes it -
		 * I'm keeping it just in case
		 */
		// while (!fs.pathExistsSync(savePathAndFilename)) {
		// 	console.log("waiting");
		// }

		/**
		 * TODO - FUTURE - run API tests to get all the docs
		 */

		/** close the server once everything has been generated */
		console.log("  -> stopping server");
		server.close();

		const generatedDocsUnmodified: string = fs.readFileSync(savePathAndFilename, { encoding: "utf-8" });

		if (!generatedDocsUnmodified || generatedDocsUnmodified === "{}") {
			console.error("   ! error: Generated docs are empty:", generatedDocsUnmodified);
			throw new Error("Generated docs are empty!");
		}

		/** modify the generated docs to our liking */
		console.log("  -> creating a lean version of the docs:");
		const generatedDocs: OpenAPISpec | undefined = modifyGeneratedAPIDocs(savePathAndFilename);

		return generatedDocs;
	} catch (err) {
		console.error(err);
		return undefined;
	} finally {
		console.log(" /generateOpenAPIDocs\n");
	}
}
