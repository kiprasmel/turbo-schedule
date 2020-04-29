import { Router } from "express";

import { participantRouter } from "./participant";
import { classRouter } from "./class";
import { studentRouter } from "./student";
import { teacherRouter } from "./teacher";
import { roomRouter } from "./room";
import { emailRouter } from "./email";
import { openAPIDocsJSONHandler, openAPIDocsHTMLHandler } from "./openAPIDocs";

const router: Router = Router();

router.use("/participant", participantRouter);
router.use("/class", classRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/room", roomRouter);

router.use("/email", emailRouter);

router.use("/docs", openAPIDocsHTMLHandler);
router.use("/docs.json", openAPIDocsJSONHandler);

/** default to the docs (MUST be the last route) */
router.use("/", openAPIDocsHTMLHandler);

export { router as apiRouterV1 };
