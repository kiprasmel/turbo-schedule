import {
	Class,
	StudentFromList, //
	Lesson,
	getHtml,
	frontPageScheduleURI,
} from "@turbo-schedule/common";
import { DbSchema, setNewDbState } from "@turbo-schedule/database";

import { IScraperConfig } from "./config";
import { scrapeStudentList } from "./util/scrapeStudentList";
import { scrapeClassList } from "./util/scrapeClassList";

import { mergeStudentsOfDuplicateLessons } from "./mergeStudentsOfDuplicateLessons";
import { extractLessons } from "./util/extractLessons";

// import { populateStudentsWithFriends } from "./populateStudentsWithFriends";

export const scrape = async (config: IScraperConfig): Promise<void> => {
	try {
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

		const frontPageHtml: string = await getHtml(frontPageScheduleURI, "windows-1257");

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
			await Promise.all(studentsFromList.map((student) => extractLessons(student)))
		).flat();

		const uniqueLessons: Lesson[] = mergeStudentsOfDuplicateLessons(nonUniqueLessonsEachWithSingleStudent);

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

		/** create a new database */
		const newDbState: Omit<DbSchema, "Changes"> = {
			students: studentsFromList,
			lessons: uniqueLessons,
			classes: classesFromList,
		};

		await setNewDbState(newDbState);

		console.log("\n -> scraper finished \n\n");
		return;
	} catch (err) {
		console.error("\nError! \n==> `@turbo-schedule/scraper`\n -> function `scrape`");
		throw new Error(err);
	}
};
