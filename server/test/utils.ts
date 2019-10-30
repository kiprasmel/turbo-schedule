// utils.ts
/**
 * For testing the API, we use supertest:
 * https://github.com/visionmedia/supertest
 *
 * Here we currently provide a wrapper
 * (which is shown in the repo itself as an example)
 * to avoid re-creating the server
 * every time we call the `request`.
 *
 * This also allows us to get rid of the need
 * for global variables.
 *
 * (
 *	I previously tried making the `app` as a global variable
 *	and it obviously did not work.
 *	And that's good, because this is way more simplier & robust.
 * )
 *
 * + the tests are wayyyyyy faster now!
 */

import request, { SuperTest, Test, Response } from "supertest";

const PORT: number = Number(process.env.PORT) || 5000;
const baseUrl: string = `http://localhost:${PORT}`;

const requestWrap: SuperTest<Test> = request(baseUrl);

export { requestWrap as request, Response };
