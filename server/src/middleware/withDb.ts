/* eslint-disable indent */

import { Request, Response, NextFunction } from "express";

import { Db, tryFindDbStorageFileByYearRange, initDb } from "@turbo-schedule/database";
import { defaultYearRange, latestYearRange } from "@turbo-schedule/common";

export const withDb = async <T = unknown>(req: Request, res: Response<T>, next: NextFunction): Promise<void> => {
	const currentYearRange =
		req.query["yearRange"] ?? //
		req.query["yearrange"] ??
		req.query["year-range"] ??
		req.query["year_range"] ??
		defaultYearRange;

	if (currentYearRange === latestYearRange) {
		(res as any).getdb = async () => await initDb();
		(res as any).initOtherDbs = async (): Promise<Db[]> => [];
	} else {
		try {
			const [dbStorageFile, otherDbStorageFiles] = await tryFindDbStorageFileByYearRange(currentYearRange);
			// console.log("dbStorageFile", dbStorageFile, otherDbStorageFiles);

			(res as any).getdb = async () => await initDb(dbStorageFile);
			(res as any).initOtherDbsParallel = async (): Promise<Db[]> =>
				await Promise.all(otherDbStorageFiles.map(async (file) => await initDb(file)));
			(res as any).initOtherDbsSequential = (): Promise<Db>[] =>
				otherDbStorageFiles.map(async (file) => await initDb(file));
		} catch (e) {
			return next(e);
		}
	}

	// console.log(
	// 	"db.getState()",
	// 	((res as any).db as Db).getState().participants.filter((p) => p.text.includes("Kipras"))
	// );

	next();
};
