import { ReadonlyTuple } from "./Tuple";

export const remapEntries = <T extends Record<any, any>>(
    obj: T,
    onEntry: (entry: T extends Record<infer K, infer V> ? ReadonlyTuple<K, V> : never) => T extends Record<infer K, infer V> ? ReadonlyTuple<K, V> | null : never
): T => Object.fromEntries(Object.entries(obj).map((entry) => onEntry(entry as any /** TODO TS */)).filter((x): x is NonNullable<typeof x> => x !== null)) as T
