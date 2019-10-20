// server.ts

/**
 * The server.
 *
 * This does NOT start the server - it exports the `startServer` function
 * which is used in `index.ts` to actually start the server
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

import { applyAPIDocsGenerator } from "./util/applyAPIDocsGenerator";
import { apiRouter } from "./route/apiRouter";
import { runScraperCronjob } from "./util/runScraperCronjob";

export const app = express();

export function startServer(callback: () => any = () => {}) {
	applyAPIDocsGenerator(
		app,
		"./openAPI.json" /** relative to where the script is ran from */
	); /** non-production only */

	const PORT = process.env.PORT || 5000;

	/** misc */
	app.use(helmet()); // https://helmetjs.github.io/
	app.use(cors());
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	/** routes */
	app.use("/api", apiRouter);

	// app.use("*", (req, res) => {
	// 	return res.status(400).json({ error: "bad request!" });
	// });

	/**
	 *
	 * TODO - if we're making independant microservices,
	 * this will probably have to go.
	 *
	 */
	if (process.env.NODE_ENV === "production") {
		console.log("~ Server's using client's production build");
		/** serve static assets */
		app.use(express.static(path.join(__dirname, "../", "../", "client", "build")));

		/** capture everything that's outside our API routes and send the built react application (index.html file) */
		app.get("/*", (_req, res) => {
			res.sendFile(path.join(__dirname, "../", "../", "client", "build", "index.html"));
			// res.sendFile(path.resolve(__dirname, "turbo-schedule-client", "build", "index.html"));
		});
	} else {
		console.log("~ Server is NOT using client's prod build");
	}

	/** serving */
	app.listen(PORT, async () => {
		console.log(`~ Server listening on PORT \`${PORT}\` @ NODE_ENV \`${process.env.NODE_ENV}\``);

		/** TODO - figure out where to place this */
		runScraperCronjob();

		callback();
	});

	process.on("SIGINT", () => {
		console.log("Bye bye!");
		process.exit();
	});
}
