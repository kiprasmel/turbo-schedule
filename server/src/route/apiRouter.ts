import { Router } from "express";
import { apiRouterV1 } from "./v1/apiV1";

const router: Router = Router();

router.use("/v1", apiRouterV1);

/** default to the latest API (MUST be the last route) */
router.use("/", apiRouterV1);

export { router as apiRouter };
