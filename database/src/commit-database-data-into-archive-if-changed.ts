#!/usr/bin/env ts-node-dev

import fs from "fs-extra";
import path from "path";
import cp, { ExecOptions } from "child_process";
import os from "os";
import util from "util";

import { ScrapeInfo } from "@turbo-schedule/common";

import { getDatabaseFilepath } from "./config";
import { initDb } from "./initDb";
import { databaseSnapshotNameToFullFilepath } from "./paths";
import { syncEnvVarAndFile } from "./util/sync-env-var-and-file";

export const execAsync = util.promisify(cp.exec);

const DEPLOY_KEY_FILEPATH: string = path.join(os.homedir(), ".ssh", "turbo-schedule-archive-deploy");

export const canCommitMeaningfulSnapshots = () => syncEnvVarAndFile("ARCHIVE_DEPLOY_KEY", DEPLOY_KEY_FILEPATH, { mode: "600" })

export async function commitDatabaseDataIntoArchiveIfChanged(previousScrapeInfo: ScrapeInfo, scrapeInfo: ScrapeInfo): Promise<void> {
	const databaseHasChanged: boolean = previousScrapeInfo.pageVersionIdentifier !== scrapeInfo.pageVersionIdentifier;
	console.log({ databaseHasChanged });

	const newDbFilepath: string = getDatabaseFilepath(scrapeInfo.timeStartISO);
	const dbDirPath: string = path.dirname(newDbFilepath);

	const hasGitDir: boolean = await fs.pathExists(path.join(dbDirPath, ".git"));
	const repoDeployKey = (await canCommitMeaningfulSnapshots()).value || "";
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

	const gitSSHCommand: string = !repoDeployKey ? "" : `ssh -i "${DEPLOY_KEY_FILEPATH}`;

	const execInDataDir = (cmd: string, extra: ExecOptions = {}) => {
		console.log({ cmd });

		return execAsync(cmd, {
			...extra,
			cwd: dbDirPath,
			env: {
				...extra["env"],
				...(!repoDeployKey ? {} : { GIT_SSH_COMMAND: gitSSHCommand }),
			}
		});
	}

	if (!!repoURL && repoURL.includes("github.com")) {
		await execAsync(`ssh-keyscan -t rsa -H github.com >> ~/.ssh/known_hosts`);
	}

	if (!hasGitDir) {
		const tmpRepoDir = ".tmp-repo";
		const tmpRepoPath = path.join(dbDirPath, tmpRepoDir);
		await fs.rmdir(tmpRepoPath);

		await execInDataDir(`git clone ${repoURL} ${tmpRepoDir}`);
		await fs.rename(path.join(tmpRepoPath, ".git"), path.join(dbDirPath, ".git"));
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
