import express, { Express } from "express";
import fs from "fs-extra";
import path from "path";

import { isProd } from "./isProd";

/**
 * @description serve client's static assets & it's `index.html`
 *
 * @note this will use `app.get("/*")`,
 * so you **must** place this AFTER all your other routes
 */
export const serveStaticClientInProd = (app: Express): void => {
	if (!isProd()) {
		console.log("~ Server is NOT using client's prod build");
		return;
	}

	console.log("~ Server IS using client's production build");

	const pathNormal: string = path.join(__dirname, "../", "../", "../", "client", "build");
	const pathOnceBuilt: string = path.join(__dirname, "../", "../", "../", "../", "client", "build");
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
		try {
			res.sendFile(indexHtmlFilePath);
		} catch (err) {
			console.error("Error sending client's static index.html page", err);
		}
	});
};
