// testEnvironment.ts
/**
 * I've tried
 * https://jestjs.io/docs/en/configuration.html#globalsetup-string &
 * https://jestjs.io/docs/en/configuration.html#globalteardown-string,
 * but:
 * "Note: Any global variables that are defined through globalSetup can only be read in globalTeardown. You cannot retrieve globals defined here in your test suites."
 * and that breaks everything. ffs jest
 *
 * EDIT:
 * "Note: TestEnvironment is sandboxed. Each test suite will trigger setup/teardown in their own TestEnvironment."
 *
 * FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU
 *
 * TODO:
 *
 * Use `setup` & `teardown`, since they're actually what you want & expect
 * and they are actually called only once per ALL test files FFS!
 * And get rid of `supertest` and instead just use a regular data fetcher
 * like axios/fetch etc. and just start the server inside `setup`,
 * because as it seems to me atm, there's no way to both have a one-time setup
 * AND have a global variable available outside it. FFS!!!
 *
 */

import NodeEnvironment from "jest-environment-node";
import { Script, Context } from "vm";
import { Global, Config } from "@jest/types";

import request, { SuperTest, Test } from "supertest";

import { startFakeDbSync } from "./fakeDb";
import { startServer } from "../src/server";
import { Server } from "http";

export interface MyGlobal extends Global.Global {
	agent: SuperTest<Test>;
}

export class CustomEnvironment extends NodeEnvironment {
	/** reachable inside tests suites through `global` */
	public global!: MyGlobal;

	private server: Server = new Server();
	private stopFakeDbSync: () => void = () => {};

	// private testPath: any = null;
	// private docblockPragmas: any = null;

	constructor(config: Config.ProjectConfig, _context: Context) {
		/** this would only apply if we extend `JestEnvironment` */
		// // super(config, context);
		super(config);

		// this.testPath = context.testPath;
		// this.docblockPragmas = context.docblockPragmas;
	}

	async setup() {
		await super.setup();

		this.stopFakeDbSync = startFakeDbSync();
		this.server = startServer();

		/** globals */
		this.global.agent = request.agent(this.server);

		/** TODO - use or delete */
		// Will trigger if docblock contains @my-custom-pragma my-pragma-value
		// if (this.docblockPragmas["my-custom-pragma"] === "my-pragma-value") {
		// 	// ...
		// }
	}

	async teardown() {
		this.server.close();
		this.stopFakeDbSync();

		await super.teardown();
	}

	runScript(script: Script) {
		return super.runScript(script);
	}

	// handleTestEvent(event, state) {
	// 	if (event.name === "test_start") {
	// 		// ...
	// 	}
	// }
}
