// jest.config.js
/**
 * https://jestjs.io/docs/en/configuration
 */

const { defaults } = require('jest-config');

module.exports = {
	...defaults,
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	"testEnvironment": "node",
	globalSetup: "./setup.ts",
}
