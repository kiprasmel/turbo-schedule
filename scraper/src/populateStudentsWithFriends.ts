import { Student, Lesson, Friend } from "@turbo-schedule/common";

/**
 * TODO - same functionality as other populate method - make it generic.
 */
export const populateStudentWithFriends = (student: Student): Student => {
	/** `id` with how many times we encounter each other */
	const friendsMap: Map<Student["id"], number> = new Map();
	// const friendsMap: { [key: string]: number } = {};

	student.lessons.forEach((lesson: Lesson) => {
		lesson.students.forEach((friendId: Student["id"]) => {
			/**
			 * TODO track `empty` encounters separately
			 */
			if (friendId === student.id || lesson.isEmpty) {
				return;
			}

			let encounteredCount: number = friendsMap.get(friendId) ?? 0;
			// let encounteredCount: number = friendsMap[friendId] ?? 0;

			++encounteredCount;

			friendsMap.set(friendId, encounteredCount);
			// friendsMap[friendId] = encounteredCount;
		});
	});

	const friends: Friend[] = [];

	for (const [friendName, totalEncounters] of friendsMap.entries()) {
		// for (const [friendName, totalEncounters] of Object.entries(friendsMap)) {
		friends.push(new Friend({ text: friendName, totalEncounters: totalEncounters, isAFriendOf: student.id }));
	}

	/** TODO - is this even necessary? */
	friends.sort((a: Friend, b: Friend) => b.totalEncounters - a.totalEncounters);

	student.friends = friends;

	return student;
};

/** SOON */
// export const populateStudentsWithFriends = (students: Student[]): Student[] =>
// 	students
// 		.map((student) => populateStudentWithFriends(student))
// 		.sort((a: Student, b: Student) => b.friends[0].totalEncounters - a.friends[0].totalEncounters);
