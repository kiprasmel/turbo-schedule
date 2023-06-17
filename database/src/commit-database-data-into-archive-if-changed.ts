import fs from "fs";
import path from "path";
import cp, { ExecOptions } from "child_process";
import os from "os";
import util from "util";
import assert from "assert";

import { ScrapeInfo } from "@turbo-schedule/common";

import { getDatabaseFilepath } from "./config";

export const execAsync = util.promisify(cp.exec);
export const writeAsync = util.promisify(fs.writeFile);
export const readAsync = util.promisify(fs.readFile);
export const mkdirAsync = util.promisify(fs.mkdir);
export const existsAsync = util.promisify(fs.exists);

const homedir: string = os.homedir();
const sshdir: string = path.join(homedir, ".ssh");
const sshFilepath: string = path.join(sshdir, "turbo-schedule-archive-deploy-bot");


export type CanCommitMeaningfulSnapshotsRet = {
	hasEnvVar: boolean;
	hasSSHFile: boolean;
	canCommit: boolean;
	sshFileContentSameAsEnvVar: boolean;
};

export async function canCommitMeaningfulSnapshots(): Promise<CanCommitMeaningfulSnapshotsRet> {
	const hasEnvVar: boolean = !!process.env.ARCHIVE_DEPLOY_KEY;
	const hasSSHFile: boolean = await existsAsync(sshFilepath);
	const canCommit: boolean = hasEnvVar || hasSSHFile;

	const sshFileContent: string = hasSSHFile ? (await readAsync(sshFilepath, { encoding: "utf-8" })).trim() : "";
	const envVarContent: string = process.env.ARCHIVE_DEPLOY_KEY?.trim() || "";
	const sshFileContentSameAsEnvVar: boolean = sshFileContent === envVarContent;

	return {
		hasEnvVar,
		hasSSHFile,
		canCommit,
		sshFileContentSameAsEnvVar,
	} as const;
}

export async function commitDatabaseDataIntoArchiveIfChanged(previousScrapeInfo: ScrapeInfo, scrapeInfo: ScrapeInfo): Promise<void> {
	const databaseHasChanged: boolean = previousScrapeInfo.pageVersionIdentifier !== scrapeInfo.pageVersionIdentifier;

	const canCommit = await canCommitMeaningfulSnapshots()

	if (!canCommit.canCommit) {
		if (databaseHasChanged) {
			console.warn(`database has new changes. We cannot commit nor push to the archive, because 'ARCHIVE_DEPLOY_KEY' not set/falsy.`);
		} else {
			console.warn(`even though database does NOT have new changes, we cannot pull/clone the archive, because 'ARCHIVE_DEPLOY_KEY' not set/falsy.`);
		}

		return;
	}

	if (!canCommit.sshFileContentSameAsEnvVar) {
		if (canCommit.hasSSHFile) {
			assert.deepStrictEqual(canCommit.hasEnvVar, false);

			/**
			 * does not have the ENV var, but already has the ssh file,
			 * thus do nothing.
			 */
		} else {
			assert.deepStrictEqual(canCommit.hasEnvVar, true);

			/**
			 * does not have the ssh file, but has the env var,
			 * thus prepare the ssh deploy key.
			 */

			await mkdirAsync(sshdir, { recursive: true });

			// https://superuser.com/a/1565830/1012390
			await writeAsync(sshFilepath, process.env.ARCHIVE_DEPLOY_KEY + "\n", {
				mode: "600"
			});
		}
	}

	/**
	 * add github.com to known_hosts.
	 * https://superuser.com/a/1111974/1012390
	 */
	await execAsync(`ssh-keyscan -t rsa -H github.com >> ~/.ssh/known_hosts`);

	const newDbFilepath: string = getDatabaseFilepath(scrapeInfo.timeStartISO);
	const dbDirPath: string = path.dirname(newDbFilepath);

	const execInDataDir = (cmd: string, extra: ExecOptions = {}) => execAsync(cmd, {
		...extra,
		cwd: dbDirPath,
		env: {
			...extra["env"],
			/**
			 * https://superuser.com/a/912281/1012390
			 * other approaches, such as -c core.sshCommand, didn't work.
			 */
			GIT_SSH_COMMAND: `ssh -i "${sshFilepath}"`
		}
	});

	const hasGitDir: boolean = await existsAsync(path.join(dbDirPath, ".git"));
	if (!hasGitDir) {
		const repoURL: string = `git@github.com:kiprasmel/turbo-schedule-archive.git`;

		// https://stackoverflow.com/a/28180781/9285308
		await execInDataDir(`git clone --bare ${repoURL} .git`);
		await execInDataDir(`git config --unset core.bare`);
	}

	await execInDataDir(`git config user.email "${process.env.ARCHIVE_GIT_EMAIL || "bot@tvarkarastis.com"}"`);
	await execInDataDir(`git config user.name "${process.env.ARCHIVE_GIT_NAME || "Turbo Schedule BOT"}"`);

	if (databaseHasChanged) {
		await execInDataDir(`git add "${newDbFilepath}"`);
		await execInDataDir(`git commit -m "add ${path.basename(newDbFilepath)}"`);
	}

	await execInDataDir(`git pull --rebase`);
	await execInDataDir(`git push origin "${process.env.ARCHIVE_GIT_BRANCH || "master"}"`);

	return;
}
