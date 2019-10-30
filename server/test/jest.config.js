// jest.config.js
/**
 * https://jestjs.io/docs/en/configuration
 */

const { defaults } = require('jest-config');

// const { agent } = require("./prepareAgent");

module.exports = {
	...defaults,
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	"testEnvironment": "node",
}

    // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	// globals: {
    // 	'ts-jest': {
	// 		diagnostics: false
    //   		// diagnostics: {
    //     	// 	pathRegex: /\.(spec|test)\.ts$/
    //   		// }
    // 	},
	// 	"agent": agent
	// }
	// "testEnvironment": "./callTestEnvironment.js",
	// setupFiles: [
	// 	"./setupFiles.ts" //
	// ]
