// teardown.ts

const teardown = async (_config: jest.GlobalConfig): Promise<void> => {
	global.server.close(() => {
		console.log("Successfully stopped server.\n");
	});
	await global.stopFakeDb();
};

export default teardown;
