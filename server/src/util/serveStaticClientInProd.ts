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

	const clientBuildPath: string = path.join(__dirname, "../", "../", "../", "client", "build");

	if (!fs.pathExistsSync(clientBuildPath)) {
		console.error("~ Static assets path does not exist!", { clientBuildPath, __dirname });
		throw new Error();
	}

	app.use(express.static(clientBuildPath));

	const indexHtmlFilePath: string = path.join(clientBuildPath, "index.html");

	if (!fs.pathExistsSync(indexHtmlFilePath)) {
		console.error("~ Static index.html file does not exist!", { indexHtmlFilePath, __dirname });
		throw new Error();
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
