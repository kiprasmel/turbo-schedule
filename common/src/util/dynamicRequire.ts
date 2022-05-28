/**
 * ```ts
 * require("foo")
 * ```
 *
 * vs
 *
 * ```ts
 * const foo = "foo"
 * require(foo)
 * ```
 *
 */
// eslint-disable-next-line import/no-dynamic-require,@typescript-eslint/explicit-function-return-type
export const dynamicRequire = (name: Parameters<NodeRequire>[0]) => require(name);
