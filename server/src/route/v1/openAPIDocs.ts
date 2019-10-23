import fs from "fs-extra";
import { join } from "path";
import { RequestHandler } from "express";

import { isProd } from "../../../src/util/isProd";

/** read initially (@note - wont update until you restart!) */

const leanDocsPath = join(__dirname, "..", "..", "..", "generated", "./openAPI.lean.json");

let openAPIDocsJSON: string = "{}";

/**
 * TODO - figure out if we need to read the json file
 * on every request or just read it initially and stick with it.
 */
export const openAPIDocsJSONHandler: RequestHandler = async (_req, res, next) => {
	try {
		if (!(await fs.pathExists(leanDocsPath))) {
			openAPIDocsJSON = "{}";
			console.log("  ! openAPIDocsJSON not found (`%s`)", leanDocsPath);
		} else {
			openAPIDocsJSON = await fs.readJSON(leanDocsPath, {
				encoding: "utf-8",
			});
		}

		res.setHeader("Content-Type", "application/json");
		res.send(openAPIDocsJSON);
		return !isProd() ? next() : res.end();
	} catch (err) {
		return next(err); /** this is intended to be handled by `next` either way */
	}
};

export const openAPIDocsHTMLHandler: RequestHandler = (_req, res, next) => {
	try {
		const html: string = `
		<redoc spec-url="/api/v1/docs.json"></redoc>

		<!--  NOTE - the script MUST come AFTER the 'redoc' thing lmao  -->
		<script src="https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js"> </script>
	`;

		res.setHeader("Content-Type", "text/html");
		res.send(html);

		return !isProd() ? next() : res.end();
	} catch (err) {
		return next(err); /** this is intended to be handled by `next` either way */
	}
};
