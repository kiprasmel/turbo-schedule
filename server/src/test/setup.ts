// setup.ts
// import request, { SuperTest, Test } from "supertest";
import { Server } from "http";
import fs from "fs-extra";

import { setNewDbState } from "@turbo-schedule/database";

import { startServer } from "../server";

/**
 * see https://stackoverflow.com/a/44387594
 */
declare global {
	namespace NodeJS {
		interface Global {
			// agent: SuperTest<Test>;
			server: Server;
			stopFakeDb: () => Promise<void>;
		}
	}
}

const setup = async (_config: jest.GlobalConfig) => {
	const { databaseDirPath } = await setNewDbState({});

	global.stopFakeDb = async () => {
		await fs.remove(databaseDirPath);
	};

	global.server = startServer({ doNotScrapeContent: true });
};

export default setup;
