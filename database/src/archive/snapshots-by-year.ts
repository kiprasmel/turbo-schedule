import { getDatabaseSnapshotFiles } from "../get-db-snapshot-files";

import { getYearOfSnapshot } from "./Snapshot";

export type ArchiveSnapshotsByYear = Record<number, string[]>;

export async function getArchiveSnapshotsByYear(): Promise<ArchiveSnapshotsByYear> {
	const snapshots: string[] = await getDatabaseSnapshotFiles({ onlyMeaningful: true, filenamesInsteadOfPaths: true });
	const map: ArchiveSnapshotsByYearMap = await groupArchiveSnapshotsByYear(snapshots);
	return Object.fromEntries(map.entries());
}

export type ArchiveSnapshotsByYearMap = Map<number, string[]>;

export async function groupArchiveSnapshotsByYear(archiveSnapshots: string[]): Promise<ArchiveSnapshotsByYearMap> {
	const archiveSnapshotsByYear: ArchiveSnapshotsByYearMap = new Map();

	for (const snapshot of archiveSnapshots) {
		const year: number = getYearOfSnapshot(snapshot);

		if (Number.isNaN(year)) {
			const msg = `tried parsing year from archive snapshot "${snapshot}", got NaN.\n`;
			throw new Error(msg);
		}

		let snapshotsOfYear: string[] | undefined = archiveSnapshotsByYear.get(year);

		if (!snapshotsOfYear) {
			snapshotsOfYear = [snapshot];
			archiveSnapshotsByYear.set(year, snapshotsOfYear);
		} else {
			snapshotsOfYear.push(snapshot);
		}
	}

	return archiveSnapshotsByYear;
}
