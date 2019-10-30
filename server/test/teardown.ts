// teardown.ts

const teardown = (_config: jest.GlobalConfig) => {
	global.server.close(() => {
		console.log("Successfully stopped server.\n");
	});
	global.stopFakeDbSync();
};

export default teardown;
