import fs from "fs-extra";
import { join } from "path";
import { RequestHandler } from "express";

/** read initially */

const leanDocsPath = join(__dirname, "../", "../", "./openAPI.lean.json");

let _openAPIDocs: string = "{}";
let openAPIDocs: string = "{}";

try {
	if (!fs.pathExistsSync(leanDocsPath)) {
		_openAPIDocs = "{}";
	} else {
		_openAPIDocs = fs.readFileSync(leanDocsPath, {
			encoding: "utf-8",
		});
	}

	openAPIDocs = JSON.parse(_openAPIDocs);
} catch (err) {
	console.error("! openAPIDocs: Failed reading / parsing docs!");
}

export const openAPIDocsHandler: RequestHandler = (_req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(openAPIDocs);
};

console.log("openAPIDocs");
console.log(openAPIDocs);
