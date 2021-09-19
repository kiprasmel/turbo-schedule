/* eslint-disable @typescript-eslint/camelcase */

import { noop } from "@turbo-schedule/common";

import { SelfWithKeysRecursively } from "./selfWithKeysRecursively";

type A1 = SelfWithKeysRecursively<{ a?: 1 }>;
const a1_1: A1 = { a: 1 };
const a1_2: A1 = 1;
const a1_3: A1 = undefined;
noop(a1_1, a1_2, a1_3);

type A2 = SelfWithKeysRecursively<{ a: 1 }>;
const a2_1: A2 = { a: 1 };
const a2_2: A2 = 1;
noop(a2_1, a2_2);

type A3 = SelfWithKeysRecursively<{}>;
const a3_1: A3 = {};
// @ts-expect-error
const a3_2: A3 = null;
noop(a3_1, a3_2);

type A4 = SelfWithKeysRecursively<undefined>;
const a4_1: A4 = undefined;
noop(a4_1);

type A5 = SelfWithKeysRecursively<1>;
const a5_1: A5 = 1;
noop(a5_1);

type A6<X = unknown, Y extends SelfWithKeysRecursively<X> = SelfWithKeysRecursively<X>> = Y;
const a6_1: A6<1> = 1;
const a6_2: A6<true> = true;
// // @ts-expect-error
const a6_3: A6<true> = () => false; // TODO should ERR
// @ts-expect-error
const a6_4: A6 = 1; // ERR
const a6_5: A6<number> = 1;
noop(a6_1, a6_2, a6_3, a6_4, a6_5);

type B1 = SelfWithKeysRecursively<{ a: { b?: 2 } }>;
const b1_1: B1 = 2;
const b1_2: B1 = undefined;
const b1_3: B1 = { b: 2 };
const b1_4: B1 = { a: { b: 2 } };
// @ts-expect-error
const b1_5: B1 = { b: { a: 2 } };
// @ts-expect-error
const b1_6: B1 = { c: { a: 2 } };
const b1_7: B1 = {};
noop(b1_1, b1_2, b1_3, b1_4, b1_5, b1_6, b1_7);

type C1 = SelfWithKeysRecursively<{ a?: { b: 2 } }>;
const c1_1: C1 = 2;
const c1_2: C1 = undefined;
const c1_3: C1 = { b: 2 };
const c1_4: C1 = { a: { b: 2 } };
// @ts-expect-error
const c1_5: C1 = { a: 2 };
// @ts-expect-error
const c1_6: C1 = { b: { a: 2 } };
noop(c1_1, c1_2, c1_3, c1_4, c1_5, c1_6);

// @ts-expect-error
type D1 = SelfWithKeysRecursively<string>; // TODO no err
const d1_1: D1 = "lmao";
noop(d1_1);

type D2 = SelfWithKeysRecursively<"kekw">;
const d2_1: D2 = "kekw";
const d2_2: D2 = "lmao"; // TODO should ERR
noop(d2_1, d2_2);

type E1 = SelfWithKeysRecursively<number>;
const e1_1: E1 = 2;
noop(e1_1);

type F1 = SelfWithKeysRecursively<symbol>;
const f1_1: F1 = Symbol("lmao");
const f1_2: F1 = "lmao"; // TODO ERR ?
const f1_3: F1 = 123; // TODO ERR ?
noop(f1_1, f1_2, f1_3);
