import fs, { WriteOptions } from "fs-extra";
import { Router } from "express";

import { isProd } from "../../../src/util/isProd";
import { scrapedDataSavePath } from "../../config";

const router: Router = Router();

const emailFileName: string = "emails.json";
const savingPathAndName: string = scrapedDataSavePath + "/" + emailFileName;

export interface IEmail {
	created: string;
	ip: string;
	email: string;
}

export interface IEmailsFileContent {
	emailsArray: Array<IEmail>;
}

const defaultFileData: IEmailsFileContent = {
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
			const errMsg: string = "Email cannot be empty!";
			res.status(400).json({ error: errMsg });
			return !isProd() ? next(errMsg) : res.end();
		}

		/**
		 * TODO - validation?
		 */

		/** create file & write default data if not present */
		if (!(await fs.pathExists(savingPathAndName))) {
			await fs.outputJSON(savingPathAndName, defaultFileData, writeJSONOptions);
		}

		const emailsFile: string = await fs.readFile(savingPathAndName, { encoding: "utf-8" });
		let fileContent: IEmailsFileContent = !!emailsFile ? JSON.parse(emailsFile) : defaultFileData;

		/** handle duplicates */
		if (fileContent.emailsArray.some((emailOjb) => emailOjb.email === email)) {
			const warningMsg: string = "Email already exists";
			res.status(403).json({ emailEntry: email, error: warningMsg });
			return !isProd() ? next(warningMsg) : res.end();
		}

		const newEmailEntry: IEmail = {
			created: new Date().toISOString(),
			ip: req.ip,
			email: email,
		};

		fileContent.emailsArray.push(newEmailEntry);

		await fs.writeJSON(savingPathAndName, fileContent, writeJSONOptions);

		res.json({ emailEntry: newEmailEntry });
		return !isProd() ? next() : res.end();
	} catch (err) {
		res.status(500).json({ error: err });
		return !isProd() ? next(err) : res.end();
	}
});

export { router as emailRouter };
