import fetch from "node-fetch";
import iconv from "iconv-lite";

/**
 * https://stackoverflow.com/a/9049823
 */
export const getHtml = async (url: string, encoding: string = "utf-8"): Promise<string> => {
	try {
		// request(url, { encoding: "binary" }, (error, response, html) => {
		// 	const parsed = iconv.decode(html, "windows-1257");
		// 	console.log(parsed);
		// });

		// const response = await axios.get(url, { responseType: "arraybuffer" });
		// const parsed = iconv.decode(response.data, "windows-1257");
		// console.log("parsed", parsed);

		const response = await fetch(url);

		/**
		 * See https://github.github.io/fetch#Error
		 */
		if (!response.ok) {
			const err: Error = new Error(response.statusText);

			console.error("Failed @ `getHtml`:", err);
			return Promise.reject(err);
		}

		// console.log("response status:", response.status, "ok", response.ok);

		const dataBuffer: Buffer = await response.buffer();

		const parsedHtml: string = iconv.decode(dataBuffer, encoding);

		return parsedHtml;
	} catch (err) {
		/** this probably will never be reached */
		console.error("Error! Failed to `getHtml`: ", err);
		return Promise.reject(new Error(err));
	}
};
