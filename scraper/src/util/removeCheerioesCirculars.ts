export const removeCheerioesCirculars = (itemArray: Array<CheerioElement>): Array<CheerioElement> =>
	JSON.parse(
		JSON.stringify(itemArray, (key, value) =>
			key === "prev" || key === "next" || key === "parent" ? undefined : value
		)
	);
