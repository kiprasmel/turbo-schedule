/**
 * https://reactrouter.com/web/example/queryParams-parameters
 */

import { useHistory } from "react-router-dom";
import { useState, useReducer, useEffect } from "react";

export type TQuery = string;
export type TSetQuery<T> = (query: T, shouldReplace?: boolean) => void;

export type EncoderDecoder<T> = {
	encode: (value: T) => TQuery;
	decode: (value: TQuery) => T;
};

export const arrayEncoderDecoder: EncoderDecoder<string[]> = {
	encode: (x) => x.join(","),
	decode: (x) =>
		x
			.split(",")
			.map((y) => y.trim())
			.filter((y) => !!y),
};

export const useQueryFor = <T = string>(
	key: string, //
	{ defaultValueFallback, encode, decode }: EncoderDecoder<T> & { defaultValueFallback?: string } = {
		encode: (value) => (value as unknown) as TQuery,
		decode: (value) => (value as unknown) as T,
	}
	// ): [T, TSetQuery<T>] => {
) => {
	const history = useHistory();

	const [_queryParams] = useState<URLSearchParams>(new URLSearchParams(history.location.search));

	// const [query, setQuery] = useReducer((prevState, { _q, shouldReplace = false }) => {
	const [query, setQuery] = useReducer((_prevState: T, _q: T) => {
		// const params = new URLSearchParams(history.location.search);

		const q = encode(_q);

		// const handle = (newParams: URLSearchParams): void => {
		// 	// if (shouldReplace) {
		// 	// 	history.replace({ search: params.toString() });
		// 	// } else {
		// 	history.push({ search: newParams.toString() });
		// 	// }
		// };

		if (!q) {
			// params.delete(key);
			// handle(params);

			// _setQuery(decode(""));
			return decode("");
		} else {
			// params.set(key, q);
			// handle(params);

			// _setQuery(_q);
			return _q;
		}
	}, decode(_queryParams.get(key) ?? defaultValueFallback ?? ""));

	useEffect(() => {
		const params = new URLSearchParams(history.location.search);

		if (!query) {
			if (params.has(key)) {
				params.delete(key);
			}
		} else {
			params.set(key, encode(query));
		}

		const handle = (newParams: URLSearchParams): void => {
			// if (shouldReplace) {
			// 	history.replace({ search: params.toString() });
			// } else {
			history.push({ search: newParams.toString() });
			// }
		};

		handle(params);
	}, [query, encode, history, key]);

	// const [query, _setQuery] = useState<T>(decode(_queryParams.get(key) ?? defaultValueFallback ?? ""));

	// const setQuery: TSetQuery<T> = useCallback(
	// 	(_q, shouldReplace = false) => {
	// 		const params = new URLSearchParams(history.location.search);

	// 		const q = encode(_q);

	// 		if (!q) {
	// 			params.delete(key);
	// 			_setQuery(decode(""));
	// 		} else {
	// 			params.set(key, q);
	// 			_setQuery(_q);
	// 		}

	// 		if (shouldReplace) {
	// 			history.replace({ search: params.toString() });
	// 		} else {
	// 			history.push({ search: params.toString() });
	// 		}
	// 	},
	// 	[history, key, encode, decode]
	// );

	return [query, setQuery] as const;
};
