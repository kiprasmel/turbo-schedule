#!/usr/bin/env ts-node-dev

import { createFakeData } from "./module/createFakeData";

try {
	createFakeData();
} catch (e) {
	throw e;
} finally {
	console.log("\n /create-fake-data\n");
}
