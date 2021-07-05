/* eslint-disable indent */

import { Request, Response, NextFunction } from "express";
import { Sender } from "express-serve-static-core";

import { isProd } from "../util/isProd";

export interface WithErr<E = unknown> {
	err?: E;
}

export function createSender<_T, E = unknown, T extends _T & WithErr<E> = _T & WithErr<E>>(
	res: Response<T>, //
	next: NextFunction,
	defaultData: T
): Sender<T> {
	function sender(
		code: number,
		_data: typeof shouldMergeDefaultData extends true | undefined ? Partial<T> : T,
		shouldMergeDefaultData: false
	): void;

	function sender(
		code: number,
		_data: typeof shouldMergeDefaultData extends true | undefined ? Partial<T> : T,
		shouldMergeDefaultData?: true
	): void;

	function sender(
		code: number, //
		_data: T | Partial<T>,
		shouldMergeDefaultData: false | true = true
	): void {
		/**
		 * `as T` is still sound here,
		 * because either the data is already T,
		 * or it is Partial<T> and then we merge the default data,
		 * making it T too.
		 */
		let data: T = _data as T;

		if (shouldMergeDefaultData) {
			data = { ...defaultData, ...data };
		}

		res.status(code).json(data);
		if (data.err) console.error(data.err);
		return !isProd() ? (data.err ? next(data.err) : next()) : res.end();
	}

	return sender;
}

export const withSender = <T>(defaultData: T) => (_req: Request, res: Response<T>, next: NextFunction): void => {
	const send = createSender(res, next, defaultData);
	res.sender = send;
	next();
};
