/**
 * dependency injection boyz
 *
 * instead of calling `initDb` every time you need the database,
 * you just call `injectDb` once in you
 *
 * TODO FIXME WARN - there're issues with typescript's project references
 * & dependency injection - it doesn't work lmao
 * oh boy...
 */

import { Db } from "./config";
import { setNewDbState, NewStateOpts, DbStateReturn } from "./setNewDbState";

// eslint-disable-next-line import/no-mutable-exports
let db: Db;

export { db };

/**
 * Injects the database into the exported `db`!
 * `db` cannot be used before `injectDb` has injected it.
 */
export const injectDb = async (newStateOpts: Partial<NewStateOpts>): Promise<DbStateReturn> => {
	const ret = await setNewDbState(undefined, newStateOpts);

	/** inject it */
	db = ret.db;

	return ret;
};
