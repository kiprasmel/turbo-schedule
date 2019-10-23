import request from "supertest";
import { app } from "../src/server";

describe("/email API", () => {
	it("should accept a new email & return it back", async () => {
		const email: string = new Date().getTime() + ".test@kipras.org";

		const res: request.Response = await request(app)
			.post(`/api/v1/email`)
			.send({ email });

		expect(res.status).toBe(200);

		const looselyExpectedObj = {
			emailEntry: { email },
		};

		expect(res.body).toMatchObject(looselyExpectedObj);
	});

	it("should not accept a duplicate email & should return the old one", async () => {
		const email: string = new Date().getTime() + ".test@kipras.org";

		const makeRequest = async (): Promise<request.Response> =>
			await request(app)
				.post(`/api/v1/email`)
				.send({ email });

		const res1: request.Response = await makeRequest();
		const res2: request.Response = await makeRequest();

		expect(res1.status).toBe(200);

		expect(res2.status).toBe(403);
		expect(res2.body).toMatchObject({ emailEntry: email, error: "Email already exists" });
	});
});
