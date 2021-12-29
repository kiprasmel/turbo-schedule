import { delay } from "./delay";

/**
 * returns a `getTimeDeltaMs` function
 */
export const startTimerMs: (opts?: { startTime?: number; divider?: number }) => (endTime?: number) => number = (
	{
		startTime = new Date().getTime(), //
		divider = 1,
	} = {} //
) => (
	endTime = new Date().getTime() //
) => (endTime - startTime) / divider;

export type PromiseCreator<T> = () => Promise<T>;

/**
 * the whole purpose is that a promise is not yet initiated,
 * i.e. its "lazy",
 * i.e. it's not yet called, and instead it's made lazy
 * by initially wrapping it inside another function
 * (thus becoming "PromiseCreator").
 *
 */
export const poolPromises = async <T>(
	intervalMs: number, //
	maxRequestsPerIntervalIncl: number,
	arrayOfPromiseCreators: PromiseCreator<T>[] = []
): Promise<T[]> => {
	const results: T[][] = [];

	while (arrayOfPromiseCreators.length > 0) {
		const current: PromiseCreator<T>[] = arrayOfPromiseCreators.splice(0, maxRequestsPerIntervalIncl);

		console.log(
			"pool", //
			results.length,
			"current",
			current.length,
			"remaining",
			arrayOfPromiseCreators.length, // - results.length
			"results",
			results.length * (results[results.length - 1]?.length || 1)
		);

		const getDeltaMs = startTimerMs();

		const tmpResults: T[] = await Promise.all(current.map((promiseCreator) => promiseCreator()));

		results.push(tmpResults);

		console.log("delta", getDeltaMs() / 1000);
		await delay(intervalMs - getDeltaMs());
	}

	return results.flat();
};
