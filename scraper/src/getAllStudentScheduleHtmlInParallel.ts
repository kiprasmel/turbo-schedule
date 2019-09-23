import { IStudent } from "./model/Student";
import { scrapeStudentSchedule } from "./util/scrapeStudentSchedule";

/**
 * TODO - this name is not describing this function correctly :D
 *
 * You cannot just await all promises together
 * because you'll get temporarily blocked by the firewall lmao
 *
 */
export const getAllStudentScheduleHtmlInParallel = async (studentsDataArray: Array<IStudent>): Promise<Array<any>> => {
	let scrapableSchedulePromiseArray: Array<Promise<any>> = studentsDataArray.map((studentData) => {
		return scrapeStudentSchedule(studentData);
	});

	// console.log("scheduelsToScrape", scrapableSchedulePromiseArray.splice(0, 1));

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
	let allStudentSchedules: Array<any> = await Promise.all(
		scrapableSchedulePromiseArray.map(async (scrapableSchedulePromise) => {
			/** scrape one-by-one */

			const scrapedSchedule = await scrapableSchedulePromise;

			return scrapedSchedule;
		})
	);

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
