import { Express } from "express";
import expressOasGenerator from "express-oas-generator";

export const applyAPIDocsGenerator = (app: Express, savePath: string | undefined = undefined) => {
	expressOasGenerator.init(
		app,
		(spec: any) => {
			const pkgName: string = require("../../package.json").name || "@turbo-schedule/server";

			spec.info.title = `${pkgName} REST API v1`;

			return spec;
		},
		savePath,
		1000 * 10
	);
};
