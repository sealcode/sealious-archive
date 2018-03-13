const Sealious = require("./lib/main.js");
const locreq = require("locreq")(__dirname);

before(() => {
	global.TestApp = new Sealious.App(
		{
			upload_path: "/tmp",
			datastore_mongo: { host: "db", password: "sealious-test" },
			smtp: {
				host: "mailcatcher",
				port: 1025,
				user: "any",
				password: "any",
			},
			email: {
				from_name: "Sealious test app",
				from_address: "sealious@example.com",
			},
			core: { environment: "production" },
			app: { version: "0.0.0-test" },
			logger: { level: "info" },
			tests: {
				//non-standard, just for testing
				smtp_api_url: "http://mailcatcher:1080",
			},
		},
		{
			name: "testing app",
			logo: locreq.resolve("lib/assets/logo.png"),
			version: "0.0.0-test",
			colors: {
				primary: "#4d394b",
			},
		}
	);
	global.Sealious = Sealious;
	return TestApp.start().catch(error => {
		console.error(error);
		process.exit(1);
	});
});

after(async () => {
	await TestApp.stop();
});