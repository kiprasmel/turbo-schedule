import { Router } from "express";

const router: Router = Router();

/** all routes for `v1` of the api */
import { studentRouter } from "./student";
import { emailRouter } from "./email";

router.use("/student", studentRouter);
router.use("/email", emailRouter);

// router.use("/docs", openAPIDocsHandler);

router.use("/docs", (_req, res) => {
	const html: string = `
		<redoc spec-url="http://localhost:5000/api/docs"></redoc>

		<!--  NOTE - the script MUST come AFTER the 'redoc' thing lmao  -->
		<script src="https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js"> </script>
	`;

	res.setHeader("Content-Type", "text/html");
	res.send(html);
});

export { router as apiRouterV1 };
