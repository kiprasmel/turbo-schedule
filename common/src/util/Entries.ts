import { Tuple } from "./Tuple";

export type Entry<T extends Record<any, any>> = Tuple<keyof T, T[keyof T]>;
export type Entries<T extends Record<any, any>> = Entry<T>[];
