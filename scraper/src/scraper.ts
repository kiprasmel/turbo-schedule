import {
	Class,
	StudentFromList, //
	Lesson,
	ScrapeInfo,
	timeElapsedMs,
} from "@turbo-schedule/common";
import {
	DbSchema,
	/** Db, initDb, defaultDbState, createNewDatabaseFilePathSync, */ setNewDbState,
} from "@turbo-schedule/database";

import { IScraperConfig } from "./config";
import { getFrontPageHtml } from "./util/getFrontPageHtml";
import { scrapeStudentList } from "./util/scrapeStudentList";
import { scrapeClassList } from "./util/scrapeClassList";

import { mergeStudentsOfDuplicateLessons } from "./mergeStudentsOfDuplicateLessons";
import { extractLessonFromClass, extractLessonFromStudent } from "./util/extractLessons";
import { createPageVersionIdentifier } from "./util/createPageVersionIdentifier";

// import { populateStudentsWithFriends } from "./populateStudentsWithFriends";

export const scrape = async (config: IScraperConfig): Promise<void> => {
	try {
		const startTime: Date = new Date();

		console.log("\n==> scraper\n");
		console.table(config);

		/**
		 * TODO use functional programming and chain everything with `.map` yooo
		 * umm actually, it's `.then`,
		 * since we sometimes need the whole array instead of a single value,
		 * iterated N times.
		 */

		/**
		 * TODO stop this pretty meh `memoize` logic
		 * & only save the final students
		 * at the end of the chain.
		 */

		const frontPageHtml: string = await getFrontPageHtml();

		// eslint-disable-next-line prefer-const
		let studentsFromList: StudentFromList[] = await scrapeStudentList(frontPageHtml);

		// eslint-disable-next-line prefer-const
		let classesFromList: Class[] = scrapeClassList(frontPageHtml);

		if (process.env.FAST) {
			/** TODO document */
			studentsFromList = studentsFromList.splice(0, 10);
			classesFromList = classesFromList.splice(0, 10);
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

		const uniqueLessonsFromStudents: Lesson[] = mergeStudentsOfDuplicateLessons(
			nonUniqueLessonsEachWithSingleStudent
		);

		/**
		 * TODO - `classes` will be placed inside `lesson.students` - is this what we want?
		 */
		const uniqueLessonsFromClasses: Lesson[] = mergeStudentsOfDuplicateLessons(nonUniqueLessonsEachWithSingleClass);

		/**
		 * merge once again!
		 */
		const allUniqueLessons: Lesson[] = mergeStudentsOfDuplicateLessons([
			...uniqueLessonsFromClasses,
			...uniqueLessonsFromStudents,
		]);

		/** BEGIN SOON */
		// .then((students) => populateStudentsWithFriends(students))
		// .then((studentsWithFriends) => {
		// 	fs.writeFileSync(
		// 		path.join(config.latestScrapedDataDirPath, "temp-students-with-friends.json"),
		// 		prettier.format(
		// 			JSON.stringify(
		// 				studentsWithFriends
		// 					.flatMap((student) => student.friends)
		// 					.sort(
		// 						(left: Friend, right: Friend) =>
		// 							right.totalEncounters - left.totalEncounters ||
		// 							left.text.localeCompare(right.text)
		// 					)
		// 			),
		// 			{
		// 				parser: "json",
		// 			}
		// 		),
		// 		{ encoding: "utf-8" }
		// 	);

		// 	return studentsWithFriends;
		// })

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
		};

		await setNewDbState(newDbState);

		// const newDbFilePath: string = createNewDatabaseFilePathSync();
		// try {
		// 	const db: Db = await initDb(newDbFilePath);
		// 	await db.setState({ ...defaultDbState, ...newDbState }).write();
		// } catch (e) {
		// 	console.error("failed setting db state", e);
		// 	throw e;
		// }

		console.log("\n -> scraper finished \n\n");
		console.table(scrapeInfo);
		return;
	} catch (err) {
		console.error("\nError! \n==> `@turbo-schedule/scraper`\n -> function `scrape`");
		throw new Error(err);
	}
};
