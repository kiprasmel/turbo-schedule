import { Lesson } from "./Lesson";
import { getSpecificScheduleURI } from "./Schedule";

export interface Room {
	readonly id: string;

	readonly text: string;
	readonly originalHref: string;

	readonly originalScheduleURI: string;

	lessons?: Lesson[];
}

export const getDefaultRoom = (): Room => ({
	id: "",
	text: "",
	originalHref: "",
	originalScheduleURI: "",
});

export interface RoomInitData extends Partial<Room> {
	text: string;
	originalHref: string;
}

export const createRoom = (data: RoomInitData = { text: "", originalHref: "" }): Room => {
	const text = data.text.trim();
	const originalHref = data.originalHref.trim();
	const originalScheduleURI = getSpecificScheduleURI(originalHref.trim());

	const room: Room = {
		id: text /** TODO ID */,
		text,
		originalHref,
		originalScheduleURI,
	};

	return room;
};
