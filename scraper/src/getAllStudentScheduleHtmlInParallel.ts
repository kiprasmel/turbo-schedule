import { IStudent } from "./model/Student";
import { scrapeStudentSchedule } from "./util/scrapeStudentSchedule";

interface IPromiseObj<T = any> {
	studentData: IStudent;
	startedPromise: Promise<T>;
	succeeded: boolean;
}

const startPromise = async (studentData: IStudent) => await scrapeStudentSchedule(studentData);

/**
 * TODO - this name is not describing this function correctly :D
 *
 * You cannot just await all promises together
 * because you'll get temporarily blocked by the firewall lmao
 *
 */
export const getAllStudentScheduleHtmlInParallel = async (studentsDataArray: Array<IStudent>): Promise<Array<any>> => {
	let scrapableSchedulePromiseArray: Array<IPromiseObj<Array<any> | undefined>> = studentsDataArray.map(
		(studentData) => {
			return {
				studentData,
				startedPromise: startPromise(studentData),
				succeeded: false,
			};
		}
	);

	// console.log("scheduelsToScrape", scrapableSchedulePromiseArray.splice(0, 1));

	let allStudentSchedules: Array<any> = [];
	let howManyFailedThisLoop: number = 0;

	const maxRetryCount: number = 5; /** probably config-worthy */
	let howManyTimesWeRetried: number = 0;

	do {
		// if (howManyFailedThisLoop > 0) {
		const msg: string = `\nNew loop cycle (${howManyTimesWeRetried}) - howManyFailed(Previous)Loop = ${howManyFailedThisLoop};\n`;
		console.log(msg);
		// }

		/** reset */
		howManyFailedThisLoop = 0;

		/**
		 * TODO
		 *
		 * Figure out the optimal way of scraping
		 * without blocking the website & getting a firewall block :D
		 *
		 * Note:
		 * `Promise.all` is used to wait for all promises to finish
		 * and only then return the array.
		 */
		allStudentSchedules = [
			...allStudentSchedules,
			...(await Promise.all(
				scrapableSchedulePromiseArray.map(
					async (scrapableSchedulePromise): Promise<any[] | undefined> => {
						/** scrape one-by-one */

						try {
							if (scrapableSchedulePromise.succeeded) {
								return undefined;
							}

							const scrapedSchedule = await scrapableSchedulePromise.startedPromise;

							scrapableSchedulePromise.succeeded = true;

							return scrapedSchedule;
						} catch (err) {
							++howManyFailedThisLoop;

							/** re-start the promise (retry) */
							scrapableSchedulePromise.startedPromise = startPromise(
								scrapableSchedulePromise.studentData
							);

							scrapableSchedulePromise.succeeded = false;

							return undefined;
						}
					}
				)
			)),
		];

		++howManyTimesWeRetried;
	} while (howManyFailedThisLoop > 0 && howManyTimesWeRetried < maxRetryCount);

	/** remove `undefined` items */
	allStudentSchedules = allStudentSchedules.filter((schedule) => !!schedule);

	return allStudentSchedules;

	/**
	 * this is BAD - do NOT use!
	 */
	// const allStudentSchedules = await Promise.all(scrapableSchedulePromiseArray); /** WARNING BAD - YOU'LL GET A FIREWALL COOLDOWN! */

	// const savedContentArray: Array<any> = [];

	// studentsDataArray.forEach((studentData, index) => {
	// 	const savedContent = saveStudentDataAndSchedule(studentData, allStudentSchedules[index]);

	// 	savedContentArray.push(savedContent);
	// });

	// return savedContentArray;
};
