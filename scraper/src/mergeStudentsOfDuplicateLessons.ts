import { Lesson, Student, Teacher, Room } from "@turbo-schedule/common";

/**
 *
 * TODO update functionality & rename to `mergeDuplicateLessons`
 * (merge everything that's needed)
 * See https://github.com/sarpik/turbo-schedule/issues/57
 *
 * loop through all lessons,
 * (each containing only one student (or more, if you're merging more than once))
 * store the lessons in a map by their non-unique `id`,
 * making it unique,
 * and add students' `id`s to the unique lessons
 * if they have that lesson.
 *
 *
 * before:
 *
 * ```json
 * lessons: [
 *   { id: "Physics", students: [ "Alice" ] },
 *   { id: "Maths"  , students: [ "Alice" ] },
 *   { id: "Maths",   students: [ "Bob"   ] },
 *   { id: "Dances" , students: [ "Bob"   ] }
 * ]
 * ```
 *
 * after:
 *
 * ```json
 * lessons: [
 *   { id: "Maths"  , students: ["Alice", "Bob"] },
 *   { id: "Physics", students: ["Alice"       ] },
 *   { id: "Dances" , students: [         "Bob"] }
 * ]
 * ```
 *
 * --- the successor of `extractUniqueLessons` ---
 *
 */
export const mergeStudentsOfDuplicateLessons = (duplicateLessonsEachWithSingleStudent: Lesson[]): Lesson[] => {
	const uniqueLessonsMap: Map<Lesson["id"], Lesson> = new Map();

	duplicateLessonsEachWithSingleStudent.forEach((nonUniqueLesson: Lesson) => {
		let uniqueLesson: Lesson | undefined = uniqueLessonsMap.get(nonUniqueLesson.id);

		if (!uniqueLesson) {
			uniqueLesson = nonUniqueLesson;
		} else {
			const mergedStudentsWithPossibleDuplicates: Student["text"][] = [
				...uniqueLesson.students,
				...nonUniqueLesson.students,
			];

			/**
			 * we have to do this mehhy looking stuff
			 * because the `teacher` & `room` fields inside `lesson`
			 * are singular, and both contain only a single string with 1 or more teachers,
			 * separated by `,`
			 *
			 * We'll later fix this this - see https://github.com/sarpik/turbo-schedule/issues/57
			 */

			const mergedTeachersWithPosDups: Teacher["text"][] = [
				...uniqueLesson.teacher.split(",").map((t) => t.trim()),
				...nonUniqueLesson.teacher.split(",").map((t) => t.trim()),
			].filter((t) => !!t);

			const mergedRoomsWithPosDups: Room["text"][] = [
				...uniqueLesson.room.split(",").map((t) => t.trim()),
				...nonUniqueLesson.room.split(",").map((t) => t.trim()),
			].filter((r) => !!r);

			const mergedUniqueStudents: Student["text"][] = [...new Set(mergedStudentsWithPossibleDuplicates)];
			const mergedUniqueTeachers: Lesson["teacher"] = [...new Set(mergedTeachersWithPosDups)].join(", ").trim();
			const mergedUniqueRooms: Lesson["room"] = [...new Set(mergedRoomsWithPosDups)].join(", ").trim();

			uniqueLesson.students = mergedUniqueStudents;
			uniqueLesson.teacher = mergedUniqueTeachers;
			uniqueLesson.room = mergedUniqueRooms;
		}

		uniqueLessonsMap.set(uniqueLesson.id, uniqueLesson);
	});

	let uniqueLessons: Lesson[] = [...uniqueLessonsMap.values()];

	uniqueLessons = Lesson.sortArray(uniqueLessons);

	return uniqueLessons;
};
