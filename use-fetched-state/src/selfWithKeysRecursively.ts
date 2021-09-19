/**
 *
 * given this:
 *
 * ```ts
 * type DeepObj = {
 * 	a: {
 * 		b: {
 * 			c: {
 * 				d: 69
 * 			}
 * 		}
 * 	}
 * }
 * ```
 *
 * can type-safely do this:
 *
 * ```ts
 * function foo<ArbitraryDeepObj, X extends SelfWithKeysRecursively<ArbitraryDeepObj>>(_x: X) {}
 *
 * foo<DeepObj, DeepObj>({ a: { b: { c: { d: 69}}}})
 * foo<DeepObj, DeepObj["a"]>({ b: { c: { d: 69}}})
 * foo<DeepObj, DeepObj["a"]["b"]>({ c: { d: 69}})
 * foo<DeepObj, DeepObj["a"]["b"]["c"]>({ d: 69})
 * foo<DeepObj, DeepObj["a"]["b"]["c"]["d"]>(69)
 * ```
 *
 */
// export type SelfWithKeysRecursively<T> =
// 	{} extends T ?
// 		{} extends keyof T ?
// 			never
// 			: (T | T extends { [K in keyof T]: T[K] } ?
// 				 T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 				 : never)
// 			: never
// 		;

// export type SelfWithKeysRecursively<T> =
// 	{} extends T
// 		? {} extends keyof T
// 			? T
// 			: (T extends { [K in keyof T]: T[K] }
// 				? T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 				: never)
// 		// : T
// 		: T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 	;

// export type SelfWithKeysRecursively<T> = {} extends T
// 	? {} extends keyof T
// 		? T
// 		: T extends { [K in keyof T]: T[K] } // ? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 			? T | SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier
// 			: T // eslint-disable-line prettier/prettier
// 	: T extends { [K in keyof T]: T[K] } // ? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 		? T | SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier
// 		: T; // eslint-disable-line prettier/prettier

// export type SelfWithKeysRecursively<T> = {} extends keyof T
// 	? T
// 	: T extends { [K in keyof T]: T[K] } // ? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 			? T | SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier
// 			: never // eslint-disable-line prettier/prettier

export type SelfWithKeysRecursively<T> = T extends { [K in keyof T]: T[K] } // ? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
		? T | SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier
		: {} extends keyof T ? T : SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier

// : T extends { [K in keyof T]: T[K] } // ? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 	? T | SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier
// 	: T; // eslint-disable-line prettier/prettier

// below - eh:

// export type SelfWithKeysRecursively<T> = {} extends T
// 	? T | (T[keyof T] extends {} ? SelfWithKeysRecursively<T[keyof T]> : T[keyof T])
// 	: T extends { [K in keyof T]: T[K] } // ? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 			? T | SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier
// 			: T // eslint-disable-line prettier/prettier

// below - meh:

// export type SelfWithKeysRecursively<T> = {} extends keyof T
// 	? {} extends T
// 		? T
// 		: T extends { [K in keyof T]: T[K] } // ? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 			? T | SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier
// 			: T // eslint-disable-line prettier/prettier
// 	: T extends { [K in keyof T]: T[K] } // ? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 		? T | SelfWithKeysRecursively<T[keyof T]> // eslint-disable-line prettier/prettier
// 		: T; // eslint-disable-line prettier/prettier

// 		;

// type SelfWithKeysRecursively<T> =
// 	({} extends T
// 		? ({} extends T[keyof T]
// 			? never
// 			: T[keyof T] | SelfWithKeysRecursively<T[keyof T]>)
// 		: (T extends { [K in keyof T]: T[K] }
// 				? T | T[keyof T] | SelfWithKeysRecursively<T[keyof T]>
// 				: T)
// 		);
