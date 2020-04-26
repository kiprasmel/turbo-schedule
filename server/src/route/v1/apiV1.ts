import { Router } from "express";

import { scheduleItemRouter } from "./schedule-item";
import { classRouter } from "./class";
import { studentRouter } from "./student";
import { teacherRouter } from "./teacher";
import { emailRouter } from "./email";
import { openAPIDocsJSONHandler, openAPIDocsHTMLHandler } from "./openAPIDocs";

const router: Router = Router();

router.use("/schedule-item", scheduleItemRouter); /** combines `class` & `student` */
router.use("/class", classRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/email", emailRouter);

router.use("/docs", openAPIDocsHTMLHandler);
router.use("/docs.json", openAPIDocsJSONHandler);

export { router as apiRouterV1 };
