import { IEmail, Email } from "@turbo-schedule/common";
import { request, Response } from "./utils";

describe("/email API", () => {
	it("should accept a new email & return it back", async () => {
		const email: string = `${new Date().getTime()}.test@kipras.org`;

		const res: Response = await request.post(`/api/v1/email`).send({ email });

		// console.error("res", res);

		expect(res.status).toBe(200);

		expect(res.body).toHaveProperty("emailEntry");
		expect(res.body.emailEntry).toHaveProperty("created");
		expect(res.body.emailEntry).toHaveProperty("email");
		expect(res.body.emailEntry).toHaveProperty("ip");

		const looselyExpectedObj: IEmail = { email };
		expect(res.body.emailEntry).toMatchObject(looselyExpectedObj);
	});

	it("should not accept a duplicate email & should return the old one", async () => {
		const email: string = `${new Date().getTime()}.test@kipras.org`;

		const makeRequest = async (): Promise<Response> => await request.post(`/api/v1/email`).send({ email });

		const res1: Response = await makeRequest();
		const res2: Response = await makeRequest();

		expect(res1.status).toBe(200);
		expect(res2.status).toBe(403);

		const expectedObj: Email = new Email({ email });
		expect(res2.body).toMatchObject({ emailEntry: expectedObj, message: "Email already exists" });
	});

	it("should inform about a missing `email` field", async () => {
		const res: Response = await request.post(`/api/v1/email`);

		expect(res.status).toBe(422);
		expect(res.body).toMatchObject({ emailEntry: new Email(), message: "Field `email` is missing" });
	});

	it("should be the last test to avoid a bug", async () => {
		try {
			await request.get(`/api/v1`); /** this solves the issue - the heck? */
		} finally {
			console.log("last test done");
		}
	});
});
