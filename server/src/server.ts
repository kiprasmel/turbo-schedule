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

import express, { Express } from "express";
// import jsonServer from "json-server";
import { handleResponses, handleRequests } from "express-oas-generator";
import helmet from "helmet";
import cors from "cors";
import { Server } from "http";

// import { mwReadOnly } from "./middleware/mwReadOnly";
// import { mwPickFields } from "./middleware/mwPickFields";

import { openAPIFilePath } from "./config";
import { isProd } from "./util/isProd";
import { setupLogger } from "./util/setupLogger";
import { apiRouter } from "./route/apiRouter";
import { serveStaticClientInProd } from "./util/serveStaticClientInProd";
import { enableScraperCronjob } from "./util/enableScraperCronjob";

const app: Express = express();

if (!isProd()) {
	handleResponses(app, { specOutputPath: openAPIFilePath, writeIntervalMs: 0 });
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
}

export function startServer({
	portOverride = undefined, //
}: StartServerOptions = {}): Server {
	const PORT: number | string = portOverride ?? process.env.PORT ?? 5000;

	/** serving */
	const server: Server = app.listen(PORT, () => {
		console.log(`~ Server listening on PORT \`${PORT}\` @ NODE_ENV \`${process.env.NODE_ENV}\``);

		/** TODO - figure out where to place this */
		enableScraperCronjob();
	});

	return server;
}
