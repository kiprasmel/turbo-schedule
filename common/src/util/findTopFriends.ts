#!/usr/bin/env ts-node-dev

import { Lesson } from "../model/Lesson";
import { Student } from "../model/Student";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const findTopCommonFriends = (lessons: Lesson[]) => {
	const friendMap = createFriendsMap(lessons);

	const friends = Object.entries(friendMap)
		.map(([friendName, theirFriends]) => ({
			rootName: friendName,
			totalCommonLessons: Object.values(theirFriends).reduce((acc, curr) => acc + curr.length, 0),
			friends: Object.entries(theirFriends)
				.map(([deepFriendName, commonLessons]) => ({
					name: deepFriendName,
					commonLessonsLen: commonLessons.length,
					commonLessons,
				}))
				.sort((A, B) => B.commonLessons.length - A.commonLessons.length),
		}))
		.sort((A, B) => B.totalCommonLessons - A.totalCommonLessons)
		.map((friend, nth, { length: totalLength }) => ({
			nth,
			totalLength,
			...friend,
		}));

	return friends;
};

export type StudentToStudentCommonLessonsMap = Record<Student["fullName"], Record<Student["fullName"], Lesson["id"][]>>;

export const createFriendsMap = (lessons: Lesson[]): StudentToStudentCommonLessonsMap => {
	const friendMap: StudentToStudentCommonLessonsMap = {};

	for (const lesson of lessons) {
		for (const A of lesson.students) {
			if (!friendMap[A]) {
				friendMap[A] = {};
			}

			for (const B of lesson.students) {
				if (A === B) {
					continue;
				}

				if (!friendMap[A][B]) {
					friendMap[A][B] = [];
				}

				if (!friendMap[A][B].includes(lesson.id)) {
					friendMap[A][B].push(lesson.id);
				}
			}
		}
	}

	return friendMap;
};

if (!module.parent) {
	const fs = require("fs");
	const path = require("path");

	const p = path.join(__dirname, "..", "..", "..", "database", "data", "latest.json");
	const f = fs.readFileSync(p, {
		encoding: "utf-8",
	});
	const { lessons } = JSON.parse(f);

	const friends = findTopCommonFriends(lessons);

	fs.writeFileSync("top-friends.json", JSON.stringify(friends, null, 2));
}
