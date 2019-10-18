import fs from "fs-extra";
import { RequestHandler } from "express";

/** read initially */
const _openAPIDocs: string = fs.readFileSync("./openAPI.lean.json", { encoding: "utf-8" });
const openAPIDocs: string = JSON.parse(_openAPIDocs);

export const openAPIDocsHandler: RequestHandler = (_req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(openAPIDocs);
};

console.log("openAPIDocs");
console.log(openAPIDocs);
