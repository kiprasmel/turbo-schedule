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

import express from "express";
import { handleResponses, handleRequests } from "express-oas-generator";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import fs from "fs-extra";
import { Server } from "http";

import { isProd } from "./util/isProd";
import { apiRouter } from "./route/apiRouter";
import { enableScraperCronjob } from "./util/enableScraperCronjob";
import { setupLogger } from "./util/setupLogger";

const app = express();

const openAPISavePathAndFilename = path.join(__dirname, "..", "generated", "openAPI.json");
if (!isProd()) {
	handleResponses(app, { specOutputPath: openAPISavePathAndFilename, writeIntervalMs: 0 });
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

/**
 * TODO - if we're making independant microservices,
 * this will probably have to go.
 */
if (process.env.NODE_ENV === "production") {
	console.log("~ Server's using client's production build");
	/** serve static assets */
	const pathNormal: string = path.join(__dirname, "../", "../", "client", "build");
	const pathOnceBuilt: string = path.join(__dirname, "../", "../", "../", "client", "build");
	let pathToUse: string = "";

	if (fs.pathExistsSync(pathOnceBuilt)) {
		pathToUse = pathOnceBuilt;
		console.log("~ Using the `built` path");
	} else if (fs.pathExistsSync(pathNormal)) {
		pathToUse = pathNormal;
		console.log("~ Using the `normal` path");
	} else {
		throw new Error("~ Static assets path does not exist!");
	}

	app.use(express.static(pathToUse));

	const indexHtmlFilePath: string = path.join(pathToUse, "index.html");

	if (!fs.pathExistsSync(indexHtmlFilePath)) {
		throw new Error("~ Static index.html file does not exist!");
	}

	/** capture everything that's outside our API routes and send the built react application (index.html file) */
	app.get("/*", (_req, res) => {
		res.sendFile(indexHtmlFilePath);
		// res.sendFile(path.resolve(__dirname, "turbo-schedule-client", "build", "index.html"));
	});
} else {
	console.log("~ Server is NOT using client's prod build");
}

/**
 * handle the app's `requests`
 * this SHALL be the last middleware.
 */
if (!isProd()) {
	handleRequests(app);
}

/** export the express app after it's set up - the tests use it */
export { app };

export interface StartServerOptions {
	openAPISavePathAndFilename?: string;
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
