import { dynamicRequire } from "./dynamicRequire";

export const performanceNow = (): number =>
	performance ? performance.now() : dynamicRequire("perf_hooks").performance.now();
