import { RequestHandler } from "express";

import { apiDocsRoutePath } from "../config";

export const redirectToApiDocs: RequestHandler = (_req, res, next): void => {
	if (!res.headersSent) {
		res.redirect(apiDocsRoutePath);
	}

	next();

	return;
};
