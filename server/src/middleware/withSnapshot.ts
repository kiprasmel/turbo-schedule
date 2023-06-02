import { databaseFileName } from "@turbo-schedule/database";
import { Request, Response, NextFunction } from "express";

// TODO
export function withSnapshot(
	req: Request, //
	res: Response,
	next: NextFunction
): void /*: asserts res is (Response & { snapshot: string }) */ {
	const snapshot = req.query.snapshot || databaseFileName;
	res.snapshot = snapshot;
	next();
}
