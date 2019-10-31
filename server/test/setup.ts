// setup.ts
// import request, { SuperTest, Test } from "supertest";
import { Server } from "http";

import { delay } from "@turbo-schedule/common";
import { startServer } from "../src/server";
import { startFakeDbSync } from "./fakeDb";

/**
 * see https://stackoverflow.com/a/44387594
 */
declare global {
	namespace NodeJS {
		interface Global {
			// agent: SuperTest<Test>;
			server: Server;
			stopFakeDbSync: () => void;
		}
	}
}

const setup = async (_config: jest.GlobalConfig) => {
	// global.agent = request(global.server);
	global.server = startServer();
	global.stopFakeDbSync = startFakeDbSync();

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
