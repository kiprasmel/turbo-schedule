/**
 * https://stackoverflow.com/a/53731154
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
 *
 */

/**
 * @usage
 * ```ts
 * JSON.stringify(circular, getCircularReplacer())
 * ```
 *
 */
export const getCircularReplacer = () => {
	const seen = new WeakSet();
	return (key: any, value: any) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return;
			}
			seen.add(value);
		}
		return value;
	};
};

export const removeCircular = (content: string) => {
	return JSON.parse(JSON.stringify(content, getCircularReplacer()));
};
