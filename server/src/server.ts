import express from "express";
const app = express();
import helmet from "helmet";
import cors from "cors";
import path from "path";

const PORT = process.env.PORT || 5000;

/** misc */
app.use(helmet()); // https://helmetjs.github.io/
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** routes */
import { apiRouterV1 } from "./route/v1/apiV1";

app.use("/api/v1", apiRouterV1);

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

import { runScraperCronjob } from "./util/runScraperCronjob";

/** serving */
app.listen(PORT, async () => {
	console.log(`~ Server listening on port ${PORT} @ environment ${process.env.NODE_ENV}`);

	/** TODO - figure out where to place this */
	runScraperCronjob();
});

process.on("SIGINT", () => {
	console.log("Bye bye!");
	process.exit();
});
