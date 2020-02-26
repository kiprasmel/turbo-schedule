import {
	StudentFromList, //
	StudentWithNonUniqueLessons,
	Lesson,
} from "@turbo-schedule/common";
import { db, DbSchema } from "@turbo-schedule/database";

import { IScraperConfig } from "./config";
import { updateLatestDir } from "./util/getStudentsListHtml";
import { getStudentList } from "./util/scrapeStudents";
import { getAllStudentsFromListInParallel } from "./getAllStudentsFromListInParallel";

import { extractUniqueLessonsSync } from "./extractUniqueLessons";

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

		// eslint-disable-next-line prefer-const
		let studentsFromList: StudentFromList[] = await getStudentList();
		if (process.env.FAST) {
			/** TODO document */
			studentsFromList = studentsFromList.splice(0, 10);
		}

		const studentsWithNonUniqueLessons: StudentWithNonUniqueLessons[] = await getAllStudentsFromListInParallel(
			studentsFromList
		);

		const uniqueLessons: Lesson[] = extractUniqueLessonsSync(studentsWithNonUniqueLessons, undefined);

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
		const newDbState: DbSchema = {
			students: studentsFromList,
			lessons: uniqueLessons,
		};
		await db.setState(newDbState).write();

		/** TODO REMOVE - no need anymore? or nah? */
		await updateLatestDir(config);

		console.log("\n -> scraper finished \n\n");
		return;
	} catch (err) {
		console.error("\nError! \n==> `@turbo-schedule/scraper`\n -> function `scrape`", err);
	}
};
