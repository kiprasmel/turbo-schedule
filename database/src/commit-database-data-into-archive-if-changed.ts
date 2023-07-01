import fs from "fs";
import path from "path";
import cp, { ExecOptions } from "child_process";
import os from "os";
import util from "util";

import { ScrapeInfo } from "@turbo-schedule/common";

import { getDatabaseFilepath } from "./config";

export const execAsync = util.promisify(cp.exec);
export const writeAsync = util.promisify(fs.writeFile);
export const readAsync = util.promisify(fs.readFile);
export const mkdirAsync = util.promisify(fs.mkdir);
export const existsAsync = util.promisify(fs.exists);
export const rmdirAsync = util.promisify(fs.rmdir);
export const renameAsync = util.promisify(fs.rename);

const homedir: string = os.homedir();
const sshdir: string = path.join(homedir, ".ssh");
const sshFilepath: string = path.join(sshdir, "turbo-schedule-archive-deploy");

export type CanCommitMeaningfulSnapshotsRet = {
	hasEnvVar: boolean;
	hasSSHFileNotEmpty: boolean;
	canCommit: boolean;
	repoDeployKey: string | null;
};

export async function hasDeployKeyEnvOrFile(): Promise<CanCommitMeaningfulSnapshotsRet> {
	const envVarContent: string = (process.env.ARCHIVE_DEPLOY_KEY || "").trim();
	const hasEnvVar: boolean = !!envVarContent;

	const hasSSHFile: boolean = await existsAsync(sshFilepath);
	const sshFileContent: string | undefined = hasSSHFile ? (await readAsync(sshFilepath, { encoding: "utf-8" })).trim() : "";
	const hasSSHFileNotEmpty: boolean = hasSSHFile && sshFileContent !== "";

	const canCommit: boolean = hasEnvVar || hasSSHFileNotEmpty;

	const repoDeployKey = hasEnvVar
		? envVarContent //
		: hasSSHFileNotEmpty
			? sshFileContent
			: null;

	if (hasEnvVar) {
		await writeSSHKey(envVarContent);
	}

	return {
		hasEnvVar,
		hasSSHFileNotEmpty,
		canCommit,
		repoDeployKey,
	} as const;
}

async function writeSSHKey(repoDeployKey: string): Promise<void> {
	await mkdirAsync(sshdir, { recursive: true });
	await writeAsync(sshFilepath, repoDeployKey + "\n", {
		mode: "600"
	});
}

export async function commitDatabaseDataIntoArchiveIfChanged(previousScrapeInfo: ScrapeInfo, scrapeInfo: ScrapeInfo): Promise<void> {
	const databaseHasChanged: boolean = previousScrapeInfo.pageVersionIdentifier !== scrapeInfo.pageVersionIdentifier;

	const newDbFilepath: string = getDatabaseFilepath(scrapeInfo.timeStartISO);
	const dbDirPath: string = path.dirname(newDbFilepath);

	const hasGitDir: boolean = await existsAsync(path.join(dbDirPath, ".git"));
	const repoDeployKey = (await hasDeployKeyEnvOrFile()).repoDeployKey || "";
	const repoURL = process.env.ARCHIVE_GIT_REMOTE_URL || "";

	if (!hasGitDir) {
		const canCreateGitDir: boolean = !!repoURL && !!repoDeployKey;

		if (!canCreateGitDir) {
			const unserVarInfo = `at least one of 'ARCHIVE_DEPLOY_KEY', 'ARCHIVE_GIT_REMOTE_URL' not set`;

			if (databaseHasChanged) {
				console.warn(`database has new changes. We cannot commit nor push to the archive, because ${unserVarInfo}.`);
			} else {
				console.warn(`even though database does NOT have new changes, we cannot pull/clone the archive, because ${unserVarInfo}.`);
			}

			return;
		}
	}

	/**
	 * now either already has git dir,
	 * or has everything (repo url + repo deploy key) to set it up.
	 */

	const gitSSHCommand: string = !repoDeployKey ? "" : `ssh -i "${sshFilepath}`;

	const execInDataDir = (cmd: string, extra: ExecOptions = {}) => execAsync(cmd, {
		...extra,
		cwd: dbDirPath,
		env: {
			...extra["env"],
			...(!repoDeployKey ? {} : { GIT_SSH_COMMAND: gitSSHCommand }),
		}
	});

	if (!!repoURL && repoURL.includes("github.com")) {
		await execAsync(`ssh-keyscan -t rsa -H github.com >> ~/.ssh/known_hosts`);
	}

	if (!hasGitDir) {
		const tmpRepoDir = ".tmp-repo";
		const tmpRepoPath = path.join(dbDirPath, tmpRepoDir);
		await rmdirAsync(tmpRepoPath);

		await execInDataDir(`git clone ${repoURL} ${tmpRepoDir}`);
		await renameAsync(path.join(tmpRepoPath, ".git"), path.join(dbDirPath, ".git"));
	}

	await execInDataDir(`git config user.email "${process.env.ARCHIVE_GIT_EMAIL || "bot@tvarkarastis.com"}"`);
	await execInDataDir(`git config user.name "${process.env.ARCHIVE_GIT_NAME || "Turbo Schedule BOT"}"`);

	if (databaseHasChanged) {
		await execInDataDir(`git add "${newDbFilepath}"`);
		await execInDataDir(`git commit -m "add ${path.basename(newDbFilepath)}"`);
	}

	const branch: string = process.env.ARCHIVE_GIT_BRANCH || "master";

	await execInDataDir(`git pull --rebase`);
	await execInDataDir(`git push origin "${branch}"`);

	return;
}