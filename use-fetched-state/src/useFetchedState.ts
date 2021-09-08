/* eslint-disable indent */
import { useState, useEffect, Dispatch, SetStateAction, useCallback } from "react";

import { abc } from "./abortController";

export type FetchOpts = Parameters<typeof fetch>[1];

export type OnManualSetStateCtx<State> = {
	prevState: State,
	newState: State,
	setIsLoading: Dispatch<SetStateAction<boolean>>
};
export type OnManualSetState<State> = undefined | ((ctx: OnManualSetStateCtx<State>) => any);

export interface UseFetchedStateBaseOptions<
	FetchedData,
	InitialData,
	State extends FetchedData | InitialData = FetchedData | InitialData
> {
	fetchOpts?: FetchOpts;
	shouldFetch?: (ctx: { setState: Dispatch<SetStateAction<State>> }) => boolean;
	onSuccess?: (data: FetchedData, ctx: null) => any;
	onError?: (e: any, ctx: { defaultValue: InitialData }) => any;
	onManualSetState?: OnManualSetState<State>;
}

export function createUseFetchedState<FetchedData, CreateUrlContext = unknown>(
	url: (urlCtx: CreateUrlContext) => string, //
	getDataFromResponse: (data: any) => FetchedData
): <InitialData = FetchedData, State extends FetchedData | InitialData = FetchedData | InitialData>(
	defaultValue: InitialData, //
	dependencies: any[],
	opts: UseFetchedStateBaseOptions<FetchedData, InitialData, State> & {
		urlCtx: CreateUrlContext;
	}
) => readonly [State, Dispatch<SetStateAction<State>>, boolean];

export function createUseFetchedState<FetchedData>(
	url: string, //
	getDataFromResponse: (data: any) => FetchedData
): <InitialData = FetchedData, State extends FetchedData | InitialData = FetchedData | InitialData>(
	defaultValue: InitialData, //
	dependencies: any[],
	opts?: UseFetchedStateBaseOptions<FetchedData, InitialData, State>
) => readonly [State, Dispatch<SetStateAction<State>>, boolean];

export function createUseFetchedState<FetchedData, CreateUrlContext = unknown>(
	url: ((urlCtx: CreateUrlContext) => string) | string, //
	getDataFromResponse: (data: any) => FetchedData
) {
	return function useFetchedState<InitialData = FetchedData, State extends FetchedData | InitialData = FetchedData | InitialData>(
		defaultValue: InitialData,
		dependencies: any[],
		{
			fetchOpts,
			urlCtx,
			shouldFetch = () => true,
			onSuccess = () => {},
			onError = () => {},
			onManualSetState = () => {},
		}: UseFetchedStateBaseOptions<FetchedData, InitialData, State> & {
			urlCtx?: CreateUrlContext;
		}
	): readonly [State, Dispatch<SetStateAction<State>>, boolean] {
		const [state, setState__internal] = useState<State>(defaultValue as State); /** TODO FIXME */
		const [isLoading, setIsLoading] = useState<boolean>(false);

		const setStateManual: Dispatch<SetStateAction<State>> = useCallback((newStateOrFn: SetStateAction<State>): void => {
			setState__internal((currState): State => {
				const newState: State = newStateOrFn instanceof Function ? newStateOrFn(currState) : newStateOrFn;

				onManualSetState?.({
					prevState: currState, //
					newState,
					setIsLoading
				});

				return newState;
			});
		}, [setState__internal, onManualSetState, setIsLoading]);

		const { signal, abort } = abc();

		const fetchArgs =  [
			url instanceof Function ? url(urlCtx!) : url, //
			{ signal, ...fetchOpts }
		] as const;
		const handleFetchErr = (res: Response) => { if (!res.ok) throw new Error(res.statusText); return res };
		const toJson = (res: Response) => res.json();
		const setStateAndReturn = (data: FetchedData) => { setState__internal(data as State); return data }; // TODO FIXME
		const handleSucc = (data: FetchedData) => onSuccess?.(data, null);
		const handleErr = (e: any) => {
			console.error(e);
			onError?.(e, { defaultValue });
		}
		const setLoadingTrue = () => setIsLoading(true);
		const setLoadingFalse = () => setIsLoading(false);

		useEffect(() => {
			if (shouldFetch && !shouldFetch({setState})) {
				return;
			}

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
