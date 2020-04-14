import { Router } from "express";

import { classRouter } from "./class";
import { studentRouter } from "./student";
import { emailRouter } from "./email";
import { openAPIDocsJSONHandler, openAPIDocsHTMLHandler } from "./openAPIDocs";

const router: Router = Router();

router.use("/class", classRouter);
router.use("/student", studentRouter);
router.use("/email", emailRouter);

router.use("/docs", openAPIDocsHTMLHandler);
router.use("/docs.json", openAPIDocsJSONHandler);

export { router as apiRouterV1 };
