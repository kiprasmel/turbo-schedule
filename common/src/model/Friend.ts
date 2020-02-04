/* eslint-disable import/no-cycle */
import { Student } from "./Student";

/** TODO */
export class Friend {
	text: Student["text"] = "";
	isAFriendOf: Student["id"] = "";
	totalEncounters: number = 0;

	constructor(data?: Partial<Friend>) {
		Object.assign(this, data);
	}

	get id(): Student["id"] {
		return this.text;
	}
}
