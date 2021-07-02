/* eslint-disable indent */

import { Request, Response, NextFunction } from "express";

import { isProd } from "../util/isProd";

export interface WithErr<E = unknown> {
	err?: E;
}

export const createSend = <_T, E = unknown, T extends _T & WithErr<E> = _T & WithErr<E>>(
	res: Response<T>, //
	next: NextFunction,
	defaultData: T
) => (code: number, data: T = defaultData): T => {
	res.status(code).json(data);

	if (data.err) console.error(data.err);

	if (!isProd()) {
		if (data.err) next(data.err);
		else next();
	} else res.end();

	return data;
};

export const withSender = <T>(defaultData: T) => (_req: Request, res: Response<T>, next: NextFunction): T => {
	const send = createSend(res, next, defaultData);
	res.sender = send;
	next();
	return defaultData; /** work-around, real magic happens in `sender` */
};
