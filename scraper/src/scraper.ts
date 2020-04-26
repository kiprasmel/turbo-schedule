import {
	Class,
	StudentFromList, //
	Lesson,
	ScrapeInfo,
	timeElapsedMs,
	Teacher,
	Room,
} from "@turbo-schedule/common";
import { DbSchema, setDbStateAndBackupCurrentOne } from "@turbo-schedule/database";

import { IScraperConfig } from "./config";
import { getFrontPageHtml } from "./util/getFrontPageHtml";

import { mergeStudentsOfDuplicateLessons } from "./mergeStudentsOfDuplicateLessons";
import { extractLessonFromClass, extractLessonFromStudent, extractLessonFromTeacher } from "./util/extractLessons";
import { createPageVersionIdentifier } from "./util/createPageVersionIdentifier";
import { scrapeStudentList, scrapeClassList, scrapeTeacherList, scrapeRoomList } from "./util/scrapeScheduleItemList";

export const scrape = async (config: IScraperConfig): Promise<void> => {
	try {
		const startTime: Date = new Date();

		console.log("\n==> scraper\n");
		console.table(config);

		const frontPageHtml: string = await getFrontPageHtml();

		// eslint-disable-next-line prefer-const
		let studentsFromList: StudentFromList[] = scrapeStudentList(frontPageHtml);

		// eslint-disable-next-line prefer-const
		let classesFromList: Class[] = scrapeClassList(frontPageHtml);

		// eslint-disable-next-line prefer-const
		let teachersFromList: Teacher[] = scrapeTeacherList(frontPageHtml);

		// eslint-disable-next-line prefer-const
		let roomsFromList: Room[] = scrapeRoomList(frontPageHtml);

		if (process.env.FAST) {
			/** TODO document */
			studentsFromList = studentsFromList.splice(0, 10);
			classesFromList = classesFromList.splice(0, 10);
			teachersFromList = teachersFromList.splice(0, 10);
			roomsFromList = roomsFromList.splice(0, 10);
		}

		const nonUniqueLessonsEachWithSingleStudent: Lesson[] = await (
			await Promise.all(
				studentsFromList.map((student) => extractLessonFromStudent(student.originalScheduleURI, student.id))
			)
		).flat();

		const nonUniqueLessonsEachWithSingleClass: Lesson[] = await (
			await Promise.all(
				classesFromList.map((theClass) => extractLessonFromClass(theClass.originalScheduleURI, theClass.text))
			)
		).flat();

		const nonUniqueLessonsEachWithSingleTeacher: Lesson[] = await (
			await Promise.all(
				// teachersFromList.map((teacher) => extractLessonFromTeacher(teacher.originalScheduleURI, undefined))
				teachersFromList.map((teacher) =>
					extractLessonFromTeacher(teacher.originalScheduleURI, teacher.text /** TODO FIXME */)
				)
			)
		).flat();

		const nonUniqueLessonsEachWithSingleRoom: Lesson[] = await (
			await Promise.all(
				// roomsFromList.map((room) => extractLessonFromTeacher(room.originalScheduleURI, undefined))
				roomsFromList.map((room) =>
					extractLessonFromTeacher(room.originalScheduleURI, room.text /** TODO FIXME */)
				)
			)
		).flat();

		/** */

		const uniqueLessonsFromStudents: Lesson[] = mergeStudentsOfDuplicateLessons(
			nonUniqueLessonsEachWithSingleStudent
		);

		/**
		 * TODO - `classes` will be placed inside `lesson.students` - is this what we want?
		 */
		const uniqueLessonsFromClasses: Lesson[] = mergeStudentsOfDuplicateLessons(nonUniqueLessonsEachWithSingleClass);

		const uniqueLessonsFromTeachers: Lesson[] = mergeStudentsOfDuplicateLessons(
			nonUniqueLessonsEachWithSingleTeacher
		);

		const uniqueLessonsFromRooms: Lesson[] = mergeStudentsOfDuplicateLessons(nonUniqueLessonsEachWithSingleRoom);

		/**
		 * merge once again!
		 */
		const allUniqueLessons: Lesson[] = mergeStudentsOfDuplicateLessons([
			...uniqueLessonsFromClasses,
			...uniqueLessonsFromStudents,
			...uniqueLessonsFromTeachers,
			...uniqueLessonsFromRooms,
		]);

		const endTime: Date = new Date();

		const scrapeInfo: ScrapeInfo = {
			timeStartISO: startTime.toISOString(),
			timeEndISO: endTime.toISOString(),
			timeElapsedInSeconds: timeElapsedMs(startTime, endTime) / 1000,
			pageVersionIdentifier: createPageVersionIdentifier(frontPageHtml),
		};

		/** create a new database */
		const newDbState: Omit<DbSchema, "Changes"> = {
			scrapeInfo,
			students: studentsFromList,
			lessons: allUniqueLessons,
			classes: classesFromList,
			teachers: teachersFromList,
			rooms: roomsFromList,
		};

		await setDbStateAndBackupCurrentOne(newDbState);

		console.log("\n -> scraper finished \n\n");
		console.table(scrapeInfo);
		return;
	} catch (err) {
		console.error("\nError! \n==> `@turbo-schedule/scraper`\n -> function `scrape`");
		throw new Error(err);
	}
};
