import { Participant, ParticipantLabel } from "@turbo-schedule/common";

export type Snapshot = string;
export type SnapshotYear = number;
export type SchoolYear = `${number}-${number}`;
export type ParticipantInSnapshot = [Participant["text"], ParticipantLabel];

/**
 * 0 - January
 * 11 - December
 */
export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const MONTH_OF_NEW_SCHOOL_YEAR = 7 as const; // satisfies Month;

export const inferSchoolYear = (snapshot: Snapshot): SchoolYear => {
	const isNewYear: boolean = getMonthOfSnapshot(snapshot) >= MONTH_OF_NEW_SCHOOL_YEAR;

	const snapshotYear: SnapshotYear = getYearOfSnapshot(snapshot);

	return isNewYear ? `${snapshotYear}-${snapshotYear + 1}` : `${snapshotYear - 1}-${snapshotYear}`;
}

export const getYearOfSnapshot = (snapshot: Snapshot): SnapshotYear => Number(snapshot.split("-")[0])
export const getMonthOfSnapshot = (snapshot: Snapshot): Month => (Number(snapshot.split("-")[1]) - 1) as Month;

export const snapshot2pretty = (snapshot: string): string => snapshot.replace(/[-_]/g, " ");

/**
 * for deep grouping, especially when used inside UI
 */
export type ParticipantToSnapshotsObj = Record<Participant["text"], Snapshot[]>;
export type ParticipantLabelToTextToSnapshotObj = Record<ParticipantLabel, ParticipantToSnapshotsObj>;
export type ArchiveYearToParticipantLabelToTextToSnapshotObj = Record<SnapshotYear, ParticipantLabelToTextToSnapshotObj>;
