# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2019-10-22)


### Bug Fixes

* **server:** Actually enable the scraper cronjob ([9601d2c](https://github.com/sarpik/turbo-schedule/commit/9601d2c35b97f34257b6b501399725607365b990))
* **server:** Clean up `server` & `runScraperCronjob` ([1ff81bd](https://github.com/sarpik/turbo-schedule/commit/1ff81bdba6fb25786e7a72f7f4e7ae6a9eadfb4f))
* **server:** Handle exceptions when reading/parsing docs ([b8e3d47](https://github.com/sarpik/turbo-schedule/commit/b8e3d477e8c7415ef749eb3fd4c57c0eace2e60d))
* **server:** Move `openAPIDocs` into `v1` of `api` routes ([501b60e](https://github.com/sarpik/turbo-schedule/commit/501b60e9bfea3a0e92accbb0883e88cfe315edbf))
* **server:** Move `predeploy` into `scrape-content` script ([041aad8](https://github.com/sarpik/turbo-schedule/commit/041aad84ec208a224b261c6c7e35aee971b58dd1))
* **server:** Move `start-server` into `script/` ([975848e](https://github.com/sarpik/turbo-schedule/commit/975848ef79ef3fab0c123289ca77cf8d869d89b5))
* **server:** Properly forward middleware w/ `next` ([2e5fdf2](https://github.com/sarpik/turbo-schedule/commit/2e5fdf204af25f7196318906e23668f136e7a3ab))
* **server:** Properly handle static file serving ([ef51bc9](https://github.com/sarpik/turbo-schedule/commit/ef51bc9955342b06d2785945fc8acebc44945336))
* **server:** Remove `rootDir` from `tsconfig.json` ([bc78422](https://github.com/sarpik/turbo-schedule/commit/bc7842228df4582505a411d5ee31b48a2eb4187b))
* **server:** Remove unnecessary/unreachable route ([3405b36](https://github.com/sarpik/turbo-schedule/commit/3405b3675b8da23334bc7c38b1dacef14cc3e75d))
* **server:** Resolve to correct path when serving docs ([a585004](https://github.com/sarpik/turbo-schedule/commit/a58500476a2c1687cce5b87abb675c22ca52b1d8))
* **server:** Update .gitignore ([b7d47be](https://github.com/sarpik/turbo-schedule/commit/b7d47be1be302be14253984a085696b584f7899a))
* **server:** Update `main` & `typings` @ `package.json` ([78ab269](https://github.com/sarpik/turbo-schedule/commit/78ab269df7d7a269bda194b66f3ff8d81c3af6f7))
* **server:** Update scripts ([603f6ff](https://github.com/sarpik/turbo-schedule/commit/603f6ff42ffc18ce85112aa5860181de3255feac))
* **server:** Update tsconfig & package.json ([e4b0a6c](https://github.com/sarpik/turbo-schedule/commit/e4b0a6c04367ee1d3ae6343b17b8fcef2101499c))
* **server:** Update tsconfig to ignore `test/` ([894a43c](https://github.com/sarpik/turbo-schedule/commit/894a43c26e0966b359bba1c3006cf581e66b1f70))
* **server:** Use docs generator ONLY in NON-production env ([6816a42](https://github.com/sarpik/turbo-schedule/commit/6816a42b820bc3b12491a4e86fa3948703fd7beb))
* Use `apiRouter` in server for `/api` ([0f71e68](https://github.com/sarpik/turbo-schedule/commit/0f71e681e15e74a1ba5c6d09ad274e4830f1f175))


### Features

* **server:** Create `generate-openapi-docs` script ([8cc9ae3](https://github.com/sarpik/turbo-schedule/commit/8cc9ae362e2e787b4f14bb86a7d521f538f830b7))
* **server:** Create `index.d.ts` for `server/script/module`s ([28bcf89](https://github.com/sarpik/turbo-schedule/commit/28bcf89bd66ace51e2479407d290d016d6adc0f0))
* **server:** Create `isProd` util ([8d83dc4](https://github.com/sarpik/turbo-schedule/commit/8d83dc4c4db66f81f1624fd5c29634bd1ea4da5d))
* **server:** Create `modify-generated-openapi-docs` script! ([32099f3](https://github.com/sarpik/turbo-schedule/commit/32099f3b52316cd67ccb6a2da46a1c174be17f6f))
* **server:** Create `modifyGeneratedAPIDocs` script module ([6598c8d](https://github.com/sarpik/turbo-schedule/commit/6598c8d999b43933beaa304c10c7b0dd571a15a3))
* **server:** Create build scripts! 👷‍♀️ ([c680439](https://github.com/sarpik/turbo-schedule/commit/c6804395ed544bd519f4ff29e0772cd1aa46d165))
* **server:** Improve the sh1t outta `openAPIDocs`! ([02001cf](https://github.com/sarpik/turbo-schedule/commit/02001cf5758fcd19946f4a90befaa69b881de016))
* **server:** Install `express-oas-generator` ([905b7d6](https://github.com/sarpik/turbo-schedule/commit/905b7d67de749b06978c82bfe5da7599ff39e60b))
* **server:** Move & improve the SH1T outta `modifyGeneratedAPIDocs`! ([4668b35](https://github.com/sarpik/turbo-schedule/commit/4668b358a09b7c422c65633f950858daa30fbc10))
* **server:** Provide config options; remove callback ([5a2fa5c](https://github.com/sarpik/turbo-schedule/commit/5a2fa5c5a784dff7004f669fca51ad0b92a7f1a7))
* **server:** Return the created server! ([1ed5cef](https://github.com/sarpik/turbo-schedule/commit/1ed5cef28c65b2e30a26dc4a619a6f0dfe19c717))
* **server:** Update `email` route ([3159aa2](https://github.com/sarpik/turbo-schedule/commit/3159aa2cb50d2286ea701f22af56c9ad0826d984))
* **server:** Update the sh1t ooutta `apiV1` & `api` routers! ([a084ff7](https://github.com/sarpik/turbo-schedule/commit/a084ff7679a4053d24546ae06cb80352c20985d3))
* **server:** Update the sh1t outta `applyAPIDocsGenerator`! ([9d1e267](https://github.com/sarpik/turbo-schedule/commit/9d1e267208d9ecd4b0e8cb4003d3881c0cd98001))
* **server:** Update the sh1t outta `student` route! ([7de711b](https://github.com/sarpik/turbo-schedule/commit/7de711b6a9adc8771e44094807097c34fdc0c061))
* **server:** Use `applyAPIDocsGenerator` after server is listening ([f0144f5](https://github.com/sarpik/turbo-schedule/commit/f0144f56b1c21562af23ef56c02a35fdd0bedaa6))
* Create `apiRouter` for all `/api` route handling ([ad83935](https://github.com/sarpik/turbo-schedule/commit/ad83935c60830a137c16a97353cbb24fae17509b))
* Create `applyAPIDocsGenerator` util & use it ([b996a25](https://github.com/sarpik/turbo-schedule/commit/b996a2594030632e413d64f433302923d289c6fa))
* Create `modifyGeneratedAPIDocs` util ([0855286](https://github.com/sarpik/turbo-schedule/commit/0855286528d27f26cfe58e82a55e00dcc769d678))
* Create `openAPIDocs.ts` route utility ([3713b20](https://github.com/sarpik/turbo-schedule/commit/3713b208ab505929c7b92a97bbd2a2212df48fd6))
* Install swagger-jsdoc, swagger-ui-express, redoc etc. ([4afb6ee](https://github.com/sarpik/turbo-schedule/commit/4afb6ee772cbb2bb1f9bfe23f926289d5fc0b8df))
* Serve *auto-generated* API docs! ([d339254](https://github.com/sarpik/turbo-schedule/commit/d3392545c2f176e8ed290adecadf8b57db3260fc))
* Start versioning API endpoints (now @ `v1`) ([55b20db](https://github.com/sarpik/turbo-schedule/commit/55b20dbb7d10662e8c5fce1630f1e53f2ba58d2b))
* Turn `server.ts` into a module ([727f543](https://github.com/sarpik/turbo-schedule/commit/727f543a78e9bad2fa3e6473b154d77214e62d24))
