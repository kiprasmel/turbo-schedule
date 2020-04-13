import { Lesson } from "@turbo-schedule/common";

/**
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
			uniqueLesson.students = [...uniqueLesson.students, ...nonUniqueLesson.students];
		}

		uniqueLessonsMap.set(uniqueLesson.id, uniqueLesson);
	});

	let uniqueLessons: Lesson[] = [...uniqueLessonsMap.values()];

	uniqueLessons = Lesson.sortArray(uniqueLessons);

	return uniqueLessons;
};
