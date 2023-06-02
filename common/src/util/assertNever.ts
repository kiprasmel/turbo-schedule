export function assertNever(x: never): never {
	const err = `expected x to be never at compile time, but received "${x}"`;
	throw new Error(err);
}
