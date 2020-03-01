import { StudentWithNonUniqueLessons, NonUniqueLesson, Lesson, toJson } from "@turbo-schedule/common";

import fs from "fs-extra";
import path from "path";

/**
 * loop through all students & all their lessons (O(n*m)),
 * store the lessons in a map by their non-unique `id`,
 * making it unique,
 * and add students' `id`s to the unique lessons
 * if they have that lesson.
 *
 *
 * before:
 *
 * ```json
 * students: [
 *   { id: "Alice", lessons: [ { id: "Maths" }, { id: "Physics" } ] },
 *   { id: "Bob"  , lessons: [ { id: "Maths" }, { id: "Dances"  } ] }
 * ]
 * ```
 *
 * after:
 *
 * ```json
 * lessons: [
 *   { id: "Maths"  , studentsId: ["Alice", "Bob"] },
 *   { id: "Physics", studentsId: ["Alice"       ] },
 *   { id: "Dances" , studentsId: [         "Bob"] }
 * ]
 * ```
 *
 * TODO experimenting with chaining `.then`
 *
 * TODO should we have an async version?
 * I'd also like to move the `writeToFile` functionality
 * into the `Lesson` itself, but it won't be sync,
 * because we need async imports, just like in Student.
 *
 */
export const extractUniqueLessonsSync = (
	students: Array<StudentWithNonUniqueLessons>,
	fileOutputPath?: string
): Lesson[] => {
	const uniqueLessonsMap: Map<Lesson["id"], Lesson> = new Map();

	for (const { id: studentId, lessons: nonUniqueLessons } of students) {
		if (!studentId || !nonUniqueLessons || !nonUniqueLessons.length) {
			continue;
		}

		nonUniqueLessons.forEach((nonUniqueLesson: NonUniqueLesson) => {
			const uniqueLesson: Lesson = uniqueLessonsMap.get(nonUniqueLesson.id) || new Lesson(nonUniqueLesson);

			uniqueLesson.studentsId.push(studentId);

			uniqueLessonsMap.set(uniqueLesson.id, uniqueLesson);
		});
	}

	let uniqueLessons: Lesson[] = [...uniqueLessonsMap.values()];

	uniqueLessons = Lesson.sortArray(uniqueLessons);

	if (fileOutputPath) {
		fs.ensureDir(path.parse(fileOutputPath).dir);
		fs.writeFileSync(fileOutputPath, toJson(uniqueLessons), { encoding: "utf-8" });
	}

	return uniqueLessons;
};
