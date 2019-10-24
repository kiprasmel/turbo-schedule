import { Express } from "express";
import fs from "fs-extra";
import path from "path";
import morgan from "morgan";
import rfs from "rotating-file-stream";

import { generatedDirPath } from "../config";

export const setupLogger = (app: Express, logDirPath: string = path.join(generatedDirPath, "log")): void => {
	fs.ensureDirSync(logDirPath);

	const accessLogStream: fs.WriteStream = rfs("access.log", {
		interval: "1d",
		path: logDirPath,
	});

	app.use(morgan("combined", { stream: accessLogStream }));
};
