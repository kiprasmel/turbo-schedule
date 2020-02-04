import fs from "fs-extra";
import { parse } from "path";
import { toJson } from "@turbo-schedule/common";

/**
 * returns either the cached resource
 * OR
 * creates the new resources, caches it & returns it
 *
 * ~~TODO get rid of it~~ done
 * TODO DELETE
 *
 */
export const memoize = async <T>(cacheFilePath: string, createResourceCb: () => Promise<T>): Promise<T> => {
	try {
		let resource: T;

		if (!(await fs.pathExists(cacheFilePath))) {
			resource = await createResourceCb();

			const cachedResource: string = toJson(resource);

			await fs.ensureDir(parse(cacheFilePath).dir);
			await fs.writeFile(cacheFilePath, cachedResource, { encoding: "utf-8" });
		} else {
			/** reverse */
			console.log("memoized resources available.");
			const cachedResource: string = await fs.readFile(cacheFilePath, { encoding: "utf-8" });
			resource = JSON.parse(cachedResource);
		}

		return resource;
	} catch (e) {
		console.error("memoize:", e);
		return Promise.reject(e);
	}
};

export const memoizeSync = <T>(cacheFilePath: string, createResourceCb: () => T): T => {
	try {
		let resource: T;

		if (!fs.pathExistsSync(cacheFilePath)) {
			resource = createResourceCb();

			const cachedResource: string = toJson(resource);

			fs.ensureDirSync(parse(cacheFilePath).dir);
			fs.writeFileSync(cacheFilePath, cachedResource, { encoding: "utf-8" });
		} else {
			/** reverse */
			console.log("memoized resources available.");
			const cachedResource: string = fs.readFileSync(cacheFilePath, { encoding: "utf-8" });
			resource = JSON.parse(cachedResource);
		}

		return resource;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

/**
 * TODO - old/new way of operating with the config is required (see paper)
 * so that we don't need to pass in the `cacheFilePath` variable -
 * it'd just be available from the static config!
 *
 * Oh wait nvm every student is different lol
 */
// export const memoizeNew = async <T>(createResourceCb: () => any /** TODO */): Promise<T> => {
// 	try {
// 		let resource: T;

// 		if (!(await fs.pathExists(cacheFilePath))) {
// 			/**
// 			 * the `createResource` callback might or might not be async.
// 			 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
// 			 */
// 			resource = await createResourceCb();

// 			let cachedResource: string = JSON.stringify(resource);
// 			cachedResource = prettier.format(cachedResource, { parser: "json" });

// 			await fs.writeFile(cacheFilePath, cachedResource, { encoding: "utf-8" });
// 		} else {
// 			/** reverse */
// 			const cachedResource: string = await fs.readFile(cacheFilePath, { encoding: "utf-8" });
// 			resource = JSON.parse(cachedResource);
// 		}

// 		return resource;
// 	} catch (e) {
// 		console.error(e);
// 		return Promise.reject(e);
// 	}
// };
