/**
 * Clean up the openAPI documentation
 * & save it as `openAPI.lean.json` (to avoid interfering with `openAPI.json`)
 *
 * @note
 * this assumes that the docs have already been generated
 * and that we only need to modify them accordingly
 *
 * TODO:
 *
 * * Auto-generate docs before invoking this
 * * Create validation here to make sure the docs are indeed already generated
 *
 * @note
 * I might want to move this to `src` instead of `script/module`
 * if we find a way to hook into the creation of the openAPI docs
 * by the `express-oas-generator`
 *
 * TODO:
 *
 * * Option to format/prettify via `prettier`?
 * * Option for save path?
 *
 */

import fs from "fs-extra";
import { join, parse } from "path";

import { OpenAPISpec } from "./index"

export function modifyGeneratedAPIDocs(savePathAndFilename: string): OpenAPISpec | undefined {
	try {
		console.log("\n => modifyGeneratedAPIDocs:");

		// const savePathAndFilename: string = join(saveDirPath, saveDirFilename);

		if (!fs.pathExistsSync(savePathAndFilename)) {
			console.error("  ! openAPI file does not exist in save path!", savePathAndFilename);
			return undefined;
		} else {
			console.log("  -> path exists: `%s`", savePathAndFilename)
		}

		let generatedDocs: OpenAPISpec = fs.readJSONSync(savePathAndFilename, { encoding: "utf-8" });

		generatedDocs = trimExampleLengthToOne(generatedDocs);

		/** write the new generated docs */
		const { dir: saveDir, name: extensionlessFilename } = parse(savePathAndFilename);

		const newFilename: string = extensionlessFilename + ".lean.json"
		const newSavePathAndFilename: string = join(saveDir, newFilename)

		if (fs.pathExistsSync(newSavePathAndFilename)) {
			console.log("  -> old file exists - removing it")
			fs.removeSync(newSavePathAndFilename);
		}

		fs.writeJSONSync(newSavePathAndFilename, generatedDocs, { encoding: "utf-8" });

		console.log("  -> saved modified openAPI docs to `%s`", newSavePathAndFilename)
		console.log("  -> new  generated openAPI docs:\n", generatedDocs);

		return generatedDocs;
	} catch (err) {
		console.error("  ! Error:\n", err);
		return undefined;
	} finally  {
		console.log(" /modifyGeneratedAPIDocs\n");
	}
}

function logEmpty(what: string) {
	console.log(`\`${what}\` not found / empty`);
}

function trimExampleLengthToOne<T extends OpenAPISpec>(generatedDocsReference: T): T {
	const generatedDocs: T = { ...generatedDocsReference };

	Object.entries(generatedDocs.paths).forEach(([_pathKey, pathValue]) => {
		Object.entries(pathValue as object).forEach(([_reqMethodKey, reqMethodValue]) => {
			if (!reqMethodValue?.responses){
				logEmpty("responses");
			} else {
				Object.entries(reqMethodValue.responses as object).forEach(([_resCodeKey, resCodeValue]) => {
						console.log("resCodeValue", resCodeValue);
						if (!resCodeValue?.schema?.properties) {
							logEmpty("schema / schema.properties");
						}
						else {
						Object.entries(resCodeValue.schema.properties as object).forEach(([_propKey, propValue]) => {
							if (!propValue?.example) {
								logEmpty("property / property.example");
							} else {
								if (!Array.isArray(propValue.example)) {
									// continue;
								} else {
									if (propValue.example.length > 1) {
										propValue.example = propValue.example[0];
										console.log("  -> Sliced example's array to contain only 1 element!")
										console.log("Example", propValue.example);
									}
								}
							}
						})
					}
				})
			}
		});
	});

	return generatedDocs;
}
