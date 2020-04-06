// export enum ChangeType {
// 	// root = "root",
// 	trash = "trash",
// 	teacher = "teacher",
// 	change = "change",
// 	class = "class",
// 	unknown = "unknown",
// }

export interface Change {
	dayIndex: number;
	timeIndex: number;
	// teacher: string;
	parent: string /** could be a teacher, or a class (atm) */;
	text: string;
	// type: ChangeType;
	// belongsTo: ChangeType;
	// impacts: Change[];
	isUnknown: boolean;
}
