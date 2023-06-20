import * as thread from "threads";

import { Participant, ParticipantLabel } from "@turbo-schedule/common";

import { getDatabaseSnapshotFiles } from "../get-db-snapshot-files";

import { GetParticipantsInSnapshot } from "./participants-in-snapshots-worker";
import { getYearOfSnapshot, ParticipantInSnapshot, Snapshot, SnapshotYear } from "./Snapshot";

export async function cacheGetArchiveParticipantsInSnapshots() {
	// TODO
}

export type ParticipantToSnapshotsObj = Record<Participant["text"], Snapshot[]>;
export type ParticipantLabelToTextToSnapshotObj = Record<ParticipantLabel, ParticipantToSnapshotsObj>;
export type ArchiveYearToParticipantLabelToTextToSnapshotObj = Record<SnapshotYear, ParticipantLabelToTextToSnapshotObj>;

export async function getArchivedParticipantsInSnapshots(): Promise<ArchiveYearToParticipantLabelToTextToSnapshotObj> {
	const snapshots: Snapshot[] = await getDatabaseSnapshotFiles({ onlyMeaningful: true })

	const map: ArchiveYearToParticipantLabelToTextToSnapshotObj = {};

	const addDataToMap = (snapshot: Snapshot) => (newData: ParticipantInSnapshot[]) => {
		const snapshotYear: SnapshotYear = getYearOfSnapshot(snapshot);

		if (!(snapshotYear in map)) {
			map[snapshotYear] = {
				class: {},
				student: {},
				teacher: {},
				room: {},
			};
		}

		for (const [text, label] of newData) {
			if (!map[snapshotYear][label][text]) {
				map[snapshotYear][label][text] = [snapshot];
			} else {
				map[snapshotYear][label][text].push(snapshot);
			}
		}
	}

	const threadpool = thread.Pool(() => thread.spawn<GetParticipantsInSnapshot>(new thread.Worker("./participants-in-snapshots-worker")));

	for (const snapshot of snapshots) {
		const addData = addDataToMap(snapshot);

		threadpool.queue((getParticipantsInSnapshot) => {
			const task = getParticipantsInSnapshot({ snapshot });
			task.then(addData);
			return task;
		});
	}

	await threadpool.completed();
	await threadpool.terminate();

	return map;
}
