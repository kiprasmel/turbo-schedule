
export type YearRange = "latest" | "all" | `${number}-${number}`;

export const latestYearRange: YearRange = "latest";
export const allYearsRange: YearRange = "all";

export const defaultYearRange = allYearsRange; // TODO apply this where needed

export const getYearRanges = (startYearIncl = 2019): YearRange[] => {
	const years: YearRange[] = [];

	/** TODO FIXME - should subtract iff calendar year is next but school year is not over yet */
	const endYear: number = new Date().getFullYear();

	for (let year = startYearIncl; year < endYear; year++) {
		const range: YearRange = `${year}-${year + 1}`;
		years.push(range);
	}

	// years.push(allYearsRange); // TODO think about stuff
	years.push(latestYearRange);

	years.reverse();

	return years;
};
