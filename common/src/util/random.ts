export const pickNPseudoRandomly = (n: number) => <T>(origArr: T[], alreadyTakenArr: T[] = []): T[] => {
	const remainingItems = origArr.length - alreadyTakenArr.length;

	if (n > origArr.length) {
		throw new Error(
			[
				`pickN: you want to pick more items than the original array has.`,
				`n ${n}, origArr.len ${origArr.length}, already taken len ${alreadyTakenArr.length}, remaining items ${remainingItems}`,
			].join("\n")
		);
	}

	if (n > remainingItems) {
		return [];
	}

	/**
	 * why even bother?
	 *
	 * TODO: note that this will not shuffle the items,
	 * and the user might expect it, thus re-consider
	 */
	if (n === remainingItems) {
		return origArr.filter((item) => !alreadyTakenArr.includes(item));
	}

	const selectedItems: Set<T> = new Set();

	let tempN: number = n;
	const maxIdx: number = origArr.length - 1;

	const maxFailureTries = 20;
	let availableFailureTries = maxFailureTries;

	while (tempN > 0) {
		if (availableFailureTries <= 0) {
			console.warn(
				"available failure tries reached 0, tempN =",
				tempN,
				"remaining items:",
				origArr.filter((item) => !alreadyTakenArr.includes(item))
			);
			break;
		}

		const toInt = Math.random() <= 0.5 ? Math.floor : Math.ceil;

		const candidateIdx: number = toInt(Math.random() * maxIdx);

		const candidate: T = origArr[candidateIdx];

		if (selectedItems.has(candidate) || alreadyTakenArr.includes(candidate)) {
			availableFailureTries--;
			continue;
		} else {
			selectedItems.add(candidate);
			tempN--;
			availableFailureTries = maxFailureTries;
		}
	}

	/** apply */
	// const arr: T[] = origArr.filter((_candidate: T, idx: number) => selectedIndices.has(idx));
	const arr: T[] = [...selectedItems.values()];

	return arr;
};

export const randomUpToNExcl = (n: number): number => Math.ceil(Math.random() * (n - 1));

interface PickSomeOptions<T> {
	maxCount?: number;
	alreadyTakenArr?: T[];
}

export const pickSome = <T>(
	origArr: T[], //
	{
		maxCount = origArr.length, //
		alreadyTakenArr = [],
	}: PickSomeOptions<T>
): T[] => {
	// eslint-disable-next-line no-param-reassign
	maxCount = Math.min(maxCount, origArr.length);

	const howManyToPick: number = randomUpToNExcl(maxCount);

	return pickNPseudoRandomly(howManyToPick)(origArr, alreadyTakenArr);
};
