import { expose } from "threads/worker";

import { DbSchema, getDatabaseFilepath } from "../config";
import { readRawDb } from "../read-raw-db";

import { ParticipantInSnapshot } from "./Snapshot";

export type GetParticipantsInSnapshotOpts = {
	snapshot: string;
}

export type GetParticipantsInSnapshot = typeof getParticipantsInSnapshot;

expose(async (opts: GetParticipantsInSnapshotOpts) => getParticipantsInSnapshot(opts));
export function getParticipantsInSnapshot({
	snapshot,
}: GetParticipantsInSnapshotOpts): ParticipantInSnapshot[] {
	const snapshotPath: string = getDatabaseFilepath(snapshot);
	const db: DbSchema | null = readRawDb(snapshotPath);

	if (!db) {
		return [];
	}

	if (!("participants" in db)) {
		// OLD FORMAT
		return [];
	}

	return db.participants.map(x => [x.text, x.labels[0]]);
}
