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
import helmet from "helmet";
import cors from "cors";
import path from "path";
import fs from "fs-extra";
import { Server } from "http";

import { applyAPIDocsGenerator } from "./util/applyAPIDocsGenerator";
import { apiRouter } from "./route/apiRouter";
import { enableScraperCronjob } from "./util/enableScraperCronjob";

export interface StartServerOptions {
	openAPISavePathAndFilename?: string;
	portOverride?: number | string;
}

const app = express();

/** misc */
app.use(helmet()); // https://helmetjs.github.io/
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

/** export the express app after it's set up - the tests use it */
export { app };

export function startServer({
	openAPISavePathAndFilename = path.join(__dirname, "..", "generated", "openAPI.json"),
	portOverride = undefined,
}: StartServerOptions = {}): Server {
	const PORT: number | string = portOverride ?? process.env.PORT ?? 5000;

	/** serving */
	const server: Server = app.listen(PORT, () => {
		console.log(`~ Server listening on PORT \`${PORT}\` @ NODE_ENV \`${process.env.NODE_ENV}\``);

		applyAPIDocsGenerator(app, openAPISavePathAndFilename); /** non-production only */

		/** TODO - figure out where to place this */
		enableScraperCronjob();
	});

	return server;
}
