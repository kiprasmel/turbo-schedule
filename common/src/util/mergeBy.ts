export type MergeStrategy<T> = (left: T, right: T) => T;

export const defaultMergeStrategy: MergeStrategy<any> = (left, right) => ({ ...left, ...right });

export const mergeBy = <T, K extends keyof T>(
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

	return [...mergedItems.values()];
};
