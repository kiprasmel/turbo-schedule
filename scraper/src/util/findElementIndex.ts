export const findElementIndex = (tableDescriptionArray: CheerioElement[], targetText: string): number => {
	for (let index = 0; index < tableDescriptionArray.length; ++index) {
		const td: CheerioElement = tableDescriptionArray[index];

		if (!td?.children?.[0]?.children?.[0]?.children?.[0]?.data) {
			continue;
		}

		const potentialTargetText: string = td.children[0].children[0].children[0].data || "";

		if (potentialTargetText === targetText) {
			return index;
		}
	}

	throw new Error("Failed to find index...");

	return -1; /** typescript pls */
};
