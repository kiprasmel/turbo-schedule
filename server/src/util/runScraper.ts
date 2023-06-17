#!/usr/bin/env ts-node-dev

import fs from "fs";
import path from "path";
import cp, { ExecOptions } from "child_process";
import util from "util";
import os from "os";

import scraper, { wasScheduleUpdated } from "@turbo-schedule/scraper";
import { ScrapeInfo } from "@turbo-schedule/common";
import { databaseFileName, getDatabaseFilepath, initDb } from "@turbo-schedule/database";

import { scrapedDataDirPath } from "../config";

const execAsync = util.promisify(cp.exec);
const writeAsync = util.promisify(fs.writeFile);
const mkdirAsync = util.promisify(fs.mkdir);
const existsAsync = util.promisify(fs.exists);

export const runScraper = async (): Promise<void> => {
	const previousScrapeInfo: ScrapeInfo = await initDb(databaseFileName).then(x => x.get("scrapeInfo").value())

	const startDate: Date = new Date();

	console.log("\n~ Starting scraper:", startDate, "\n");

	const scrapeInfo: ScrapeInfo = await scraper(scrapedDataDirPath);

	const endDate: Date = new Date();

	const msDifference: number = endDate.getTime() - startDate.getTime();
	const secDifference: number = msDifference / 1000;

	console.log("\n~ Finished scraper.", endDate, "\n difference in secs: ", secDifference, "\n");

	await commitDatabaseDataIntoArchiveIfChanged(previousScrapeInfo, scrapeInfo);

	/**
	 * TODO
	 *
	 * Implement @ scraper?
	 *
	 * * check X oftenly if new stuff is available
	 * 		if yes,
	 * 			then get the new stuff,
	 * 			inform the client through sockets probably that we're updating (preferably),
	 * 			& return the new stuff
	 * 		if no, then get the old stuff
	 *
	 */
};

async function commitDatabaseDataIntoArchiveIfChanged(previousScrapeInfo: ScrapeInfo, scrapeInfo: ScrapeInfo): Promise<void> {
	const databaseHasChanged: boolean = previousScrapeInfo.pageVersionIdentifier !== scrapeInfo.pageVersionIdentifier;

	if (!process.env.ARCHIVE_DEPLOY_KEY) {
		if (databaseHasChanged) {
			console.warn(`database has new changes. We cannot commit nor push to the archive, because 'ARCHIVE_DEPLOY_KEY' not set/falsy.`);
		} else {
			console.warn(`even though database does NOT have new changes, we cannot pull/clone the archive, because 'ARCHIVE_DEPLOY_KEY' not set/falsy.`);
		}

		return;
	}

	/**
	 * prepare ssh deploy key
	 */
	const homedir: string = os.homedir();
	const sshdir: string = path.join(homedir, ".ssh")
	const sshFilepath: string = path.join(sshdir, "turbo-schedule-bot.rsa")
	await mkdirAsync(sshdir, { recursive: true });
	await writeAsync(sshFilepath, process.env.ARCHIVE_DEPLOY_KEY);

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

	await execInDataDir(`git config user.email ${process.env.ARCHIVE_GIT_EMAIL || "bot@tvarkarastis.com"}`);
	await execInDataDir(`git config user.name ${process.env.ARCHIVE_GIT_NAME || "Turbo Schedule BOT"}`);

	if (databaseHasChanged) {
		await execInDataDir(`git add "${newDbFilepath}"`);
		await execInDataDir(`git commit -m "add ${path.basename(newDbFilepath)}"`);
	}

	await execInDataDir(`git pull --rebase`);
	await execInDataDir(`git push origin ${process.env.ARCHIVE_GIT_BRANCH || "master"}`);

	return;
}

export const runScraperIfUpdatesAvailable = async (): Promise<void> => {
	const updatesAvailable: boolean = await wasScheduleUpdated();

	if (updatesAvailable) {
		/** TODO lockfile for scraper - see https://github.com/kiprasmel/turbo-schedule/issues/44 */
		await runScraper();
	}
};

if (!module.parent) {
	runScraper();
}
