// setup.ts
// import request, { SuperTest, Test } from "supertest";
import { Server } from "http";
import fs from "fs-extra";

import { delay } from "@turbo-schedule/common";
import { setNewDbState } from "@turbo-schedule/database";

import { startServer } from "../src/server";

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
	// global.agent = request(global.server);
	const { dbStorageDirPath } = await setNewDbState({});

	global.stopFakeDb = async () => {
		await fs.remove(dbStorageDirPath);
	};

	global.server = startServer();

	/**
	 * TODO UPSTREAM
	 * express-oas-generator init
	 *
	 * I made a PR to solve this;
	 * hopefully we can finish it soon.
	 *
	 * https://github.com/mpashkovskiy/express-oas-generator/pull/39
	 *
	 */
	await delay(1500);
};

export default setup;
