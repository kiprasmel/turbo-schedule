import { Class, Participant, Room, Student, Teacher, parseParticipants } from "@turbo-schedule/common";
import { ParticipantLabelToTextToSnapshotObj } from "@turbo-schedule/database";

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
export function parseParticipantMixIntoGroups(participants: ParticipantMix): GroupedParticipants {
	const parsed: GroupedParticipants = Array.isArray(participants)
		? parseParticipants(participants)
		: ("student" in participants)
		? { students: Object.keys(participants.student), teachers: Object.keys(participants.teacher), rooms: Object.keys(participants.room), classes: Object.keys(participants.class) }
		: participants;

	return parsed;
}
