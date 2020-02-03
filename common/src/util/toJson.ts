import prettier from "prettier";

/**
 * @returns a `JSON.stringify`ied + `prettier.format`ted string.
 */
export const toJson = <T>(resource: T, shouldPrettify: boolean = true): string => {
	let jsonResource: string = JSON.stringify(resource);

	if (shouldPrettify) {
		jsonResource = prettier.format(jsonResource, { parser: "json" });
	}

	return jsonResource;
};
