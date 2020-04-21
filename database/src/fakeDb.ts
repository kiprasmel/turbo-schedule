import fs from "fs-extra";

import { Db, DbSchema, defaultDbState, defaultDatabaseDataDirPath } from "./config";
import { initDb } from "./initDb";

export interface InitFakeDbRet {
	cleanupDb: () => Promise<void>;
	db: Db;
}

/**
 * BAD, because we need a static path oh ffs lmao,
 * back to square one...
 */
export const initFakeDb = async (newDbState: Partial<DbSchema> = {}): Promise<InitFakeDbRet> => {
	const db: Db = await initDb();
	await db.setState({ ...defaultDbState, ...newDbState });

	const cleanupFakeDb = async (): Promise<void> => {
		await fs.remove(defaultDatabaseDataDirPath);
	};

	return { cleanupDb: cleanupFakeDb, db };
};
