// jest.config.js
/**
 * https://jestjs.io/docs/en/configuration
 */

const { defaults } = require("jest-config");

module.exports = {
	...defaults,
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
	testEnvironment: "node",
	globalSetup: "./setup.ts",
	globalTeardown: "./teardown.ts",
	/**
	 * `jest-serial-runner` is exactly the same, just sets `isSerial: true` to make tests run one-by-one.
	 * See https://stackoverflow.com/a/57609093/9285308
	 *
	 * (currently not needed)
	 */
	// runner: "jest-serial-runner",
};
