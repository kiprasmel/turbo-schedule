import fs from "fs-extra";

const logEmpty = (what: string) => {
	console.log(`\`${what}\` not found / empty`);
}

export const modifyGeneratedAPIDocs = (saveDirPath: string, saveDirFilename: string): void => {
	try {
		const savePath = saveDirPath + "/" + saveDirFilename;

		const _generatedDocs: string = fs.readFileSync(savePath, { encoding: "utf-8" });
		// const _generatedDocs: string | undefined = require(savePath);

		if (!_generatedDocs) {
			return;
		}

		/** the `spec` (js object) */
		let generatedDocs: any = JSON.parse(_generatedDocs);

		generatedDocs = trimExampleLengthToOne(generatedDocs);

		// /** move the old generated docs */
		// fs.moveSync(savePath, saveDirPath + "/openAPI.old.json", { overwrite: true });

		/** write the new generated docs */
		fs.writeFileSync(saveDirPath + "/openAPI.lean.json", JSON.stringify(generatedDocs), { encoding: "utf-8" });

		console.log("new generated docs", generatedDocs);

	} catch (err) {
		console.error(err);
	}
};

const trimExampleLengthToOne = (generatedDocsReference: any) => {

	const generatedDocs: any = {...generatedDocsReference};

	/** nope - cannot modify this since it's initializing, not actually updating (duh?) */
	Object.entries(generatedDocs.paths).forEach(([_pathKey, pathValue]) => {
		Object.entries(pathValue as object).forEach(([_reqMethodKey, reqMethodValue]) => {
			// console.log("reqMethodValue", reqMethodValue);
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

const saveDirPath: string = process.argv[2] || "..";
const saveFilename: string = process.argv[3] || "openAPI.json";

modifyGeneratedAPIDocs(saveDirPath, saveFilename);
