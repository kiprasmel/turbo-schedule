export const invertArrayMap = <K, V>(map: Map<K, V[]>): Map<V, K[]> => {
	const inverted: Map<V, K[]> = new Map();

	for (const [key, values] of map.entries()) {
		// const isArray = Array.isArray(values)
		// if (!isArray) {
		// 	inverted.set(values, key);
		// } else {
			for (const value of values) {
				let existing: K[] | undefined = inverted.get(value);
				if (!existing) {
					inverted.set(value, [key]);
				} else {
					existing.push(key);
				}
			}
		// }
	}

	return inverted;
}
