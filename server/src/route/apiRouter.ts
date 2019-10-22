import { Router } from "express";
import { apiRouterV1 } from "./v1/apiV1";

const router: Router = Router();

router.use("/v1", apiRouterV1);

export { router as apiRouter };
