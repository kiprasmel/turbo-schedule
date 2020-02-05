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

import { OpenAPIV3, OpenAPIV2 } from "openapi-types";
import fs from "fs-extra";

export function modifyGeneratedAPIDocs(savePathAndFilename: string): OpenAPIV3.Document | undefined {
	try {
		console.log("\n => modifyGeneratedAPIDocs:");

		if (!fs.pathExistsSync(savePathAndFilename)) {
			console.error("  ! openAPI file does not exist in save path!", savePathAndFilename);
			return undefined;
		}
		console.log("  -> path exists: `%s`", savePathAndFilename);

		const generatedDocs: OpenAPIV3.Document = fs.readJSONSync(savePathAndFilename, { encoding: "utf-8" });

		generatedDocs.info.title = "turbo-schedule's REST API";
		generatedDocs.info.version = `v1`;

		/** TODO html */
		// const docsDescription: string = fs.readFileSync(join(__dirname, "docsDescription.html"), { encoding: "utf-8" });
		// docsDescription.replace(/\n+/g, "\n");
		// docsDescription.replace(/\t/g, "").replace(/\\t/g, "");

		generatedDocs.servers = docsServers;
		generatedDocs.info.description = docsDescription;

		/**
		 * uh oh it's currently V2
		 * and I need to delete a prop from it.error
		 *
		 * Redoc converts it to V3 itself.
		 * We'll implement this @ express-oas-generator soon,
		 * so this is fine.
		 */
		const generatedDocsV2: OpenAPIV2.Document = (generatedDocs as unknown) as OpenAPIV2.Document;

		delete generatedDocsV2.host;

		fs.writeJSONSync(savePathAndFilename, generatedDocsV2, { encoding: "utf-8" });

		console.log("  -> saved modified openAPI docs to `%s`", savePathAndFilename);
		console.log("  -> new  generated openAPI docs:\n", generatedDocsV2);

		/** TODO */
		return (generatedDocsV2 as unknown) as OpenAPIV3.Document;
	} catch (err) {
		console.error("  ! Error:\n", err);
		return undefined;
	} finally {
		console.log("\n /modifyGeneratedAPIDocs\n");
	}
}

const docsServers: OpenAPIV3.ServerObject[] = [
	{
		url: "https://ts.kipras.org",
		// "description": "Main server"
	},
	// {
	// 	"url": "https://tt.kipras.org",
	// 	// "description": "Main server, just on a different sub-domain using a CNAME"
	// }
];

/**
 * Having a `html` document did not turn out great lmao
 * (
 *	mostly parsing issues because in the end,
 *	it just a string being sent
 *	+ it interprets markdown (but not that great xd)
 * )
 */
const docsDescription: string = `\
<!-- docsDescription.html -->

Welcome to the API documentation!

Some useful resources:

<ul>
	<li>
		<a
			href="/"
			target="_blank"
			rel="noopener"\
		>
			The app itself
		</a>
	</li>

	<li>
		The OpenAPI (swagger) specification -\
		<a
			href="/api/v1/docs.json"
			target="_blank"
			rel="noopener"\
		>
			/api/v1/docs.json
		</a>
	</li>

	<li>
		GitHub repository -\
		<a
			href="https://github.com/sarpik/turbo-schedule/"
			target="_blank"
			rel="noopener"\
		>
			github.com/sarpik/turbo-schedule
		</a>
	</li>

	<li>
		Roadmap -\
		<a
			href="https://github.com/sarpik/turbo-schedule/issues/1"
			target="_blank"
			rel="noopener"
		>
			github.com/sarpik/turbo-schedule/issues/1
		</a>
	</li>

	<li>
		Reporting an issue -\
		<a
			href="https://github.com/sarpik/turbo-schedule/issues/new"
			target="_blank"
			rel="noopener"\
		>
			https://github.com/sarpik/turbo-schedule/issues/new
		</a>
	</li>
</ul>
		`.replace(/\t/g, "");

// function logEmpty(what: string) {
// 	console.log(`\`${what}\` not found / empty`);
// }

/**
 * We no longer need this
 * since the docs are generated from the tests,
 * meaning that we never have any ridiculous examples etc.
 */
// function trimExampleLengthToOne<T extends OpenAPIV3>(generatedDocsReference: T): T {
// 	const generatedDocs: T = { ...generatedDocsReference };

// 	Object.entries(generatedDocs.paths).forEach(([_pathKey, pathValue]) => {
// 		Object.entries(pathValue as object).forEach(([_reqMethodKey, reqMethodValue]) => {
// 			if (!reqMethodValue?.responses){
// 				logEmpty("responses");
// 			} else {
// 				Object.entries(reqMethodValue.responses as object).forEach(([_resCodeKey, resCodeValue]) => {
// 						console.log("resCodeValue", resCodeValue);
// 						if (!resCodeValue?.schema?.properties) {
// 							logEmpty("schema / schema.properties");
// 						}
// 						else {
// 						Object.entries(resCodeValue.schema.properties as object).forEach(([_propKey, propValue]) => {
// 							if (!propValue?.example) {
// 								logEmpty("property / property.example");
// 							} else {
// 								if (!Array.isArray(propValue.example)) {
// 									// continue;
// 								} else {
// 									if (propValue.example.length > 1) {
// 										propValue.example = propValue.example[0];
// 										console.log("  -> Sliced example's array to contain only 1 element!")
// 										console.log("Example", propValue.example);
// 									}
// 								}
// 							}
// 						})
// 					}
// 				})
// 			}
// 		});
// 	});

// 	return generatedDocs;
// }
