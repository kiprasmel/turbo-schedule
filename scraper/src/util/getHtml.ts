import fetch from "node-fetch";
import iconv from "iconv-lite";

/**
 * https://stackoverflow.com/a/9049823
 */
export const getHtml = async (url: string): Promise<string> => {
	try {
		// request(url, { encoding: "binary" }, (error, response, html) => {
		// 	const parsed = iconv.decode(html, "windows-1257");
		// 	console.log(parsed);
		// });

		// const response = await axios.get(url, { responseType: "arraybuffer" });
		// const parsed = iconv.decode(response.data, "windows-1257");
		// console.log("parsed", parsed);

		const response = await fetch(url);
		const dataBuffer: Buffer = await response.buffer();

		const parsedHtml: string = iconv.decode(dataBuffer, "windows-1257");

		return parsedHtml;
	} catch (error) {
		console.error("Error! Failed to `getHtml`: " + error);
		return Promise.reject("Failed");
	}
};
