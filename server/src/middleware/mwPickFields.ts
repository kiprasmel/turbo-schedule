import { Request, Response, NextFunction } from "express";

const debug = require("debug")("turbo-schedule:server:mwPickFields");

export const mwPickFields = (req: Request, res: Response, next: NextFunction): void => {
	console.log("mwPickFields");
	const { _fields } = req.query;

	debug("query._fields", _fields);

	if (!_fields) {
		return next();
	}

	const fields: string[] = !Array.isArray(_fields) ? [_fields] : _fields;

	debug("fields", fields);

	console.log("res.locals", JSON.stringify(res.locals.data));

	return next();
};
