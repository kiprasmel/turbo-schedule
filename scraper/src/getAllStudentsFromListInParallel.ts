import { StudentFromList, StudentWithNonUniqueLessons } from "@turbo-schedule/common";
import { populateStudentWithLessons } from "./util/populateStudentWithLessons";

export const getAllStudentsFromListInParallel = async (
	studentList: StudentFromList[]
): Promise<StudentWithNonUniqueLessons[]> => {
	const promiseArray: Promise<StudentWithNonUniqueLessons>[] = studentList.map((student) =>
		// populateStudentWithLessons(student, config.getStudentFilePath(student.text))
		populateStudentWithLessons(student)
	);

	const students: StudentWithNonUniqueLessons[] = await Promise.all(promiseArray);

	console.log("\n\ndone parallel");
	return students;
};

/**
 * TODO - figure out what to do with the somewhat legacy code down there:
 */

// interface IPromiseObj {
// 	studentData: StudentFromList;
// 	startedPromise: Promise<StudentWithNonUniqueLessons>;
// 	succeeded: boolean;
// }

// /**
//  * TODO - this name is not describing this function correctly :D
//  *
//  * You cannot just await all promises together
//  * because you'll get temporarily blocked by the firewall lmao
//  *
//  * TODO concurrency
//  *
//  */
// export const populateAllStudentsWithNonUniqueLessons = async (
// 	studentList: StudentFromList[]
// 	// config: IScraperConfig
// ): Promise<StudentWithNonUniqueLessons[]> => {
// 	const startPromise = async (studentData: StudentFromList): Promise<StudentWithNonUniqueLessons> =>
// 		await populateStudentWithLessons(
// 			studentData
// 			// config.getStudentFilePath(studentData.text)
// 		); /** TODO FIXME Don't memoize like this */

// 	// eslint-disable-next-line prefer-const
// 	let scrapableSchedulePromiseArray: IPromiseObj[] = studentList.map((studentData: StudentFromList) => ({
// 		studentData,
// 		startedPromise: startPromise(studentData),
// 		succeeded: false,
// 	}));

// 	let allStudentSchedules: Array<any> = [];
// 	let howManyFailedThisLoop: number = 0;

// 	const maxRetryCount: number = 5; /** probably config-worthy */
// 	let howManyTimesWeRetried: number = 0;

// 	do {
// 		const msg: string = `\nNew loop cycle (${howManyTimesWeRetried}) - howManyFailed(Previous)Loop = ${howManyFailedThisLoop};\n`;
// 		console.log(msg);

// 		/** reset */
// 		howManyFailedThisLoop = 0;

// 		/**
// 		 * TODO
// 		 *
// 		 * Figure out the optimal way of scraping
// 		 * without blocking the website & getting a firewall block :D
// 		 *
// 		 * Note:
// 		 * `Promise.all` is used to wait for all promises to finish
// 		 * and only then return the array.
// 		 */
// 		allStudentSchedules = [
// 			...allStudentSchedules,
// 			...(await Promise.all(
// 				scrapableSchedulePromiseArray.map(
// 					async (scrapableSchedulePromise): Promise<StudentWithNonUniqueLessons | undefined> => {
// 						/** scrape one-by-one */

// 						try {
// 							if (scrapableSchedulePromise.succeeded) {
// 								return undefined;
// 							}

// 							const scrapedSchedule: StudentWithNonUniqueLessons = await scrapableSchedulePromise.startedPromise;

// 							scrapableSchedulePromise.succeeded = true;

// 							return scrapedSchedule;
// 						} catch (err) {
// 							++howManyFailedThisLoop;

// 							/** re-start the promise (retry) */
// 							scrapableSchedulePromise.startedPromise = startPromise(
// 								scrapableSchedulePromise.studentData
// 							);

// 							scrapableSchedulePromise.succeeded = false;

// 							return undefined;
// 						}
// 					}
// 				)
// 			)),
// 		];

// 		++howManyTimesWeRetried;
// 	} while (howManyFailedThisLoop > 0 && howManyTimesWeRetried < maxRetryCount);

// 	/** remove `undefined` items */
// 	allStudentSchedules = allStudentSchedules.filter((schedule) => !!schedule);

// 	return allStudentSchedules;

// 	/**
// 	 * this is BAD - do NOT use!
// 	 */
// 	// const allStudentSchedules = await Promise.all(scrapableSchedulePromiseArray); /** WARNING BAD - YOU'LL GET A FIREWALL COOLDOWN! */

// 	// const savedContentArray: Array<any> = [];

// 	// studentList.forEach((studentData, index) => {
// 	// 	const savedContent = saveStudentDataAndSchedule(studentData, allStudentSchedules[index]);

// 	// 	savedContentArray.push(savedContent);
// 	// });

// 	// return savedContentArray;
// };
