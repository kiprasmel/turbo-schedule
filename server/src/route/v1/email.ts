/**
 * `fs` promises:
 * https://www.codota.com/code/javascript/functions/fs/promises
 */
import fs from "fs";

import { Router } from "express";

const router: Router = Router();

import { config } from "../../config";
const { scrapedDataSavePath } = config;

const emailFileName = "emails.json";
const savingPathAndName = scrapedDataSavePath + "/" + emailFileName;

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

/**
 * add email to the `emails.json` list
 */
router.post("/", async (req, res, next) => {
	try {
		const { email } = req.body;
		console.log("email", email);

		console.log("body", req.body);

		if (!email) {
			const errMsg: string = "Email cannot be empty!"
			res.status(400).json({ error: errMsg });
			return next(errMsg);
		}

		/**
		 * TODO - validation?
		 */

		/** create dir if not present */
		const dirExists: boolean = await fs.promises
			.access(scrapedDataSavePath)
			.then(() => true)
			.catch(() => false);

		if (!dirExists) {
			await fs.promises.mkdir(scrapedDataSavePath, { recursive: true });
		}

		/** create file if not present */
		const fileExists: boolean = await fs.promises
			.access(savingPathAndName)
			.then(() => true)
			.catch(() => false);

		if (!fileExists) {
			await fs.promises.writeFile(savingPathAndName, JSON.stringify(defaultFileData), { encoding: "utf-8" });
		}

		const emailsFile: string = await fs.promises.readFile(savingPathAndName, { encoding: "utf-8" });
		let fileContent: IEmailsFileContent = JSON.parse(emailsFile);

		/**
		 * TODO - handle duplicates?
		 */

		const newEmailEntry: IEmail = {
			created: new Date().toISOString(),
			ip: req.ip,
			email: email,
		};

		fileContent.emailsArray.push(newEmailEntry);

		await fs.promises.writeFile(savingPathAndName, JSON.stringify(fileContent), {
			encoding: "utf-8",
		});

		res.json({ emailEntry: newEmailEntry });
		return next();
	} catch (err) {
		console.log("Error!", err);
		res.status(500).json({ error: err });
		return next(err);
	}
});

export { router as emailRouter };
