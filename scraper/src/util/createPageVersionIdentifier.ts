import cheerio from "cheerio";
import { removeCheerioesCirculars } from "./removeCheerioesCirculars";

export const createPageVersionIdentifier = (pageHtml: string): string => {
	const $ = cheerio.load(pageHtml);

	const selector: string =
		"body > font > font > center > font > font > font > table > tbody > tr > td:nth-child(2) > font";

	const element: Cheerio = $(selector);

	const pageVersionIdentifier: string | undefined = element.text();

	if (!pageVersionIdentifier) {
		/**
		 * TODO inform ourselves
		 */

		const msg: string = `The html selector for finding \`pageVersionIdentifier\` is outdated! \nprovided selector = ${selector} \nelement = ${JSON.stringify(
			removeCheerioesCirculars([element.toArray()[0]])
		)} \ngot value = ${pageVersionIdentifier}`;
		const err: Error = new Error(msg);

		console.error(err);
		throw err;
	}

	return pageVersionIdentifier;
};
