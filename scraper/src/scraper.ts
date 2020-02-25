import path from "path";

import { Student, StudentFromList, StudentWithNonUniqueLessons, writeToSingleFile } from "@turbo-schedule/common";
import { db, DbSchema } from "@turbo-schedule/database";

import { IScraperConfig } from "./config";
import { updateLatestDir } from "./util/getStudentsListHtml";
import { getStudentList } from "./util/scrapeStudents";
import { getAllStudentsFromListInParallel } from "./getAllStudentsFromListInParallel";

import { populateStudentsWithUniqueLessons } from "./populateStudentsWithUniqueLessons";

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

		// const finalStudents: Student[] =
		await getStudentList()
			.then(
				async (studentList: StudentFromList[]) => await writeToSingleFile(studentList, config.studentsFilePath)
			)
			// .then((studentList) =>
			// 	studentList.splice(0, 10)
			// ) /** uncomment this to quickly test a limited about of students */
			.then((studentList: StudentFromList[]) => getAllStudentsFromListInParallel(studentList))
			.then((studentsWithNonUniqueLessons: StudentWithNonUniqueLessons[]) =>
				// // memoizeSync(config.uniqueLessonsFilePath, () =>
				// // 	extractUniqueLessons(studentsWithNonUniqueLessons)
				// extractUniqueLessons(studentsWithNonUniqueLessons).then((uniqueLessons: Lesson[]) =>
				// 	populateStudentsWithUniqueLessons(studentsWithNonUniqueLessons, uniqueLessons)
				// )
				populateStudentsWithUniqueLessons(
					studentsWithNonUniqueLessons,
					config.uniqueLessonsFilePath
					// extractUniqueLessons(studentsWithNonUniqueLessons)
				)
			)
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
			/** END SOON */
			/**
			 * if you're adding features - add them here --
			 * before the outcome is finally writen to the files.
			 */
			.then(
				async (finalStudents: Student[]) => {
					const newDbState: DbSchema = {
						students: finalStudents,
						lessons: [] /** TODO */,
					};

					await db.setState(newDbState).write();

					/** TODO REMOVE */
					await Promise.all(
						finalStudents.map(async (student) => {
							writeToSingleFile(student, path.join(config.studentsDirPath, `${student.text}.json`));
							return student;
						})
					);
				}
				// await Student.writeManyToIndividualFiles(finalStudents, config.studentsDirPath)
			);

		await updateLatestDir(config);

		console.log("\n -> scraper finished \n\n");
		return;
	} catch (err) {
		console.error("\nError! \n==> `@turbo-schedule/scraper`\n -> function `scrape`", err);
	}
};
