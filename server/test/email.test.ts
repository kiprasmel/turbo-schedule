import request from "supertest";
import { app } from "../src/server";

describe("/email API", () => {
	it("should", async () => {
		const res: request.Response = await request(app)
			.post(`/api/v1/email`)
			.send({
				email: "test@kipras.org",
			});

		expect(res.status).toBe(200);

		const looselyExpectedObj = {
			emailEntry: {
				email: "test@kipras.org",
			},
		};

		expect(res.body).toMatchObject(looselyExpectedObj);
	});
});
