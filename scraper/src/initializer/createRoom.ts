import {
	ParticipantInitData, //
	getDefaultParticipant,
	Room,
	getSpecificScheduleURI,
} from "@turbo-schedule/common";

export const createRoom = (data: ParticipantInitData = getDefaultParticipant()): Room => {
	const text = data.text.trim();
	const originalHref = data.originalHref.trim();
	const originalScheduleURI = getSpecificScheduleURI(originalHref.trim());

	const room: Room = {
		id: text /** TODO ID */,

		text,
		originalHref,
		labels: data.labels,

		originalScheduleURI,
	};

	return room;
};
