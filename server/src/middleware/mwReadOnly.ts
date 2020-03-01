import { Request, Response, NextFunction } from "express";

export const mwReadOnly = (req: Request, res: Response, next: NextFunction): void => {
	if (req.method !== "GET") {
		res.status(403).send();
	} else {
		next();
	}
};
