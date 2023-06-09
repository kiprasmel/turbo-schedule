import workerpool from "workerpool";

import { computeCommonAvailability } from "@turbo-schedule/common";

/**
 * https://github.com/josdejong/workerpool#dedicated-workers
 */

workerpool.worker({
	computeCommonAvailability,
});
