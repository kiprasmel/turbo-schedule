// writeToSingleFile.ts

// import fs from "fs-extra";
// import path from "path";

/**
 * TODO ISSUE @ create-react-app
 *
 * WARN BROKEN
 * Do *not* use global imports of `fs`, `path` etc.
 * that are not supported in the browser.
 *
 * We do not require these files in the CRA package,
 * but they still get imported
 * & react fails & gives tons of errors like
 *
 * `TypeError: Cannot read property 'native' of undefined`
 *
 * ---
 *
 * See also https://github.com/jprichardson/node-fs-extra/issues/743
 */

import { toJson } from "./toJson";

export const writeToSingleFile = async <T>(data: T, outputFilePath: string): Promise<T> => {
	const fs = await import("fs-extra");
	const path = await import("path");

	const dirPath: string = path.parse(outputFilePath).dir;
	await fs.ensureDir(dirPath);

	const jsonData: string = toJson(data);
	await fs.writeFile(outputFilePath, jsonData, { encoding: "utf-8" });

	return data;
};

// export const writeToSingleFileSync = <T>(data: T, outputFilePath: string): T => {
// 	const dirPath: string = path.parse(outputFilePath).dir;
// 	fs.ensureDirSync(dirPath);

// 	const jsonData: string = toJson(data);
// 	fs.writeFileSync(outputFilePath, jsonData, { encoding: "utf-8" });

// 	return data;
// };
