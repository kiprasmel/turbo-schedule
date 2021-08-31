
export type YearRange = "latest" | `${number}-${number}`;

export const defaultYearRange: YearRange = "latest";

export const getYearRanges = (startYearIncl = 2019): YearRange[] => {
	const years: YearRange[] = [];

	/** TODO FIXME - should subtract iff calendar year is next but school year is not over yet */
	const endYear: number = new Date().getFullYear();

	for (let year = startYearIncl; year < endYear; year++) {
		const range: YearRange = `${year}-${year + 1}`;
		years.push(range);
	}

	years.push("latest");

	years.reverse();

	return years;
};
