#!/usr/bin/env node

import fs from "fs"
import path from "path"
import cp from "child_process"

import { BuildInfo } from "@turbo-schedule/common"

export const BUILD_INFO_STORAGE_FILEPATH = path.join(__dirname, "..", "..", ".." /** project root */, "build-info.json")
export const TURBO_SCHEDULE_REPO_URL = `https://github.com/kiprasmel/turbo-schedule`

export const getRepoCommitURL = (commit: string): string => `${TURBO_SCHEDULE_REPO_URL}/commit/${commit}`
export const getRepoBranchURL = (branch: string): string => `${TURBO_SCHEDULE_REPO_URL}/tree/${branch}`

/**
 * should be used to store once built,
 * and then be done with it.
 */
export function inferBuildInfo(): BuildInfo {
	const e = (cmd: string) => cp.execSync(cmd, { encoding: "utf-8" }).trim()

	const commitFull = e(`git rev-parse HEAD`)
	const branch = e(`git branch --show-current`)

	return {
		commitFull,
		commitShort: e(`git log -1 --pretty="format:%h"`),
		commitURL: getRepoCommitURL(commitFull),
		isCommitDirty: e(`git status -s`) === "",
		branch,
		branchURL: getRepoBranchURL(branch),
		dateISO: new Date().toISOString(),
	}
}

export function storeBuildInfo(buildInfo: BuildInfo = inferBuildInfo()) {
	const buildInfoFileContent = JSON.stringify(buildInfo, null, 4)
	fs.writeFileSync(BUILD_INFO_STORAGE_FILEPATH, buildInfoFileContent, { encoding: "utf-8" })
	return buildInfo
}

export function getStoredBuildInfo() {
	const exists = fs.existsSync(BUILD_INFO_STORAGE_FILEPATH)

	if (!exists) {
		const msg = `stored build info was requested, but storage filepath did not exist.`
		throw new Error(msg)
	}

	const buildInfoFileContent = fs.readFileSync(BUILD_INFO_STORAGE_FILEPATH, { encoding: "utf-8" }).trim()

	if (!buildInfoFileContent) {
		const msg = `stored build info file existed, but contents are empty.`
		throw new Error(msg)
	}

	return JSON.parse(buildInfoFileContent)
}

function build_info_cli(argv = process.argv.slice(2)) {
	const cmds = ["store", "read"]

	if (argv.length === 0 || argv.length > 1 || !cmds.includes(argv[0])) {
		const msg = `usage: ./build-info store|read`
		throw new Error(msg)
	}

	const cmd = argv[0]

	if (cmd == "store") {
		const buildInfo = storeBuildInfo()
		console.log(buildInfo);
	} else if (cmd === "read") {
		const buildInfo = getStoredBuildInfo()
		console.log(buildInfo);
	} else {
		const msg = `invalid cmd "${cmd}".`
		throw new Error(msg)
	}
}

if (!module.parent) {
	build_info_cli()
}
