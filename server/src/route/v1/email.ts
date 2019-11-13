import fs, { WriteOptions } from "fs-extra";
import path from "path";
import { Router } from "express";
import { Email } from "@turbo-schedule/common";

import { isProd } from "../../../src/util/isProd";
import { scrapedDataDirPath } from "../../config";

const router: Router = Router();

const emailFileName: string = "emails.json";
const savingPathAndName: string = path.join(scrapedDataDirPath, emailFileName);

export interface EmailsFileContent {
	emailsArray: Array<Email>;
}

const defaultFileData: EmailsFileContent = {
	emailsArray: [],
};

const writeJSONOptions: WriteOptions = { encoding: "utf-8", EOL: "\n", spaces: "\t" };

/**
 * add email to the `emails.json` list
 */
router.post("/", async (req, res, next) => {
	try {
		const { email } = req.body;

		if (!email) {
			const message: string = "Field `email` is missing";

			console.warn(message);
			res.status(422).json({ emailEntry: new Email(), message });
			return !isProd() ? next(message) : res.end();
		}

		/**
		 * TODO - validation?
		 */

		/** create file & write default data if not present */
		if (!(await fs.pathExists(savingPathAndName))) {
			await fs.outputJSON(savingPathAndName, defaultFileData, writeJSONOptions);
		}

		const emailsFile: string = await fs.readFile(savingPathAndName, { encoding: "utf-8" });
		let fileContent: EmailsFileContent = !!emailsFile ? JSON.parse(emailsFile) : defaultFileData;

		/** handle duplicates */
		if (fileContent.emailsArray.some((emailOjb) => emailOjb.email === email)) {
			const message: string = "Email already exists";

			console.warn(message);
			res.status(403).json({ emailEntry: new Email({ email: email, ip: "", created: "" }), message });
			return !isProd() ? next(message) : res.end();
		}

		const newEmailEntry: Email = new Email({
			created: new Date().toISOString(),
			ip: req.ip,
			email: email,
		});

		fileContent.emailsArray.push(newEmailEntry);

		await fs.writeJSON(savingPathAndName, fileContent, writeJSONOptions);

		res.json({ emailEntry: newEmailEntry });
		return !isProd() ? next() : res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ emailEntry: new Email(), message: err });
		return !isProd() ? next(err) : res.end();
	}
});

export { router as emailRouter };
