// writeToSingleFile.ts

import fs from "fs-extra";
import path from "path";

import { toJson } from "./toJson";

export const writeToSingleFile = async <T>(data: T, outputFilePath: string): Promise<T> => {
	const dirPath: string = path.parse(outputFilePath).dir;
	await fs.ensureDir(dirPath);

	const jsonData: string = toJson(data);
	await fs.writeFile(outputFilePath, jsonData, { encoding: "utf-8" });

	return data;
};

export const writeToSingleFileSync = <T>(data: T, outputFilePath: string): T => {
	const dirPath: string = path.parse(outputFilePath).dir;
	fs.ensureDirSync(dirPath);

	const jsonData: string = toJson(data);
	fs.writeFileSync(outputFilePath, jsonData, { encoding: "utf-8" });

	return data;
};
