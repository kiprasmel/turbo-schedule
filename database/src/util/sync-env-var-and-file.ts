import fs from "fs-extra";
import { WriteFileOptions } from "fs";
import path from "path";

import { matchMatrix } from "@turbo-schedule/common";

export type SyncEnvVarAndFileRet = {
	value: string | undefined;
	fileContent: string | undefined;
	envVarContent: string;
	hasEnvVarNotEmpty: boolean;
	hasFileNotEmpty: boolean;
	hasEitherVarOrFile: boolean;
	fileNeedsWriteFromEnv: boolean;
};
export async function syncEnvVarAndFile(envVarKey: string, filepath: string, writeFileOpts: WriteFileOptions = {}): Promise<SyncEnvVarAndFileRet> {
	const envVarContent: string = (process.env[envVarKey] || "").trim();
	const hasEnvVarNotEmpty: boolean = envVarContent !== "";

	const hasFile: boolean = await fs.pathExists(filepath);
	const fileContent: string | undefined = !hasFile ? "" : (await fs.readFile(filepath, { encoding: "utf-8" })).trim();
	const hasFileNotEmpty: boolean = hasFile && fileContent !== "";

	const hasEitherVarOrFile: boolean = hasEnvVarNotEmpty || hasFileNotEmpty;

	const fileNeedsWriteFromEnv: boolean = !hasEitherVarOrFile
		? false
		: matchMatrix([hasEnvVarNotEmpty, hasFileNotEmpty], [
			true, true, envVarContent !== fileContent, // => true if different, otherwise won't matter.
			true, false, true, // does not have file, but has the env var, thus needs write.
			false, true, false, // does not have the ENV var, but already has file, thus do nothing.
			false, false, false, // has neither so no.
		]);

	if (fileNeedsWriteFromEnv) {
		const dir = path.dirname(filepath);
		await fs.mkdirp(dir);
		await fs.promises.writeFile(filepath, process.env[envVarKey] + "\n", writeFileOpts);
	}

	const value: string | undefined = hasEnvVarNotEmpty
		? envVarContent
		: hasFileNotEmpty
			? fileContent
			: undefined;

	return {
		value,
		fileContent,
		envVarContent,
		hasEnvVarNotEmpty,
		hasFileNotEmpty,
		hasEitherVarOrFile,
		fileNeedsWriteFromEnv,
	} as const;
}
