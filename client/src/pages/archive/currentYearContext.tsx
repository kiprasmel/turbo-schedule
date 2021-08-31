import { createGeneralContext } from "../../utils/createGeneralContext";
import { defaultYearRange, getYearRanges } from "./getYearRanges";

export const [CurrentYearCtx, CurrentYearCtxProvider] = createGeneralContext(() => getYearRanges(), defaultYearRange);
