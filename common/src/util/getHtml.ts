import fetch from "node-fetch";
import iconv from "iconv-lite";

/** https://stackoverflow.com/a/9049823 */
export const getHtml = async (url: string, encoding: string = "utf-8"): Promise<string> => {
	try {
		const response = await fetch(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41",
			},
		});

		/** See https://github.github.io/fetch#Error */
		if (!response.ok) {
			const err: Error = new Error(response.statusText);

			console.error("Failed @ `getHtml`:", err);
			throw err;
		}

		const dataBuffer: Buffer = await response.buffer();

		const parsedHtml: string = iconv.decode(dataBuffer, encoding);

		return parsedHtml;
	} catch (err) {
		/** this probably will never be reached */
		console.error("Error! Failed to `getHtml`: ", err);
		throw err;
	}
};
