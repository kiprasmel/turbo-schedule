import fs from "fs";
import prettier, { BuiltInParserName, CustomParser } from "prettier";
import { handleError } from "./handleError";
import { saveFile } from "./htmlSaving";

// import { removeCircular } from "./getCircularReplacer";
// import { removeCheerioesCirculars } from "./removeCheerioesCirculars";

/** TODO options */

export class writeJSONToFileOptions {
	content: any = null;
	relativeFilePath: string = "";
	encoding?: string = "utf-8";
	parser?: BuiltInParserName | CustomParser = "json";
	shouldStringify?: boolean = true;
	shouldPrettify?: boolean = true;
}

export const writeJSONToFile = async (options: writeJSONToFileOptions = new writeJSONToFileOptions()) => {
	const { content, shouldStringify, shouldPrettify, relativeFilePath, parser, encoding } = options;

	const stringified: string = shouldStringify ? JSON.stringify(content) : content;

	const prettified: string = shouldPrettify ? prettier.format(stringified, { parser: parser }) : stringified;

	fs.writeFile(relativeFilePath, prettified, { encoding }, handleError);
};

export const writeJSONToFileSimple = async (content: any, savingPath: string, filename: string) => {
	// const jsonWithoutCircular = removeCircular(content);

	// const stringified: string = JSON.stringify(jsonWithoutCircular);

	const stringified: string = JSON.stringify(content);

	const prettified: string = prettier.format(stringified, { parser: "json" });

	saveFile(prettified, savingPath, filename);

	// /** TODO sync */
	// fs.writeFile("./studentsArray.json", prettified, "utf-8", (error) => {
	// 	if (!!error) {
	// 		console.log("error", error);
	// 	}
	// });
};
