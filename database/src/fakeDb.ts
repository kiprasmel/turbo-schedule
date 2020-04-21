import fs from "fs-extra";

import { Db, DbSchema } from "./config";
import { setNewDbState } from "./setNewDbState";

export interface InitFakeDbRet {
	cleanupDb: () => Promise<void>;
	db: Db;
}

/**
 * BAD, because we need a static path oh ffs lmao,
 * back to square one...
 */
export const initFakeDb = async (newDbState: Partial<DbSchema> = {}): Promise<InitFakeDbRet> => {
	const { db, databaseDirPath } = await setNewDbState(newDbState, { shouldHashDataDirPath: true });

	const cleanupFakeDb = async (): Promise<void> => {
		await fs.remove(databaseDirPath);
	};

	return { cleanupDb: cleanupFakeDb, db };
};
