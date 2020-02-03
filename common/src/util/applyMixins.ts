/**
 * https://www.typescriptlang.org/docs/handbook/mixins.html
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyMixins(derivedCtor: any, baseCtors: any[]): void {
	baseCtors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			Object.defineProperty(
				derivedCtor.prototype,
				name,
				/** I had to put a `!` here because typescript itself complained lmao */
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!
			);
		});
	});
}
