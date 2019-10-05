import { Router } from "express";

const router: Router = Router();

/** all routes for `v1` of the api */
import { studentRouter } from "./student";
import { emailRouter } from "./email";

router.use("/student", studentRouter);
router.use("/email", emailRouter);

export { router as apiRouterV1 };
