# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.2](https://github.com/sarpik/turbo-schedule/compare/v2.3.1...v2.3.2) (2020-04-18)


### Bug Fixes

* Auto re-generate the `CHANGELOG`s 🔥 ([772f0c4](https://github.com/sarpik/turbo-schedule/commit/772f0c44481d67acd55250478e4beafe1a8ca801))
* Change the repository links in package.json lol ([537e765](https://github.com/sarpik/turbo-schedule/commit/537e765de4facc6e96c9975de218618cb05f3391))







## [2.3.1](https://github.com/sarpik/turbo-schedule/compare/v2.3.0...v2.3.1) (2020-04-18)


### Bug Fixes

* **test:** Use `.write()` on top of `lowDb.setState()` ([e7d9aa2](https://github.com/sarpik/turbo-schedule/commit/e7d9aa268d372e7ccd98c948b21fad42607d23d5))



# [2.3.0](https://github.com/sarpik/turbo-schedule/compare/v2.2.2...v2.3.0) (2020-04-18)


### Features

* **server:** Create `runScraperIfUpdatesAvailable` util ([8fea54e](https://github.com/sarpik/turbo-schedule/commit/8fea54e73930956bb4c34992bbb5a70cb222ef89))
* **server:** Create `watchForUpdatesAndRunScraper` util / cronjob ([dc70d51](https://github.com/sarpik/turbo-schedule/commit/dc70d51cc7f78a1f0b427a7b7747ff9203865982))
* **server:** Enable `watchForUpdatesAndRunScraper` 🚀 ([9c362a8](https://github.com/sarpik/turbo-schedule/commit/9c362a8b80135c0a884a1fe03879bc9124e08540))



## [2.2.2](https://github.com/sarpik/turbo-schedule/compare/v2.2.1...v2.2.2) (2020-04-17)


### Bug Fixes

* **server:** Make `eoas-gen` re-use pre-built spec, if it's available ([f8c7eff](https://github.com/sarpik/turbo-schedule/commit/f8c7eff710b987bee1d56029e0dd7601176f11ef))
* **server:** Remove hacks in `generateOpenAPIDocs` related to multiple rootDirs ([1c863d5](https://github.com/sarpik/turbo-schedule/commit/1c863d5e4505f0bc322fd491f38d31f3ef040f30))



## [2.2.1](https://github.com/sarpik/turbo-schedule/compare/v2.1.5...v2.2.1) (2020-04-16)


### Bug Fixes

* **server:** Make sure we're using `await` with the database ([e0dd189](https://github.com/sarpik/turbo-schedule/commit/e0dd189abe0e074ddea1085348a85985a598b116))
* **server:** Remove `script` symlink - typescript ignores src/script too! ([f55b8df](https://github.com/sarpik/turbo-schedule/commit/f55b8df23b101363267dd55c3b75fb88a6a8fa89))
* **server:** Remove `tsconfig.tsbuildinfo` before building typescript ([4265026](https://github.com/sarpik/turbo-schedule/commit/4265026bd224a3a5d56a1e02864a74bb1ddbee96))


### Features

* **server:** Create API endpoint for `class` 🚀 ([e5994e4](https://github.com/sarpik/turbo-schedule/commit/e5994e4e6f664173dd15e1ad43cc2dd689b9444a))
* **server:** Create API endpoint for `schedule-item` 🚀 ([3c73488](https://github.com/sarpik/turbo-schedule/commit/3c734887609673b638218b2399d63b3fd478dbe0))


### Reverts

* Revert "fix(server): Remove `tsconfig.tsbuildinfo` before building typescript" ([0a0a683](https://github.com/sarpik/turbo-schedule/commit/0a0a68373daacd192e491d6a365637539c1e39df))



## [2.1.5](https://github.com/sarpik/turbo-schedule/compare/v2.1.4...v2.1.5) (2020-04-12)


### Bug Fixes

* Add `repository` field to all `package.json`s ([7803f4d](https://github.com/sarpik/turbo-schedule/commit/7803f4d58156524ff2239cae146c7e1c8fdbfcf0))



## [2.1.4](https://github.com/sarpik/turbo-schedule/compare/v2.1.3...v2.1.4) (2020-04-12)


### Bug Fixes

* **server:** Fix `package.json` `script` paths ([ca8777e](https://github.com/sarpik/turbo-schedule/commit/ca8777ef3ffc6acd091e838ba46163dae98b03c7))
* **server:** Move `server/script/` -> `server/src/script/` ([0bbce00](https://github.com/sarpik/turbo-schedule/commit/0bbce000552e593d4b7890e48e6a10b1472798c4))
* **server:** Move `server/test/` -> `server/src/test/` ([dc5d589](https://github.com/sarpik/turbo-schedule/commit/dc5d58920bee524cfbe322c2773a536fb06ddd44))
* **server:** Provide a `rootDir` instead of having multiple ones ([d903f08](https://github.com/sarpik/turbo-schedule/commit/d903f08af205daccbe2098e2fe7014c081744b55))



## [2.1.3](https://github.com/sarpik/turbo-schedule/compare/v2.1.2...v2.1.3) (2020-04-12)


### Bug Fixes

* Use `cross-env NODE_ENV=production` in ALL build scripts ([08e9dc5](https://github.com/sarpik/turbo-schedule/commit/08e9dc538e6d0cdc57dad60e6643e54e0c363115))



## [2.1.2](https://github.com/sarpik/turbo-schedule/compare/v2.1.1...v2.1.2) (2020-04-06)



## [2.1.1](https://github.com/sarpik/turbo-schedule/compare/v2.1.0...v2.1.1) (2020-04-06)



# [2.1.0](https://github.com/sarpik/turbo-schedule/compare/v2.0.3...v2.1.0) (2020-04-06)


### Bug Fixes

* **server:** Disable `json-server` for now ([bf37d05](https://github.com/sarpik/turbo-schedule/commit/bf37d051970c7f09e0f38b636a2411fd191e69f3))
* **server:** Handle requests when data was not found ([04d0fa3](https://github.com/sarpik/turbo-schedule/commit/04d0fa35da630efb2718d632689e72d21b6c57bc))
* **server:** Instead of renaming `students` to `studentsId`, empty out the `foreignKeySuffix` ([91b7613](https://github.com/sarpik/turbo-schedule/commit/91b76132aea0ae90c77622256a5fc1eba5d55c80))
* **server:** Make `/api/temp` READ-ONLY (through `json-server`) ([900dc4f](https://github.com/sarpik/turbo-schedule/commit/900dc4f4c2017c7d84e66dedce189b8beec758bc))
* **server:** Temporarily fix the "test:api" script ([4468f19](https://github.com/sarpik/turbo-schedule/commit/4468f195d9679884e3025ad04e79b9dc3adb7631))
* **server:** Use `await` for `db.get` @ `student`s API ([b20f755](https://github.com/sarpik/turbo-schedule/commit/b20f755566c659e7c46be5e33e5cba6e5dcd1d32))
* **test:** Fix'em server's API tests & explain the hurdle ([5415d6a](https://github.com/sarpik/turbo-schedule/commit/5415d6a395d7230185bf12e23f458c5d21e735ac))
* **test:** Force removal of temp fake database ([dc7c8ca](https://github.com/sarpik/turbo-schedule/commit/dc7c8cada97714e8403f5b23d142374add69655d))
* **test:** Update `student`s API tests (0 breaking changes) ([f01977b](https://github.com/sarpik/turbo-schedule/commit/f01977b0ff3e7172082fdd75b8f6a9ddd9d8fd8f))
* **test:** Update server's API tests to use the new db stuff! ([93e552f](https://github.com/sarpik/turbo-schedule/commit/93e552fc47c396227d89e637b982c7a53a1aefcf))
* **test:** Use the new db stuff @ server's API tests' setup & teardown ([d0abd8b](https://github.com/sarpik/turbo-schedule/commit/d0abd8baf64d012a247e0a15c5a64aa59334b83a))
* Rename `students` to `studentsId` @ `Lesson` model ([8b3f853](https://github.com/sarpik/turbo-schedule/commit/8b3f8530f5906ac6e5b9078676e7f7abf1633d78))


### Features

* **server:** Add `database` pkg as a dependency ([ee1b068](https://github.com/sarpik/turbo-schedule/commit/ee1b0683fd61a7b191524ed78a3d91426d248b6f))
* **server:** Change email save path to the new database! 📧 ([0ef0340](https://github.com/sarpik/turbo-schedule/commit/0ef03409d2770245509ba8d1e622a85a495bdbe6))
* **server:** Create `mwPickFields` middleware util ([2b1ca9c](https://github.com/sarpik/turbo-schedule/commit/2b1ca9c148f726b0d0987bcf0e0c57363275fd9c))
* **server:** Create `mwReadOnly` middleware ([2af1023](https://github.com/sarpik/turbo-schedule/commit/2af1023e5ebc995f53454a0bf1f8c4308bd2125b))
* **server:** Install `(@types/)json-server` ([831a12f](https://github.com/sarpik/turbo-schedule/commit/831a12f16e2f0671dc63eda34627aed6d866c82f))
* **server:** Install dependencies (debug) ([397c9e9](https://github.com/sarpik/turbo-schedule/commit/397c9e9be6b6f86bc7d60bd92cd9dc5df04a6ea7))
* **server:** Use `json-server`s router @ `/api/temp` ([bcac3c4](https://github.com/sarpik/turbo-schedule/commit/bcac3c4202e6422e0bacf4ddf1a0f317af4d2b14))
* **server:** Use the new `database` for the `student` API 🚀 ([95163c9](https://github.com/sarpik/turbo-schedule/commit/95163c9d763b3030f0f9d9223057803d8082f119))


### Reverts

* Revert "fix: Rename `students` to `studentsId` @ `Lesson` model" ([0ccbc65](https://github.com/sarpik/turbo-schedule/commit/0ccbc6568b03f81b0f63713a10d2b9f2c82b78a2))



## [2.0.3](https://github.com/sarpik/turbo-schedule/compare/v2.0.2...v2.0.3) (2020-02-06)


### Bug Fixes

* **server:** Make `fakeDb` `stopFakeDbSync` not fail on error ([3569dad](https://github.com/sarpik/turbo-schedule/commit/3569dadb48eea4c15f98f9045c0fbb5b70803d51))



## [2.0.2](https://github.com/sarpik/turbo-schedule/compare/v2.0.1...v2.0.2) (2020-02-05)



# [2.0.0](https://github.com/sarpik/turbo-schedule/compare/v1.7.3...v2.0.0) (2020-02-05)


### Bug Fixes

* **server:** Create a little hack to copy `openAPI.json` once building for production ([9d0b2ab](https://github.com/sarpik/turbo-schedule/commit/9d0b2abd8fa82fcd2679525db86bd37def05e2da))
* **server:** Update npm scripts to properly separate dev vs prod environments ([0e71458](https://github.com/sarpik/turbo-schedule/commit/0e714586aa70be514363aef24f9277c155ef7130))



## [1.7.3](https://github.com/sarpik/turbo-schedule/compare/v1.7.2...v1.7.3) (2019-12-27)


### Bug Fixes

* **server:** Remove wrong params from `handleRequests` ([1da8613](https://github.com/sarpik/turbo-schedule/commit/1da8613c17056d0b347cd78033d1774c6e997166))



## [1.7.2](https://github.com/sarpik/turbo-schedule/compare/v1.7.1...v1.7.2) (2019-11-21)



## [1.7.1](https://github.com/sarpik/turbo-schedule/compare/v1.7.0...v1.7.1) (2019-11-21)


### Reverts

* Revert "refactor(server): Move `scrapedDataDirPath` into `generated/`" ([cf247f7](https://github.com/sarpik/turbo-schedule/commit/cf247f747fd72ed78b43538c41250240c33c93ff))



# [1.7.0](https://github.com/sarpik/turbo-schedule/compare/v1.6.6...v1.7.0) (2019-11-20)



## [1.6.6](https://github.com/sarpik/turbo-schedule/compare/v1.6.5...v1.6.6) (2019-11-18)


### Bug Fixes

* **server:** Set app to trust proxy ([c600edc](https://github.com/sarpik/turbo-schedule/commit/c600edc6444c74c0eb318357ca92c8cc78be080e)), closes [/github.com/expressjs/morgan/issues/214#issuecomment-555068350](https://github.com//github.com/expressjs/morgan/issues/214/issues/issuecomment-555068350)



## [1.6.5](https://github.com/sarpik/turbo-schedule/compare/v1.6.4...v1.6.5) (2019-11-16)


### Bug Fixes

* **server:** Use `--force` with `cp` when updating openAPI docs ([dae731d](https://github.com/sarpik/turbo-schedule/commit/dae731d3e71cd17d30b2228975f086ee9d95c35b))
* **server:** Use the newer `eoas-gen` API for docs generation ([91003d6](https://github.com/sarpik/turbo-schedule/commit/91003d6242bf1d67fb8a6eaa15009d9d647c4849))



## [1.6.4](https://github.com/sarpik/turbo-schedule/compare/v1.6.3...v1.6.4) (2019-11-14)



## [1.6.3](https://github.com/sarpik/turbo-schedule/compare/v1.6.2...v1.6.3) (2019-11-13)


### Bug Fixes

* Rename `cabinet` to `room` ([0537fba](https://github.com/sarpik/turbo-schedule/commit/0537fba190343d79ea039fd29ff52025cd6eec94))



## [1.6.2](https://github.com/sarpik/turbo-schedule/compare/v1.6.1...v1.6.2) (2019-11-13)


### Bug Fixes

* **server:** Bring back & fix the tests for `/student/:studentName` ([2d58ac0](https://github.com/sarpik/turbo-schedule/commit/2d58ac04c404f8cf9b2b8e0ecfae2fac14ca8705))
* **server:** Return consistent `emailEntry` fields ([0ac1324](https://github.com/sarpik/turbo-schedule/commit/0ac1324e331e3eb0bb30c7dbfe7031ec106be36d))



## [1.6.1](https://github.com/sarpik/turbo-schedule/compare/v1.6.0...v1.6.1) (2019-11-12)


### Bug Fixes

* Handle `studentSchedule` -> `lessons` implications ([3d9e337](https://github.com/sarpik/turbo-schedule/commit/3d9e337a0269d4e1618a5fa2c26f53028f5e0633))
* Move `Student` model from `scraper` to `common` ([cc42181](https://github.com/sarpik/turbo-schedule/commit/cc42181a561dc58e032b57b911332b8d2ce26351))
* **server:** Rename API field `studentSchedule` to `lessons` ([6bd9eda](https://github.com/sarpik/turbo-schedule/commit/6bd9eda1856cce1e3fd12e2172a94de25d4a5126))
* **server:** Rename API filed `studentsList` to `students` ([65f4d28](https://github.com/sarpik/turbo-schedule/commit/65f4d287ec49141fcd7b404db6f3ce542d484938))



# [1.6.0](https://github.com/sarpik/turbo-schedule/compare/v1.5.0...v1.6.0) (2019-10-31)


### Bug Fixes

* **server:** Add `--forceExit` to `jest`/`test` script ([9df1016](https://github.com/sarpik/turbo-schedule/commit/9df101636a938a7c25c27c70fd174a31e9403669))
* **server:** Handle if file exists checking @ student-list ([b1bb972](https://github.com/sarpik/turbo-schedule/commit/b1bb9724ba5def9c3fb835129fd3ae117894bbe4))
* **server:** Make `applyAPIDocsGenerator` the first middleware! 🚀 ([0467a88](https://github.com/sarpik/turbo-schedule/commit/0467a88192007c480a3cbc9cec687921abba52e4))
* **server:** Modify `build:docs` script - make it independent ([0f43d6c](https://github.com/sarpik/turbo-schedule/commit/0f43d6cede067309bb241142274cca299f1264dc))
* **server:** Serve openAPI docs from the same filename ([6c03181](https://github.com/sarpik/turbo-schedule/commit/6c03181e809b7fcf3db15fcd024a11f9e1a1dd26))
* **server:** Use `child_process.execSync` to run tests w/ script! ([90360f8](https://github.com/sarpik/turbo-schedule/commit/90360f8d306fbb77c2cc2e576b0e7d8e1117fa71))
* **test:** Stop ignoring `test/` folder in `server/tsconfig.json` ([e8d01b6](https://github.com/sarpik/turbo-schedule/commit/e8d01b61adc5548b61cc84ec055ff1d2a42124e5))


### Features

* **server:** Add `pathToStudentDataArrayFile` to config ([7998e42](https://github.com/sarpik/turbo-schedule/commit/7998e42428346659eb09450ca530228ef1b3e886))
* **server:** Create `build:docs` npm script ([917c353](https://github.com/sarpik/turbo-schedule/commit/917c3538b5f26fb7306d33b2589f6645cf9fbe9c))
* **server:** Create `fakeDb` test utility! 🤡 ([0d510f9](https://github.com/sarpik/turbo-schedule/commit/0d510f9ac282441803e447f6d12201d4379c641c))
* **server:** Start using `modifyGeneratedAPIDocs` again! 🔥 ([f5bb5c3](https://github.com/sarpik/turbo-schedule/commit/f5bb5c339ab9696083554ef5efbc857bca16df8e))
* **server:** Write modified docs to same file; provide html description ([bd58c90](https://github.com/sarpik/turbo-schedule/commit/bd58c90c2724641dc67eb24200ff5b0266a5451c))


### Reverts

* Revert "test: Add everything that did NOT work for future reference" ([d144fc6](https://github.com/sarpik/turbo-schedule/commit/d144fc619cc67546f30e30d564cf409f5de4c21f))



# [1.5.0](https://github.com/sarpik/turbo-schedule/compare/v1.4.0...v1.5.0) (2019-10-24)


### Bug Fixes

* **server:** Clean up `email` & `student` routes ([3bc1343](https://github.com/sarpik/turbo-schedule/commit/3bc13438c0759f896aff74fe677f80f336477f98))
* **server:** Clean up directory/file (path) naming @ config ([ab080bf](https://github.com/sarpik/turbo-schedule/commit/ab080bf700de73e6edd4033d201397ed22a1e41d))
* **server:** Fix config imports in `script/` dir ([7b96cdd](https://github.com/sarpik/turbo-schedule/commit/7b96cdd3e50268db45a1c7de8c0bb7ec02e30284))
* **server:** Realise that you need to watch all ts files! ([0d8f80b](https://github.com/sarpik/turbo-schedule/commit/0d8f80bae034ca697a7a6893553b9db14730a2b7))
* **server:** Update config imports (clean AF!) ([87c35ea](https://github.com/sarpik/turbo-schedule/commit/87c35eaf772bb8ec67b99f8c940b5703975c09a0))
* **server:** Update to latest config exports ([c2c75cd](https://github.com/sarpik/turbo-schedule/commit/c2c75cd6f8bfd6bc88aae5b840d66314c3317d0c))


### Features

* **server:** Export config vars directly, not inside an {} 🚀 ([d4324cc](https://github.com/sarpik/turbo-schedule/commit/d4324cc522082435672eb1c97b728e514ce98438))
* **server:** Provide default return values from API ([78097f3](https://github.com/sarpik/turbo-schedule/commit/78097f3df7cc4dad5db6314f2b746560bee7b1c3))
* **server:** Start logging warnings/errors to console ([355f74a](https://github.com/sarpik/turbo-schedule/commit/355f74a2452553b288201a7c58b1cd0d92069f69))



# [1.4.0](https://github.com/sarpik/turbo-schedule/compare/v1.3.0...v1.4.0) (2019-10-23)


### Features

* **server:** Create `setupLogger` util ([bbb42cc](https://github.com/sarpik/turbo-schedule/commit/bbb42ccd8a31eba85c2f8882889534d3069ec287))
* **server:** Install `morgan` & `rotating-file-stream` ([ecf9745](https://github.com/sarpik/turbo-schedule/commit/ecf974576dbac5e41385674abc18e5c4d81ccfd9))
* **server:** Use `setupLogger` util ([09850d1](https://github.com/sarpik/turbo-schedule/commit/09850d19ac93e439a4496aa158ec2bd35919856f))



# [1.3.0](https://github.com/sarpik/turbo-schedule/compare/v1.2.1...v1.3.0) (2019-10-23)


### Features

* **server:** Refactor `email` route & handle duplicates ([bd1dbb3](https://github.com/sarpik/turbo-schedule/commit/bd1dbb308ea2b919324ffc4653428d0a21b56434))
* **tests:** Update `email` route tests ([bc56341](https://github.com/sarpik/turbo-schedule/commit/bc56341fadc746ff9be5c842cc52eafb86bdbb04))



## [1.2.1](https://github.com/sarpik/turbo-schedule/compare/v1.2.0...v1.2.1) (2019-10-23)


### Bug Fixes

* **server:** Get rid of `.env` & relatives ([d80be08](https://github.com/sarpik/turbo-schedule/commit/d80be08088cc94e06b0775ba061b268d5c7f44b4))



# [1.2.0](https://github.com/sarpik/turbo-schedule/compare/v1.1.0...v1.2.0) (2019-10-23)


### Bug Fixes

* **server:** Disable `debug` for `loadDotEnv` ([0167af2](https://github.com/sarpik/turbo-schedule/commit/0167af2da345e0f1406e3d1e565def013e41a6f2))
* **server:** Extract `app`s middleware out of `startServer` for proper exports ([b0e01a2](https://github.com/sarpik/turbo-schedule/commit/b0e01a2abccdd04dacdd7f068bb05b8d7892a13c))
* **server:** Set `PORT` env var once tests are ran ([3a436b3](https://github.com/sarpik/turbo-schedule/commit/3a436b30b575a7b588b117b02bea02fb33cca3e5))
* **server:** Simplify `.env` naming & usage ([93aede4](https://github.com/sarpik/turbo-schedule/commit/93aede452cd924b057eb623c2dae5029dc3e623d))


### Features

* **server:** Create `.env.example` ([1b600d7](https://github.com/sarpik/turbo-schedule/commit/1b600d737f02e490aad27cf0e42fbf7cf6fb20b3))
* Install `dotenv` & create `loadDotEnv` util & use it ([b389b9a](https://github.com/sarpik/turbo-schedule/commit/b389b9a8b1fb0d00e40b80420c638c3fbf63a701))
* **server:** Install jest, ts-jest, supertest & their types ([e82b2f2](https://github.com/sarpik/turbo-schedule/commit/e82b2f2fd3f173b9811a27a007a5e96ae24787b4))
* **tests:** Create my first ever test! 🧪 ([644715b](https://github.com/sarpik/turbo-schedule/commit/644715b297e5283a672d9ee7236cd14d08b7c89e))
* **tests:** Create tests for `/email` API ([1b206b7](https://github.com/sarpik/turbo-schedule/commit/1b206b7115e7929f1c0a90349e597a27cf6b5941))
* **tests:** Create tests for `/student` API ([d6dabcc](https://github.com/sarpik/turbo-schedule/commit/d6dabccc7e312abd16978259e0273282205ba4ba))
* Create `jest.config.js` & a yarn script for jest ([59a5673](https://github.com/sarpik/turbo-schedule/commit/59a5673e94bc07d95e26f4978423feceee8203bf))



# [1.1.0](https://github.com/sarpik/turbo-schedule/compare/v1.0.0...v1.1.0) (2019-10-23)


### Bug Fixes

* **server:** Do not use `localhost` for `redoc`s `spec-url` ([0a22ed3](https://github.com/sarpik/turbo-schedule/commit/0a22ed3f2df20a964277c021d21facc69432bd34))
* **server:** Remove `async/await` from useless places ([7ced520](https://github.com/sarpik/turbo-schedule/commit/7ced52018b745436668485aace6995f9f63d0e25))
* **server:** Update .gitignore - allow `generated/` ([676ba6d](https://github.com/sarpik/turbo-schedule/commit/676ba6d8b83bad316ebb2ac99a9bda14900f7179))



# [1.0.0](https://github.com/sarpik/turbo-schedule/compare/1ff81bdba6fb25786e7a72f7f4e7ae6a9eadfb4f...v1.0.0) (2019-10-22)


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


### Reverts

* Revert "docs: Attempt *manually* documenting endpoints lmao" ([2757046](https://github.com/sarpik/turbo-schedule/commit/2757046b74c86941e5bf46083776443fd1859b86))
