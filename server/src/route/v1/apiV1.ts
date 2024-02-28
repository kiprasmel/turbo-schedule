import { Router } from "express";

import { participantRouter } from "./participant";
import { classRouter } from "./class";
import { studentRouter } from "./student";
import { teacherRouter } from "./teacher";
import { roomRouter } from "./room";
import { emailRouter } from "./email";
import { healthRouter } from "./health";
import { openAPIDocsJSONHandler, openAPIDocsHTMLHandler } from "./openAPIDocs";
import { redirectToApiDocs } from "../../util/redirectToApiDocs";
// import { archiveRouter } from "./archive";

const router: Router = Router();

router.use("/health", healthRouter);
// router.use("/archive", archiveRouter);

router.use("/participant", participantRouter);
router.use("/class", classRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/room", roomRouter);

router.use("/email", emailRouter);

router.use("/docs", openAPIDocsHTMLHandler);
router.use("/docs.json", openAPIDocsJSONHandler);

router.use("/", redirectToApiDocs);

export { router as apiRouterV1 };

export * from "./participant";
export * from "./archive";
/**
 * TODO: type-safe routes with exported response types:
 */
// export * from "./class";
// export * from "./student";
// export * from "./teacher";
// export * from "./room";
