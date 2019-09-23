/**
 * `fs` promises:
 * https://www.codota.com/code/javascript/functions/fs/promises
 */
import fs from "fs";

import { Router } from "express";

const router = Router();

import { config } from "../config";
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
router.post("/", async (req, res) => {
	try {
		const { email } = req.body;
		console.log("email", email);

		console.log("body", req.body);

		if (!email) {
			return res.status(400).json({ error: "Email cannot be empty!" });
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

		return res.json({ emailEntry: newEmailEntry });
	} catch (err) {
		console.log("Error!", err);
		return res.status(500).json({ error: err });
	}
});

/**
 * remove email from the `emails.json` list
 */
router.delete("/", async (_req, res) => {
	/**
	 * TODO
	 *
	 *  how do we identify that the same person who submitted the email
	 * is the one who wants to remove it?
	 *
	 */

	return res.status(404).json({ error: "Sorry, not yet implemented!" });
});

export { router as emailRouter };
