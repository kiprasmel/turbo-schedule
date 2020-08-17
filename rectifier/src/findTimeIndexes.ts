/* eslint-disable @typescript-eslint/no-use-before-define */

import { Change, Lesson } from "@turbo-schedule/common";

export interface Context {
	change: Change;
	lessons: Lesson[];
}

export interface Finder {
	matches(str: string): boolean;
	find(change: Change): number[];
}

export function findTimeIndexes(ctx: Context, finders: Finder[] = createDefaultFinders(ctx)): number[] {
	/**
	 * null-assertion because the last finder will always match
	 * if the others did not.
	 */
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const finder: Finder = finders.find((currFinder) => currFinder.matches(ctx.change.text))!;

	return finder.find(ctx.change);
}

export function createDefaultFinders(ctx: Context): Finder[] {
	const finders: Finder[] = [
		{
			/** lesson index */
			matches: (str: string): boolean => /^\d /.test(str),
			find: (change: Change): number[] => [parseInt(change.text.split(" ")[0]) - 1],
		},
		{
			/** lesson index range */
			matches: (str: string): boolean => /^\d-\d /g.test(str),
			find: (change: Change): number[] => {
				const rangeStr = change.text.split(" ")[0];

				// const changeTextWithoutRange = restStrArr.join(" ");

				const rangeStart: number = parseInt(rangeStr.split("-")[0], 10);
				const rangeEnd: number = parseInt(rangeStr.split("-")[1], 10);

				const indexes: number[] = [];

				for (let i = rangeStart; i <= rangeEnd; ++i) {
					indexes.push(i - 1);
					// extendedChanges.push({
					// 	...change,
					// 	text: i + " " + changeTextWithoutRange,
					// 	timeIndex: i - 1,
					// });
				}

				return indexes;
			},
		},
		{
			/**
			 * changes affecting the schedule for the whole day,
			 * either for the teacher, or the student, or the class
			 */
			matches: (str: string): boolean =>
				/savarankiškas darbas/gi.test(str) || /pagal tvarkaraštį/gi.test(str) || /pavaduoja/gi.test(str),
			find: (change: Change): number[] => {
				const { parent } = change;

				if (!parent) {
					return [-1];
				}

				const indexes: number[] = [];

				for (const lesson of ctx.lessons) {
					/** TODO FIXME check if the class (number & letter, if present) is also the same! */
					if (lesson.dayIndex === change.dayIndex && lesson.teacher === parent) {
						// change.timeIndex = lesson.timeIndex;
						// break;
						/** TODO */
						indexes.push(lesson.timeIndex);
					}
				}

				// extendedChanges.push(change);

				return !indexes.length ? [-1] : indexes;
			},
		},
		{
			matches: (_str: string): true => true,
			find: (_change: Change): [-1] => [-1],
		},
	];

	return finders;
}
