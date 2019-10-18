import openAPIJSDoc, { Options } from "swagger-jsdoc";
import { RequestHandler } from "express";

const serverVersion: string = require("../../package.json").version || "";

const options: Options = {
	swaggerDefinition: {
		info: {
			title: "Turbo Schedule",
			version: serverVersion,
			description: "🎒 A better schedule web app than our school's one!",
		},
	},
	/** @NOTE - the paths are relative to the (`server`) project's root (where the thing is started from)! */
	apis: ["./src/route/v1/**.ts", "./src/route/apiRouter.ts"],
};

console.log("options:");
console.log(options);

console.log("openAPIJSDoc", openAPIJSDoc);

export const openAPIDocs = openAPIJSDoc(options);
// export const openAPIDocs = {};

export const openAPIDocsHandler: RequestHandler = (_req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(openAPIDocs);
};

console.log("openAPIDocs");
console.log(openAPIDocs);
