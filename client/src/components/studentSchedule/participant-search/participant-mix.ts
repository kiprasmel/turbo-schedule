import { Class, Participant, ParticipantLabel, Room, Student, Teacher, parseParticipants } from "@turbo-schedule/common";
import { ParticipantLabelToTextToSnapshotObj } from "@turbo-schedule/database";

const databaseFileName = "latest.json"; // TODO import from database. currently can't because compilation errors..

export type GroupedParticipants = {
	students: Student["text"][];
	teachers: Teacher["text"][];
	rooms: Room["text"][];
	classes: Class["text"][];
};

export type ParticipantMix = Participant[] | GroupedParticipants | ParticipantLabelToTextToSnapshotObj;

export type ParseParticipantMixOpts = {
	searchString?: string;
}
export function parseParticipantMixIntoGroups(participants: ParticipantMix): ParticipantLabelToTextToSnapshotObj {
	const parsed: ParticipantLabelToTextToSnapshotObj = Array.isArray(participants)
		? Object.fromEntries(Object.entries(parseParticipants(participants)).filter(x => x[0] !== "allParticipants").map(([label, texts]) => [labelMultipleToSingleMap[label], Object.fromEntries(texts.map(t => [t, databaseFileName]))])) as unknown as ParticipantLabelToTextToSnapshotObj // TODO TS
		: ("student" in participants)
		// ? { students: participants.student, teachers: participants.teacher, rooms: participants.room, classes: participants.class }
		? participants
		: Object.fromEntries(Object.entries(participants).map(([label, texts]) => [labelMultipleToSingleMap[label], Object.fromEntries(texts.map(t => [t, databaseFileName]))]))

	return parsed;
}

export const labelMultipleToSingleMap: Record<keyof GroupedParticipants, ParticipantLabel> = {
	classes: "class",
	students: "student",
	teachers: "teacher",
	rooms: "room",
};
