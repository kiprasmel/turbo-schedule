# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.1.3 (2020-04-12)

**Note:** Version bump only for package @turbo-schedule/client





## 2.1.2 (2020-04-06)


### Bug Fixes

* **db:** Use correct path to `data` when in production ([f04f848](https://github.com/sarpik/turbo-schedule/commit/f04f848c27a4ac1271762ea0da9276895be3850f))





## 2.1.1 (2020-04-06)


### Bug Fixes

* Include `database` inside `Dockerfile` & `.dockerignore` ([6d4b0ad](https://github.com/sarpik/turbo-schedule/commit/6d4b0ad9828e753afd12b2fbe7d0d365a00f5da4))





# [2.1.0](https://github.com/sarpik/turbo-schedule/compare/v2.0.3...v2.1.0) (2020-04-06)


### Bug Fixes

* Rename `students` to `studentsId` @ `Lesson` model ([8b3f853](https://github.com/sarpik/turbo-schedule/commit/8b3f8530f5906ac6e5b9078676e7f7abf1633d78))


### Reverts

* Revert "fix: Rename `students` to `studentsId` @ `Lesson` model" ([0ccbc65](https://github.com/sarpik/turbo-schedule/commit/0ccbc6568b03f81b0f63713a10d2b9f2c82b78a2))





## 2.0.3 (2020-02-06)


### Bug Fixes

* **ci:** Set git's user `name` & `email` ([9c86fb5](https://github.com/sarpik/turbo-schedule/commit/9c86fb59c4b405bfe36328ab63e16b37495ad64e))





## [2.0.2](https://github.com/sarpik/turbo-schedule/compare/v2.0.1...v2.0.2) (2020-02-05)

**Note:** Version bump only for package @turbo-schedule/client





## [2.0.1](https://github.com/sarpik/turbo-schedule/compare/v2.0.0...v2.0.1) (2020-02-05)


### Bug Fixes

* **client:** Extend from the correct eslint config (`sarpik`) ([4b34e43](https://github.com/sarpik/turbo-schedule/commit/4b34e433d69450c0bb0b92d639d8da16b59ae073))





# [2.0.0](https://github.com/sarpik/turbo-schedule/compare/v1.7.3...v2.0.0) (2020-02-05)


### Bug Fixes

* **client:** Update react to `16.12` ([e597761](https://github.com/sarpik/turbo-schedule/commit/e59776113cf7c9a97b92eb7cdaaefa59dbb855e4))
* **client:** Update tsconfig to reference "../common" pkg ([71a55e9](https://github.com/sarpik/turbo-schedule/commit/71a55e9e2525bc8cb3abab86e2654b9eff43fc76))
* **client:** Use `?.` to access potentially undefined property ([91210d3](https://github.com/sarpik/turbo-schedule/commit/91210d336f36872e68b6929de8a8653519f7a14a))





## [1.6.4](https://github.com/sarpik/turbo-schedule/compare/v1.6.3...v1.6.4) (2019-11-14)

**Note:** Version bump only for package @turbo-schedule/client





## [1.6.3](https://github.com/sarpik/turbo-schedule/compare/v1.6.2...v1.6.3) (2019-11-13)


### Bug Fixes

* Rename `cabinet` to `room` ([0537fba](https://github.com/sarpik/turbo-schedule/commit/0537fba190343d79ea039fd29ff52025cd6eec94))





## [1.6.1](https://github.com/sarpik/turbo-schedule/compare/v1.6.0...v1.6.1) (2019-11-12)


### Bug Fixes

* Handle `studentSchedule` -> `lessons` implications ([3d9e337](https://github.com/sarpik/turbo-schedule/commit/3d9e337a0269d4e1618a5fa2c26f53028f5e0633))
* Move `Student` model from `scraper` to `common` ([cc42181](https://github.com/sarpik/turbo-schedule/commit/cc42181a561dc58e032b57b911332b8d2ce26351))
* **server:** Rename API field `studentSchedule` to `lessons` ([6bd9eda](https://github.com/sarpik/turbo-schedule/commit/6bd9eda1856cce1e3fd12e2172a94de25d4a5126))
* **server:** Rename API filed `studentsList` to `students` ([65f4d28](https://github.com/sarpik/turbo-schedule/commit/65f4d287ec49141fcd7b404db6f3ce542d484938))





# [1.6.0](https://github.com/sarpik/turbo-schedule/compare/v1.5.0...v1.6.0) (2019-10-31)

**Note:** Version bump only for package @turbo-schedule/client





# [1.5.0](https://github.com/sarpik/turbo-schedule/compare/v1.4.0...v1.5.0) (2019-10-24)

**Note:** Version bump only for package @turbo-schedule/client





# [1.1.0](https://github.com/sarpik/turbo-schedule/compare/v1.0.0...v1.1.0) (2019-10-23)


### Bug Fixes

* **client:** Get rid of input's value validation altogether ([75acdb1](https://github.com/sarpik/turbo-schedule/commit/75acdb1c20ab5fe6d5811f80e6b39043319b6ae4))
* **client:** Validate the whole value instead of only the first char ([0047722](https://github.com/sarpik/turbo-schedule/commit/0047722b6c466d118b40439c54651a5da734d6a4))


### Features

* **server:** Use `axios` instead of `fetch` & improve typescript ([ffa47b3](https://github.com/sarpik/turbo-schedule/commit/ffa47b3ee8cda3e41ad112ffc9a6771d5b794a13))





# 1.0.0 (2019-10-22)


### Bug Fixes

* **client:** Handle errors & provide defautls @ `fetchStudentsList` ([ccc997f](https://github.com/sarpik/turbo-schedule/commit/ccc997f8f07d923a2bff1c05f6e6f641fb661797))
* **client:** Make `BackBtn` navigate to `"/"` ([9e66804](https://github.com/sarpik/turbo-schedule/commit/9e668045869b5affa7edacf7884d0747e1ddad28))
* **client:** Run tests in ci mode ([c44a4e0](https://github.com/sarpik/turbo-schedule/commit/c44a4e0bbfcd553c4e378f0304575b0040aba1fa))
* **client:** Set `outDir` to `build/` ([a5e6209](https://github.com/sarpik/turbo-schedule/commit/a5e6209828d36669b09779833edbf59add317399))
* **client:** Set ReactModal's app element to "body" ([6e953bd](https://github.com/sarpik/turbo-schedule/commit/6e953bd53cd2b1972e796f51eff93bcb52ddfc18))
* **client:** Update tsconfig & package.json ([27cfb28](https://github.com/sarpik/turbo-schedule/commit/27cfb282b9bec218bd8392a86cec25d50bf8cf71))
* **client:** Use `cross-env` for yarn script ([6aa20ae](https://github.com/sarpik/turbo-schedule/commit/6aa20aef67c9a60d7ecfd12657eb9d7f4b801404))


### Features

* Start versioning API endpoints (now @ `v1`) ([55b20db](https://github.com/sarpik/turbo-schedule/commit/55b20dbb7d10662e8c5fce1630f1e53f2ba58d2b))
