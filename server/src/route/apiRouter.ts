import { Router } from "express";
import { apiRouterV1 } from "./v1/apiV1";
import { openAPIDocsHandler } from "./openAPIDocs";

const router: Router = Router();

router.use("/v1", apiRouterV1);

router.use("/docs", openAPIDocsHandler);

export { router as apiRouter };
