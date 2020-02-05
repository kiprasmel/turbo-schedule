import { StudentWithNonUniqueLessons, Lesson, Student } from "@turbo-schedule/common";
import { extractUniqueLessonsSync } from "./extractUniqueLessons";

const findLessonsForStudent = (studentId: Student["id"], uniqueLessons: Lesson[]): Lesson[] => {
	const uniqueLessonsForStudent: Lesson[] = uniqueLessons.filter((lesson: Lesson) =>
		lesson.students.includes(studentId)
	);

	return uniqueLessonsForStudent;
};

/**
 * TODO - rename to `populateStudentsWithUniqueLessonIDs` & update the functionality to reflect it.
 * (will do once we're using a database)
 */
export const populateStudentsWithUniqueLessons = (
	studentsWithNonUniqueLessons: StudentWithNonUniqueLessons[],
	uniqueLessonFileOutputPath?: string,
	uniqueLessons: Lesson[] = extractUniqueLessonsSync(studentsWithNonUniqueLessons, uniqueLessonFileOutputPath)
): Student[] =>
	studentsWithNonUniqueLessons.map(
		(studentWithNonUniqueLessons: StudentWithNonUniqueLessons): Student => {
			const uniqueLessonsForStudent: Lesson[] = findLessonsForStudent(
				studentWithNonUniqueLessons.id,
				uniqueLessons
			);

			const student: Student = new Student({
				...studentWithNonUniqueLessons,
				lessons: uniqueLessonsForStudent,
			});

			return student;
		}
	);

/** TODO experimenting with chaining `.then` */
// export const populateStudentsWithUniqueLessons = async (
// 	studentsWithNonUniqueLessons: StudentWithNonUniqueLessons[],
// 	uniqueLessons: Lesson[]
// ): Promise<Student[]> =>
// 	studentsWithNonUniqueLessons.map(
// 		(studentWithNonUniqueLessons: StudentWithNonUniqueLessons): Student => {
// 			const uniqueLessonsForStudent: Lesson[] = findLessonsForStudent(
// 				studentWithNonUniqueLessons.id,
// 				uniqueLessons
// 			);

// 			const student: Student = new Student({ ...studentWithNonUniqueLessons, lessons: uniqueLessonsForStudent });

// 			return student;
// 		}
// 	);
