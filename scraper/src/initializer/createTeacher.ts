import { ParticipantInitData, getDefaultParticipant, Teacher, getSpecificScheduleURI } from "@turbo-schedule/common";

export const createTeacher = (data: ParticipantInitData = getDefaultParticipant()): Teacher => {
	const text = data.text.trim();
	const originalHref = data.originalHref.trim();
	const originalScheduleURI = getSpecificScheduleURI(originalHref.trim());

	const splitText = text.split(" ");
	const firstName = splitText.slice(-1).join(" ");
	const lastName = splitText.slice(0, -1).join(" ");
	const fullName = text;

	const handle = `${firstName}-${lastName}`;

	const teacher: Teacher = {
		id: text /** TODO ID */,
		handle,

		text,
		originalHref,
		labels: data.labels,

		originalScheduleURI,

		firstName,
		lastName,
		fullName,
	};

	return teacher;
};
