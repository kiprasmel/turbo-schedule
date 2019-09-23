export const removeCheerioesCirculars = (itemArray: Array<CheerioElement>): Array<CheerioElement> => {
	return JSON.parse(
		JSON.stringify(itemArray, (key, value) => {
			return key === "prev" || key === "next" || key === "parent" ? undefined : value;
		})
	);
};
