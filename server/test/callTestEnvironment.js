/**
 * omg why the f do I have to deal with this myself
 */

/**
 * https://github.com/TypeStrong/ts-node/issues/625#issuecomment-401660263
 */
process.env.TS_NODE_FILES = true;

require("ts-node/register");

const { CustomEnvironment } = require("./testEnvironment");

module.exports = CustomEnvironment;
