import { Router } from "express";

import { apiRouterV1 } from "./v1/apiV1";
import { redirectToApiDocs } from "../util/redirectToApiDocs";
import { withSnapshot } from "../middleware/withSnapshot";

const router: Router = Router();

router.use("/v1", withSnapshot, apiRouterV1);

router.use("/", redirectToApiDocs);

export { router as apiRouter };

export * from "./v1/apiV1";
