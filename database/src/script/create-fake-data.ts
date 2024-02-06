#!/usr/bin/env ts-node-dev

import { createFakeData } from "./module/createFakeData";

async function main() {
	try {
		await createFakeData();
	} catch (e) {
		throw e;
	} finally {
		console.log("\n /create-fake-data\n");
	}
}

main()
