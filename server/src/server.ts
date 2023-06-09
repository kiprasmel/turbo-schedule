// server.ts

/**
 * The server.
 *
 * This does NOT start the server - it exports the `startServer` function
 * which is used in `server/script/start-server.ts`
 *
 * This is useful since we need to start the server
 * in other places too & this makes the server importable
 * without instantly starting it.
 *
 */

import http from "http";
import express, { Express } from "express";
// import jsonServer from "json-server";
import fs from "fs-extra";
import { handleResponses, handleRequests, OpenAPIV2 } from "express-oas-generator";
import helmet from "helmet";
import cors from "cors";

import { initDb } from "@turbo-schedule/database";

// import { mwReadOnly } from "./middleware/mwReadOnly";
// import { mwPickFields } from "./middleware/mwPickFields";

import { openAPIFilePath } from "./config";
import { isProd } from "./util/isProd";
import { setupLogger } from "./util/setupLogger";
import { apiRouter } from "./route/apiRouter";
import { serveStaticClientInProd } from "./util/serveStaticClientInProd";
import { enableScraperCronjob } from "./util/enableScraperCronjob";
import { watchForUpdatesAndRunScraper } from "./util/watchForUpdatesAndRunScraper";

const app: Express = express();

if (!isProd()) {
	/**
	 * Re-use the pre-built specification if it exists
	 * (we generate it using `yarn build:docs`)
	 *
	 * See https://github.com/kiprasmel/turbo-schedule/issues/45
	 */
	let predefinedSpec: OpenAPIV2.Document | undefined;
	try {
		predefinedSpec = (JSON.parse(
			fs.readFileSync(openAPIFilePath, { encoding: "utf-8" })
		) as unknown) as OpenAPIV2.Document;
	} catch (e) {
		//
	}

	handleResponses(app, {
		specOutputPath: openAPIFilePath,
		writeIntervalMs: 0,
		predefinedSpec: predefinedSpec ? () => predefinedSpec : undefined,
	});
}

/** config */

/**
 * we're using this together with `nginx`.
 * See https://github.com/expressjs/morgan/issues/214#issuecomment-555068350
 */
app.set("trust proxy", true);

/** misc */
app.use(helmet()); // https://helmetjs.github.io/
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
setupLogger(app);

/** routes */
app.use("/api", apiRouter);

// const jsonServerRouter = jsonServer.router(databaseFile, { foreignKeySuffix: "" });
// app.use("/api/temp", [mwReadOnly, jsonServerRouter]); /** TODO RENAME */

serveStaticClientInProd(app);

/**
 * handle the app's `requests`
 * this SHALL be the last middleware.
 */
if (!isProd()) {
	handleRequests();
}

/** export the express app after it's set up - the tests use it */
export { app };

export interface StartServerOptions {
	portOverride?: number | string;
	enableScraping?: boolean;
}

export function startServer({
	portOverride = undefined, //
	enableScraping = !process.env.NO_SCRAPE &&
		(!!process.env.FORCE_ENABLE_SCRAPING || process.env.NODE_ENV === "production" || false),
}: StartServerOptions = {}): http.Server {
	const PORT: number | string = portOverride ?? process.env.PORT ?? 5000;

	/**
	 * - https://github.com/expressjs/express/issues/4131#issuecomment-565655526
	 *   - https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
	 *   - https://expressjs.com/en/api.html#app.listen_path_callback
	 */
	const server = http.createServer(
		{
			/**
			 * default 2**14 (16kb), we increase to 2**18 (256kb),
			 * because the GET request of participants' common availability
			 * has a very long query param for the participants' names.
			 *
			 * REQUIRES: node >= v13.3.0
			 * see "History" in https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
			 */
			maxHeaderSize: 2 ** 18,
		} as any,
		app
	);

	server.listen(PORT, async () => {
		console.log(
			`~ Server listening on PORT \`${PORT}\` @ NODE_ENV \`${process.env.NODE_ENV}\`, scraping \`${
				enableScraping ? "enabled" : "disabled"
			}\``
		);

		if (enableScraping) {
			try {
				/** checks for updates every minute & runs the scraper if updates available */
				watchForUpdatesAndRunScraper();

				/** runs the scraper once a day just in case */
				enableScraperCronjob();
			} catch (e) {
				/**
				 * handle gracefully without halting the whole application
				 */
				console.error("encountered scraper error @ server:", e);
			}
		}

		/**
		 * if appropriate, the `initDb` function will create some fake data
		 * if the mode is development and we do not have a database file yet.
		 */
		await initDb();
	});

	return server;
}
