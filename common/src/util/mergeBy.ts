/* eslint-disable indent */

import { uniq } from "./uniq";

export type MergeStrategy<T> = (left: T, right: T) => T;

export const defaultMergeStrategy: MergeStrategy<any> = (left, right) => ({ ...left, ...right });

export const mergeBy = <T, K extends keyof T = any>(
	keyAccessor: K,
	collisionMergeStrategy: MergeStrategy<T> = defaultMergeStrategy
) => (unmergedItemsRef: T[]): T[] => {
	const unmergedItems: T[] = [...unmergedItemsRef];
	const mergedItems: Map<T[K], T> = new Map();

	unmergedItems.forEach((unmergedItem: T) => {
		const key: T[K] = unmergedItem[keyAccessor];
		const mergedItem: T | undefined = mergedItems.get(key);
		mergedItems.set(key, !mergedItem ? unmergedItem : collisionMergeStrategy(mergedItem, unmergedItem));
	});

	return uniq([...mergedItems.values()]);
};

/**
 *  same as `mergeBy`, but uses two key accessors
 */
export const mergeBy2 = <T, K1 extends keyof T = any, K2 extends keyof T[K1] = any>(
	keyAccessor1: K1,
	keyAccessor2: K2,
	collisionMergeStrategy: MergeStrategy<T> = defaultMergeStrategy
) => (unmergedItemsRef: T[]): T[] => {
	const unmergedItems: T[] = [...unmergedItemsRef];
	const mergedItems: Map<T[K1][K2], T> = new Map();

	unmergedItems.forEach((unmergedItem: T) => {
		const key: T[K1][K2] = unmergedItem[keyAccessor1][keyAccessor2];
		const mergedItem: T | undefined = mergedItems.get(key);
		mergedItems.set(key, !mergedItem ? unmergedItem : collisionMergeStrategy(mergedItem, unmergedItem));
	});

	return uniq([...mergedItems.values()]);
};
