import {
	Participant,
	ParticipantLabel,
	ParticipantInitData,
	Class,
	Teacher,
	Room,
	StudentFromList,
} from "@turbo-schedule/common";

export type Initializer<T extends Participant = Participant> = (initData: ParticipantInitData) => T;

export interface ParticipantCollector<T extends Participant = Participant> {
	from: string | undefined;
	to: string | undefined;
	labels: ParticipantLabel[];
	initializer: Initializer<T>;
}

/** typescrit pls fix */
export type OrderedCollectorsOfParticipants = [
	ParticipantCollector<Class>,
	ParticipantCollector<StudentFromList>,
	ParticipantCollector<Teacher>,
	ParticipantCollector<Room>
];

/** MUST follow the same order as `OrderedCollectorsOfParticipants */
export type OrderedParticipants2D = [Class[], StudentFromList[], Teacher[], Room[]];
