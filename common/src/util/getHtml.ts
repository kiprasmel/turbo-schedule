import fetch from "node-fetch";
import iconv from "iconv-lite";

/** https://stackoverflow.com/a/9049823 */
export const getHtml = async (url: string, encoding: string = "utf-8"): Promise<string> => {
	try {
		const response = await fetch(url);

		/** See https://github.github.io/fetch#Error */
		if (!response.ok) {
			const err: Error = new Error(response.statusText);

			console.error("Failed @ `getHtml`:", err);
			return Promise.reject(err);
		}

		const dataBuffer: Buffer = await response.buffer();

		const parsedHtml: string = iconv.decode(dataBuffer, encoding);

		return parsedHtml;
	} catch (err) {
		/** this probably will never be reached */
		console.error("Error! Failed to `getHtml`: ", err);
		return Promise.reject(new Error(err as any));
	}
};
