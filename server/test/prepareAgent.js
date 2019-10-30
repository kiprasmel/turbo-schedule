// callStartServer.js

/**
 * BROKEN
 *
 * The configuration must be JSON-seriazable,
 * meaning we cannot have functions:
 * https://jestjs.io/docs/en/next/configuration#globals-object
 * https://github.com/facebook/jest/issues/7184
 *
 * ---
 *
 * mean to be used as a global variable
 * for persistant testing with the same express `app`.
 *
 * https://jestjs.io/docs/en/configuration#globals-object
 */

/**
 * allow typescript imports etc
 * https://github.com/TypeStrong/ts-node/issues/625#issuecomment-401660263
 */
process.env.TS_NODE_FILES = true;
require("ts-node/register");

const request = require("supertest");
const { app } = require("../src/server");

const agent = request.agent(app);

module.exports = {
	agent
}
