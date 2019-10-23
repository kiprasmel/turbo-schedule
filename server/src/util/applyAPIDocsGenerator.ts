/** TODO - move to `server/script`? */

import { Express } from "express";
import expressOasGenerator from "express-oas-generator";
import fs, { pathExistsSync, removeSync } from "fs-extra";

// export const applyAPIDocsGenerator = (app: Express, savePath: string | undefined = undefined) => {
export const applyAPIDocsGenerator = (app: Express, savePathAndFilename: string): void => {
	try {
		if (process.env.NODE_ENV === "production") {
			/**
			 * this SHALL NOT be used in production!
			 */

			return;
		}

		/** clean up the old generated thing */
		if (!!savePathAndFilename && pathExistsSync(savePathAndFilename)) {
			removeSync(savePathAndFilename);
		}

		const delay: number = 2000;

		expressOasGenerator.init(
			app,
			(spec: any) => {
				let pkgPath: string | null = null;

				if (fs.pathExistsSync("../../package.json")) {
					pkgPath = "../../package.json";
				} else if (fs.pathExistsSync("../../../package.json")) {
					pkgPath = "../../../package.json";
				}

				const pkgName: string = (!!pkgPath && fs.readJSONSync(pkgPath).name) || "@turbo-schedule/server";

				spec.info.title = `${pkgName} REST API v1`;

				return spec;
			},
			savePathAndFilename,
			delay,
			"api-docs"
			// () => modifyGeneratedAPIDocs(savePathAndFilename) /** TODO FUTURE */
		);
	} catch (err) {
		console.error("  ! Error:\n", err);
	}
};
