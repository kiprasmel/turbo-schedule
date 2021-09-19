/* eslint-disable indent */
import { useState, useEffect, Dispatch, SetStateAction, useCallback, useRef } from "react";

import { abc } from "./abortController";

import { SelfWithKeysRecursively } from "./selfWithKeysRecursively"

export type FetchOpts = Parameters<typeof fetch>[1];

/** set the internal state, **without** triggering any side effects, like `onSetState` */
export type SetState__Internal<State> = Dispatch<SetStateAction<State>>;

export type OnSetStateCtx<State> = {
	prevState: State;
	newState: State;
	setState__internal: SetState__Internal<State>;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
};
export type OnSetState<State> = undefined | ((ctx: OnSetStateCtx<State>) => Promise<any>);

export type UseFetchedStateBaseOptions<
	FetchedData,
	InitialData extends FetchedData,
	State extends FetchedData | InitialData = FetchedData | InitialData
> = {
	fetchOpts?: FetchOpts;
	shouldFetch?: (ctx: { setState__internal: SetState__Internal<State> }) => boolean;
	onSuccess?: (data: FetchedData, ctx: null) => any;
	onError?: (e: any, ctx: { defaultValue: InitialData }) => any;
	// onError?: (e: any, ctx: { defaultValue: State }) => any;
	onSetState?: OnSetState<State>;
}

export type DefaultURLCreatorCtx = unknown;
export type URLCreatorFunction<URLCreatorCtx> = (urlCtx: URLCreatorCtx) => string;

export type UseFetchedStateOptions<
	URLCreatorOrStr extends (URLCreatorFunction<any> | string),
	FetchedData,
	InitialData extends FetchedData,
	State extends FetchedData | InitialData = FetchedData | InitialData,
> =
	UseFetchedStateBaseOptions<FetchedData, InitialData, State>
	& (
		URLCreatorOrStr extends URLCreatorFunction<infer C>
			? { urlCtx: C }
			: {}
	);

export type UseFetchedStateReturn<State> = readonly [State, Dispatch<SetStateAction<State>>, boolean];

export type DefaultResponseJson = unknown;

// overloads!

export function createUseFetchedState<
	ResponseJson = DefaultResponseJson,
	WantedJson extends SelfWithKeysRecursively<ResponseJson> = SelfWithKeysRecursively<ResponseJson>,
	URLCreatorCtx = DefaultURLCreatorCtx,
	>(
	url: URLCreatorFunction<URLCreatorCtx>,
	getDataFromResponse: (data: ResponseJson) => WantedJson
): <InitialData extends WantedJson = WantedJson, State extends WantedJson | InitialData = WantedJson | InitialData>(
	defaultValueOrGetIt: InitialData | (() => InitialData),
	// defaultValue: State, // TODO FIXME - CONFIRM (InitialData -> State)
	dependencies: any[],
	opts: UseFetchedStateOptions<typeof url, WantedJson, InitialData, State>
) => UseFetchedStateReturn<State>;

export function createUseFetchedState<
	ResponseJson = DefaultResponseJson,
	WantedJson extends SelfWithKeysRecursively<ResponseJson> = SelfWithKeysRecursively<ResponseJson>
	// URLCreatorCtx extends never = never
>(
	url: string, //
	getDataFromResponse: (data: ResponseJson) => WantedJson
): <InitialData extends WantedJson = WantedJson, State extends WantedJson | InitialData = WantedJson | InitialData>(
	defaultValueOrGetIt: InitialData | (() => InitialData),
	// defaultValue: State, // TODO FIXME - CONFIRM (InitialData -> State)
	dependencies: any[],
	opts?: UseFetchedStateOptions<typeof url, WantedJson, InitialData, State>
) => UseFetchedStateReturn<State>;

export function createUseFetchedState<
	ResponseJson = DefaultResponseJson,
	WantedJson extends SelfWithKeysRecursively<ResponseJson> = SelfWithKeysRecursively<ResponseJson>,
	URLCreatorCtx = DefaultURLCreatorCtx,
