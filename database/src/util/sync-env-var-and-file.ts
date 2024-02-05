import fs from "fs-extra";
import { WriteFileOptions } from "fs";
import path from "path";

export type SyncEnvVarAndFileRet = {
	value: string | undefined;
	fileContent: string | undefined;
	envVarContent: string;
	hasEnvVar: boolean;
	hasFileNotEmpty: boolean;
	hasVarOrFile: boolean;
};
export async function syncEnvVarAndFile(envVarKey: string, filepath: string, writeFileOpts: WriteFileOptions = {}): Promise<SyncEnvVarAndFileRet> {
	const envVarContent: string = (process.env[envVarKey] || "").trim();
	const hasEnvVar: boolean = envVarContent !== "";

	const hasFile: boolean = await fs.pathExists(filepath);
	const fileContent: string | undefined = !hasFile ? "" : (await fs.readFile(filepath, { encoding: "utf-8" })).trim();
	const hasFileNotEmpty: boolean = hasFile && fileContent !== "";

	const hasVarOrFile: boolean = hasEnvVar || hasFileNotEmpty;

	if (hasEnvVar) {
		/** write to file */
		const dir = path.dirname(filepath);
		await fs.mkdirp(dir);
		await fs.promises.writeFile(filepath, process.env[envVarKey] + "\n", writeFileOpts);
	}

	const value: string | undefined = hasEnvVar
		? envVarContent
		: hasFileNotEmpty
			? fileContent
			: undefined;

	return {
		value,
		fileContent,
		envVarContent,
		hasEnvVar,
		hasFileNotEmpty,
		hasVarOrFile,
	} as const;
}
