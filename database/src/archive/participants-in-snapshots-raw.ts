import * as thread from "threads";

import { Participant, ParticipantLabel } from "@turbo-schedule/common";

import { getDatabaseSnapshotFiles } from "../get-db-snapshot-files";

import { GetParticipantsInSnapshot } from "./participants-in-snapshots-worker";
import { ParticipantInSnapshot, Snapshot, SchoolYear, SnapshotYear, getYearOfSnapshot, inferSchoolYear  } from "./Snapshot";

/**
 * TODO recursive grouping
 *
 * e.g. `?group=year,label,text`
 */
export type ParticipantInSnapshotItem = {
	snapshot: Snapshot;
	snapshotYear: SnapshotYear;
	schoolYear: SchoolYear;
	text: Participant["text"];
	label: ParticipantLabel;
}

export async function cacheGetParticipantsInSnapshots() {
	// TODO
}

export async function getParticipantsInSnapshots(): Promise<ParticipantInSnapshotItem[]> {
	const snapshots: Snapshot[] = await getDatabaseSnapshotFiles({ onlyMeaningful: true, filenamesInsteadOfPaths: true });

	const arr: ParticipantInSnapshotItem[] = []

	const addData = (snapshot: Snapshot) => (newData: ParticipantInSnapshot[]) => {
		const snapshotYear: SnapshotYear = getYearOfSnapshot(snapshot);

		for (const [text, label] of newData) {
			arr.push({
				text,
				label,
				snapshot,
				snapshotYear,
				schoolYear: inferSchoolYear(snapshot),
			});
		}
	}

	const threadpool = thread.Pool(() => thread.spawn<GetParticipantsInSnapshot>(new thread.Worker("./participants-in-snapshots-worker")));

	for (const snapshot of snapshots) {
		const adder = addData(snapshot);

		threadpool.queue((getParticipantsInSnapshot) => {
			const task = getParticipantsInSnapshot({ snapshot });
			task.then(adder);
			return task;
		});
	}

	await threadpool.completed();
	await threadpool.terminate();

	return arr;
}
