import { Router } from "express";
import { apiRouterV1 } from "./v1/apiV1";
import { openAPIDocsHandler } from "./openAPIDocs";
// import swaggerUi from "swagger-ui-express";

const router: Router = Router();

/**
 * @swagger
 * /api/v1:
 *	get:
 *		description: version 1 of the API
 *			responses: 200
 */
router.use("/v1", apiRouterV1);

router.use("/docs", openAPIDocsHandler);

/**
 * @swagger
 * /api-docs:
 *   get:
 * 	   description: get some stuff
 */
// router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIDocs));

export { router as apiRouter };