>(
	url: URLCreatorFunction<URLCreatorCtx> | string,
	getDataFromResponse: (data: ResponseJson) => WantedJson
) {
	return function useFetchedState<InitialData extends WantedJson = WantedJson, State extends WantedJson | InitialData = WantedJson | InitialData>(
		defaultValueOrGetIt: InitialData | (() => InitialData),
		// defaultValue: State, // TODO FIXME - CONFIRM (InitialData -> State)
		dependencies: any[],
		{
			fetchOpts,
			// urlCtx, /** do not destructure here, because might not be provided. only use later from `rest` if `url` is a function. */
			shouldFetch = () => true,
			onSuccess = () => {},
			onError = () => {},
			onSetState = async () => {},
			...rest
		}: UseFetchedStateOptions<typeof url, WantedJson, InitialData, State>
		= {}
	): UseFetchedStateReturn<State> {
		const defaultValue: React.MutableRefObject<InitialData> = useRef(defaultValueOrGetIt instanceof Function ? defaultValueOrGetIt() : defaultValueOrGetIt);
		
		const [state, setState__internal] = useState<State>(defaultValue.current as State); /** TODO FIXME */
		const [isLoading, setIsLoading] = useState<boolean>(false);

		const setStateManual: Dispatch<SetStateAction<State>> = useCallback((newStateOrFn: SetStateAction<State>): void => {
			setState__internal((currState): State => {
				const newState: State = newStateOrFn instanceof Function ? newStateOrFn(currState) : newStateOrFn;

				onSetState?.({
					prevState: currState, //
					newState,
					setState__internal: setState__internal,
					setIsLoading
				});

				return newState;
			});
		}, [setState__internal, onSetState, setIsLoading]);

		useEffect(() => {
			if (!(shouldFetch instanceof Function)) {
				throw new Error("shouldFetch must be a function, got " + typeof shouldFetch);
			}

			if (!shouldFetch({ setState__internal })) {
				console.info("not fetching");
				return;
			}

			const { signal, abort } = abc();

			let urlString: string;

			if (!(url instanceof Function)) {
				urlString = url;
			} else {
				/**
				 * https://github.com/microsoft/TypeScript/issues/34523#issuecomment-700491122
				 */
				const assertRestHasUrlCtx: (r: typeof rest) => asserts r is { urlCtx: URLCreatorCtx; } = (r) => {
					if (!("urlCtx" in (r as { urlCtx: URLCreatorCtx }))) {
						throw new Error("url creator expects the urlCtx, but did not receive it");
					}
				};

				assertRestHasUrlCtx(rest);
				urlString = url(rest.urlCtx)
			}

			const fetchArgs =  [
				urlString,
				{ signal, ...fetchOpts }
			] as const;
			const handleFetchErr = (res: Response) => { if (!res.ok) throw new Error(res.statusText); return res };
			const toJson = (res: Response) => res.json();
			const setStateAndReturn = (data: WantedJson) => { setState__internal(data as State); return data }; // TODO FIXME
			const handleSucc = (data: WantedJson) => onSuccess?.(data, null);
			const handleErr = (e: any) => {
				console.error(e);
				onError?.(e, { defaultValue: defaultValue.current });
			}
			const setLoadingTrue = () => setIsLoading(true);
			const setLoadingFalse = () => setIsLoading(false);

			setLoadingTrue();

			fetch(...fetchArgs)
				.then(handleFetchErr)
				.then(toJson)
				.then(getDataFromResponse)
				.then(setStateAndReturn)
				.then(handleSucc)
				.catch(handleErr)
				.finally(setLoadingFalse)

			return abort;

			/**
			 * the user controls the dependencies themselves.
			*/
	}, dependencies);

		return [state, setStateManual, isLoading] as const;
	};
}

export default createUseFetchedState;
