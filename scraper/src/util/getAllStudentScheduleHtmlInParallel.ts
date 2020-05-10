// import { IStudent } from "./model/Student";
// import { scrapeStudentSchedule } from "./util/scrapeStudentSchedule";

import { delay } from "@turbo-schedule/common";

// lessonPromises: Promise<NonUniqueLesson[]>[] = participants.map((p) =>
// 	extractLessonFromTeacher(p.originalScheduleURI, {
// 		text: p.text,
// 		isActive: true,
// 		labels: p.labels,
// 	})
// ).flat()

export type PromiseStarter<T, U> = (dataToBeCalled: T) => Promise<U>;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IPromiseObj<T, U> {
	dataItem: T;
	startPromise: () => Promise<U>;
	startedPromise: Promise<U> | undefined;
	hasSucceeded: boolean;
}

// const startPromise = async (participant: IStudent) => await scrapeStudentSchedule(participant);

/**
 * TODO - this name is not describing this function correctly :D
 *
 * You cannot just await all promises together
 * because you'll get temporarily blocked by the firewall lmao
 *
 */
export const resolvePromisesSequentually = async <T, U>(
	dataToBeCalled: T[],
	promiseStarter: PromiseStarter<T, U>,
	delayMs: number = Number(process.env.DELAY) || 200, // 100 was too small
	maxRetryCount: number = Number(process.env.MAX_RETRY) || 5,
	maxFailsInSameLoop: number = Number(process.env.MAX_FAIL) || 5
): Promise<U[]> => {
	const promises: IPromiseObj<T, U>[] = dataToBeCalled.map((dataItem) => ({
		dataItem,
		startPromise: () => promiseStarter(dataItem),
		startedPromise: undefined, // promiseStarter(dataItem), // undefined
		hasSucceeded: false,
	}));

	let resolvedData: U[] = [];

	let howManyTimesWeTried: number = 0;
	let howManyFailedThisLoop: number = 0;

	do {
		const msg: string = `\nNew loop cycle (${howManyTimesWeTried}) - howManyFailed(Previous)Loop = ${howManyFailedThisLoop};\n`;
		console.log(msg);

		howManyTimesWeTried++;

		/** reset */
		howManyFailedThisLoop = 0;

		for (const promise of promises) {
			if (howManyFailedThisLoop >= maxFailsInSameLoop) {
				const err: Error = new Error("Fail count this loop exceeded maximum.");
				console.error(err);
				throw err;
			}

			if (promise.hasSucceeded) {
				continue;
			}

			try {
				const data = await promise.startPromise();
				// promise.startedPromise = promise.startPromise();
				await delay(delayMs);
				// const data = await promise.startedPromise;

				// promise.hasSucceeded = true;

				resolvedData.push(data);
			} catch (err) {
				howManyFailedThisLoop++;

				/** re-start the promise (retry) */
				// promise.startedPromise = promise.startPromise();

				// promise.hasSucceeded = false;
			}
		}
	} while (
		howManyFailedThisLoop > 0 &&
		howManyFailedThisLoop < maxFailsInSameLoop &&
		howManyTimesWeTried < maxRetryCount
	);

	// resolvedData = await Promise.all(promises.map((p) => p.startedPromise as Promise<U>));

	// for (const p of promises) {
	// 	const data: U = (await p.startedPromise) as U;
	// 	resolvedData.push(data);
	// }

	/** remove `undefined` items */
	resolvedData = resolvedData.filter((schedule) => !!schedule);

	return resolvedData;
};
