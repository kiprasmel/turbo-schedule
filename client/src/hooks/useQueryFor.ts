/**
 * https://reactrouter.com/web/example/queryParams-parameters
 */

import { useHistory } from "react-router-dom";
import { useState, useCallback } from "react";

export type TQuery = string;
export type TSetQuery<T> = (query: T, shouldReplace?: boolean) => void;

export type EncoderDecoder<T> = {
	encode: (value: T) => TQuery;
	decode: (value: TQuery) => T;
};

export const useQueryFor = <T = string>(
	key: string, //
	{ defaultValueFallback, encode, decode }: EncoderDecoder<T> & { defaultValueFallback?: string } = {
		encode: (value) => (value as unknown) as TQuery,
		decode: (value) => (value as unknown) as T,
	}
): [T, TSetQuery<T>] => {
	const history = useHistory();

	const [_queryParams] = useState<URLSearchParams>(new URLSearchParams(history.location.search));

	const [query, _setQuery] = useState<T>(decode(_queryParams.get(key) ?? defaultValueFallback ?? ""));

	const setQuery: TSetQuery<T> = useCallback(
		(_q, shouldReplace = false) => {
			const params = new URLSearchParams(history.location.search);

			const q = encode(_q);

			if (!q) {
				params.delete(key);
				_setQuery(decode(""));
			} else {
				params.set(key, q);
				_setQuery(_q);
			}

			if (shouldReplace) {
				history.replace({ search: params.toString() });
			} else {
				history.push({ search: params.toString() });
			}
		},
		[history, key, encode, decode]
	);

	return [query, setQuery];
};
