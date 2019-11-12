# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
