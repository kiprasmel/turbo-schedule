// import prettier from "prettier";  /** TODO FIXME - breaks CRA - see https://github.com/kiprasmel/turbo-schedule/issues/8 */

/**
 * @returns a `JSON.stringify`ied + `prettier.format`ted string.
 */
export const toJson = <T>(resource: T, shouldPrettify: boolean = true): string => {
	/** TODO FIXME - breaks CRA - see https://github.com/kiprasmel/turbo-schedule/issues/8 */
	// eslint-disable-next-line prefer-const
	let jsonResource: string = JSON.stringify(resource);

	if (shouldPrettify) {
		// jsonResource = prettier.format(jsonResource, { parser: "json" });  /** TODO FIXME - breaks CRA - see https://github.com/kiprasmel/turbo-schedule/issues/8 */
	}

	return jsonResource;
};
