#!/usr/bin/env ts-node-dev

import fs from "fs";
import path from "path";
import cp, { ExecOptions } from "child_process";
import os from "os";
import util from "util";

import { ScrapeInfo, matchMatrix } from "@turbo-schedule/common";

import { getDatabaseFilepath } from "./config";
import { initDb } from "./initDb";
import { databaseSnapshotNameToFullFilepath } from "./paths";

export const execAsync = util.promisify(cp.exec);
export const writeAsync = util.promisify(fs.writeFile);
export const readAsync = util.promisify(fs.readFile);
export const mkdirAsync = util.promisify(fs.mkdir);
export const existsAsync = util.promisify(fs.exists);
export const rmdirAsync = util.promisify(fs.rmdir);
export const renameAsync = util.promisify(fs.rename);

const homedir: string = os.homedir();
const sshdir: string = path.join(homedir, ".ssh");
const sshFilepath: string = path.join(sshdir, "turbo-schedule-archive-deploy-bot");

export type CanCommitMeaningfulSnapshotsRet = {
	hasEnvVarNotEmpty: boolean;
	hasSSHFileNotEmpty: boolean;
	canCommit: boolean;
	sshFileNeedsWriteFromEnv: boolean;
};

export async function canCommitMeaningfulSnapshots(): Promise<CanCommitMeaningfulSnapshotsRet> {
	const envVarContent: string = process.env.ARCHIVE_DEPLOY_KEY?.trim() || "";
	const hasEnvVarNotEmpty: boolean = envVarContent !== "";

	const hasSSHFile: boolean = await existsAsync(sshFilepath);
	const sshFileContent: string | undefined = hasSSHFile ? (await readAsync(sshFilepath, { encoding: "utf-8" })).trim() : "";
	const hasSSHFileNotEmpty: boolean = hasSSHFile && sshFileContent !== "";

	const canCommit: boolean = hasEnvVarNotEmpty || hasSSHFileNotEmpty;

	const sshFileNeedsWriteFromEnv: boolean = !canCommit
		? false
		: matchMatrix([hasSSHFileNotEmpty, hasEnvVarNotEmpty], [
			true, true, true, // => true if different, otherwise won't matter. but can just always default to true.
			true, false, false, // does not have the ENV var, but already has the ssh file, thus do nothing.
			false, true, true, // does not have the ssh file, but has the env var, thus prepare the ssh deploy key.
			false, false, false, // eliminated because canCommit === false in this case.
		]);

	return {
		hasEnvVarNotEmpty,
		hasSSHFileNotEmpty,
		canCommit,
		sshFileNeedsWriteFromEnv,
	} as const;
}

export async function commitDatabaseDataIntoArchiveIfChanged(previousScrapeInfo: ScrapeInfo, scrapeInfo: ScrapeInfo): Promise<void> {
	const databaseHasChanged: boolean = previousScrapeInfo.pageVersionIdentifier !== scrapeInfo.pageVersionIdentifier;
	console.log({ databaseHasChanged });

	const canCommit = await canCommitMeaningfulSnapshots()

	if (!canCommit.canCommit) {
		if (databaseHasChanged) {
			console.warn(`database has new changes. We cannot commit nor push to the archive, because 'ARCHIVE_DEPLOY_KEY' not set/falsy.`);
		} else {
			console.warn(`even though database does NOT have new changes, we cannot pull/clone the archive, because 'ARCHIVE_DEPLOY_KEY' not set/falsy.`);
		}

		return;
	}

	if (canCommit.sshFileNeedsWriteFromEnv) {
		await mkdirAsync(sshdir, { recursive: true });

		// https://superuser.com/a/1565830/1012390
		await writeAsync(sshFilepath, process.env.ARCHIVE_DEPLOY_KEY + "\n", {
			mode: "600"
		});
	}

	/**
	 * add github.com to known_hosts.
	 * https://superuser.com/a/1111974/1012390
	 */
	await execAsync(`ssh-keyscan -t rsa -H github.com >> ~/.ssh/known_hosts`);

	const newDbFilepath: string = getDatabaseFilepath(scrapeInfo.timeStartISO);
	const dbDirPath: string = path.dirname(newDbFilepath);

	const execInDataDir = (cmd: string, extra: ExecOptions = {}) => {
		console.log({ cmd });

		return execAsync(cmd, {
			...extra,
			cwd: dbDirPath,
			env: {
				...extra["env"],
				/**
				 * https://superuser.com/a/912281/1012390
				 * other approaches, such as -c core.sshCommand, didn't work.
				 */
				GIT_SSH_COMMAND: `ssh -i "${sshFilepath}"` // GIT_SSH_COMMAND='ssh -i ~/.ssh/turbo-schedule-archive-deploy-bot'
			}
		});
	}

	const branch: string = process.env.ARCHIVE_GIT_BRANCH || "master";

	const hasGitDir: boolean = await existsAsync(path.join(dbDirPath, ".git"));
	if (!hasGitDir) {
		const repoURL: string = `git@github.com:kiprasmel/turbo-schedule-archive.git`;

		const tmpRepoDir = ".tmp-repo";
		const tmpRepoPath = path.join(dbDirPath, tmpRepoDir);
		await rmdirAsync(tmpRepoPath);

		await execInDataDir(`git clone ${repoURL} ${tmpRepoDir}`);
		await renameAsync(path.join(tmpRepoPath, ".git"), path.join(dbDirPath, ".git"));

		await execInDataDir(`git pull`);
		await execInDataDir(`git reset --hard origin/${branch}`);
	}

	await execInDataDir(`git config user.email "${process.env.ARCHIVE_GIT_EMAIL || "bot@tvarkarastis.com"}"`);
	await execInDataDir(`git config user.name "${process.env.ARCHIVE_GIT_NAME || "Turbo Schedule BOT"}"`);

	if (databaseHasChanged) {
		await execInDataDir(`git add "${newDbFilepath}"`);
		await execInDataDir(`git commit -m "add ${path.basename(newDbFilepath)}"`);
	}

	await execInDataDir(`git pull --rebase`);
	await execInDataDir(`git push origin "${branch}"`);

	return;
}

export const CLI_USAGE = `\
Usage: ./commit-database-data-into-archive-if-changed <old-file.json> <new-file.json>

`

export async function commit_database_data_into_archive_if_changed_CLI(argv: string[] = process.argv.slice(2)) {
	if (argv.length < 2) {
		process.stderr.write(CLI_USAGE)
		process.exit(1)
	}

	let [oldFile, newFile] = argv

	if (!fs.existsSync(oldFile)) {
		oldFile = databaseSnapshotNameToFullFilepath(oldFile)

		if (!fs.existsSync(oldFile)) {
			process.stderr.write("\n" + "old file does not exist." + "\n\n")
			return 1
		}
	}
	if (!fs.existsSync(newFile)) {
		newFile = databaseSnapshotNameToFullFilepath(newFile)

		if (!fs.existsSync(newFile)) {
			process.stderr.write("\n" + "new file does not exist." + "\n\n")
			return 1
		}
	}

	console.log({ oldFile, newFile });

	const oldInfo: ScrapeInfo = await initDb(oldFile).then(x => x.get("scrapeInfo").value())
	const newInfo: ScrapeInfo = await initDb(newFile).then(x => x.get("scrapeInfo").value())

	console.log({ oldInfo, newInfo });

	await commitDatabaseDataIntoArchiveIfChanged(oldInfo, newInfo)

	return 0
}

if (!module.parent) {
	commit_database_data_into_archive_if_changed_CLI()
		.then(x => {
			process.exit(x)
		})
		.catch(e => {
			throw e
		})
}
