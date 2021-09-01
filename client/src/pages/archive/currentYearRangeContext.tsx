import { defaultYearRange, getYearRanges } from "@turbo-schedule/common";

import { createGeneralContext } from "../../utils/createGeneralContext";

export const [CurrentYearRangeCtx, CurrentYearRangeCtxProvider] = createGeneralContext(
	() => getYearRanges(), //
	defaultYearRange
);
