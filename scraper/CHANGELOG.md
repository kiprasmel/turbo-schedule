# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.1.3 (2020-04-12)

**Note:** Version bump only for package @turbo-schedule/scraper





## 2.1.2 (2020-04-06)


### Bug Fixes

* **db:** Use correct path to `data` when in production ([f04f848](https://github.com/sarpik/turbo-schedule/commit/f04f848c27a4ac1271762ea0da9276895be3850f))





## 2.1.1 (2020-04-06)


### Bug Fixes

* Include `database` inside `Dockerfile` & `.dockerignore` ([6d4b0ad](https://github.com/sarpik/turbo-schedule/commit/6d4b0ad9828e753afd12b2fbe7d0d365a00f5da4))





# [2.1.0](https://github.com/sarpik/turbo-schedule/compare/v2.0.3...v2.1.0) (2020-04-06)


### Bug Fixes

* **scraper:** Throw if there's an error ([90a0564](https://github.com/sarpik/turbo-schedule/commit/90a0564972edbf140c49bbc1662a3df5784aa7ae))
* **scraper:** Use the sync method of `fs.ensureDir` @ `extractUniqueLessonsSync` ([987aa4a](https://github.com/sarpik/turbo-schedule/commit/987aa4a7b2d7f3727df02758659f18608d49935e))
* Rename `students` to `studentsId` @ `Lesson` model ([8b3f853](https://github.com/sarpik/turbo-schedule/commit/8b3f8530f5906ac6e5b9078676e7f7abf1633d78))


### Features

* **scraper:** Stop using `.then` to cleanup & start also saving lessons to db ([08348bb](https://github.com/sarpik/turbo-schedule/commit/08348bbe0a65dbcbba0d59310575ebebafebceee))


### Performance Improvements

* **scraper:** (BIG) Do NOT populate students with lessons 💣 ([1de0350](https://github.com/sarpik/turbo-schedule/commit/1de0350f0eef0f1994de33be63fba1f54542cd87))


### Reverts

* Revert "fix: Rename `students` to `studentsId` @ `Lesson` model" ([0ccbc65](https://github.com/sarpik/turbo-schedule/commit/0ccbc6568b03f81b0f63713a10d2b9f2c82b78a2))





## 2.0.3 (2020-02-06)


### Bug Fixes

* **ci:** Set git's user `name` & `email` ([9c86fb5](https://github.com/sarpik/turbo-schedule/commit/9c86fb59c4b405bfe36328ab63e16b37495ad64e))





## [2.0.2](https://github.com/sarpik/turbo-schedule/compare/v2.0.1...v2.0.2) (2020-02-05)

**Note:** Version bump only for package @turbo-schedule/scraper





# [2.0.0](https://github.com/sarpik/turbo-schedule/compare/v1.7.3...v2.0.0) (2020-02-05)


### Features

* **common:** Improve the sh1t outta `Student` model! ([d385e8f](https://github.com/sarpik/turbo-schedule/commit/d385e8fe638529b7db76084f555d22f5b0710002))
* **scraper:** Create `memoize` util... ([8f4de3e](https://github.com/sarpik/turbo-schedule/commit/8f4de3e19e81a2b3ec09e6e94d91759b205f62de))
* **scraper:** Revamp `config` - single source of truth ([fc9a1f0](https://github.com/sarpik/turbo-schedule/commit/fc9a1f06ff45fb3b37404c81f34947e508a68716))


### Reverts

* Revert "feat(scraper): Create `memoize` util..." ([8293256](https://github.com/sarpik/turbo-schedule/commit/8293256b1a024442e32b9542e0f18a05fe129c34))





## [1.7.2](https://github.com/sarpik/turbo-schedule/compare/v1.7.1...v1.7.2) (2019-11-21)


### Bug Fixes

* **scraper:** Stop saving bs & make scraper 4X FASTER!! 🌠🚀 ([13f765c](https://github.com/sarpik/turbo-schedule/commit/13f765cea3a7acbaad002acffdfd5ffdb94f7973))





# [1.7.0](https://github.com/sarpik/turbo-schedule/compare/v1.6.6...v1.7.0) (2019-11-20)


### Bug Fixes

* **scraper:** Handle errors @ `getStudentsListHtml` ([0db3150](https://github.com/sarpik/turbo-schedule/commit/0db3150b182eb48a1cd4ee21845a0580698719ae))
* **scraper:** Handle errors @ `scrapeStudentSchedule` ([51db295](https://github.com/sarpik/turbo-schedule/commit/51db2958662a4ee586702d8a37bdbf61401d01a1))
* **scraper:** Handle failed responses @ `getHtml` 🧯 ([4738c45](https://github.com/sarpik/turbo-schedule/commit/4738c4582d1bc467756d4964fe79115325e23bc5))


### Features

* **scraper:** Retry on failed scrapes! ⛑ ([0ad5093](https://github.com/sarpik/turbo-schedule/commit/0ad5093572310c1ce27777ae43ac97ae70a75d10))





## [1.6.6](https://github.com/sarpik/turbo-schedule/compare/v1.6.5...v1.6.6) (2019-11-18)


### Bug Fixes

* **scraper:** Return empty strings instead of `null` for `lessons` ([d43c3db](https://github.com/sarpik/turbo-schedule/commit/d43c3db10249df7be11dc9149b65afd6fe8dc458))





## [1.6.4](https://github.com/sarpik/turbo-schedule/compare/v1.6.3...v1.6.4) (2019-11-14)

**Note:** Version bump only for package @turbo-schedule/scraper





## [1.6.3](https://github.com/sarpik/turbo-schedule/compare/v1.6.2...v1.6.3) (2019-11-13)


### Bug Fixes

* Rename `cabinet` to `room` ([0537fba](https://github.com/sarpik/turbo-schedule/commit/0537fba190343d79ea039fd29ff52025cd6eec94))
* Rename `Cabinet` to `Room` ([411cd9a](https://github.com/sarpik/turbo-schedule/commit/411cd9a2e67f3f52e3c3183ebb2f022f255c3811))





## [1.6.2](https://github.com/sarpik/turbo-schedule/compare/v1.6.1...v1.6.2) (2019-11-13)

**Note:** Version bump only for package @turbo-schedule/scraper





## [1.6.1](https://github.com/sarpik/turbo-schedule/compare/v1.6.0...v1.6.1) (2019-11-12)


### Bug Fixes

* Handle `studentSchedule` -> `lessons` implications ([3d9e337](https://github.com/sarpik/turbo-schedule/commit/3d9e337a0269d4e1618a5fa2c26f53028f5e0633))
* Move `Student` model from `scraper` to `common` ([cc42181](https://github.com/sarpik/turbo-schedule/commit/cc42181a561dc58e032b57b911332b8d2ce26351))





# [1.6.0](https://github.com/sarpik/turbo-schedule/compare/v1.5.0...v1.6.0) (2019-10-31)

**Note:** Version bump only for package @turbo-schedule/scraper





# [1.5.0](https://github.com/sarpik/turbo-schedule/compare/v1.4.0...v1.5.0) (2019-10-24)

**Note:** Version bump only for package @turbo-schedule/scraper





# 1.0.0 (2019-10-22)


### Bug Fixes

* **scraper:** `forEach` => `for of` bcuz `continue` ([962a9df](https://github.com/sarpik/turbo-schedule/commit/962a9df8e75d1397f4d3776007a41313f243368a))
* **scraper:** Handle errors & count failures @ `getAllSchedules` ([3dc2788](https://github.com/sarpik/turbo-schedule/commit/3dc27884b4791fe71b9e0ea14c28429c1ffd4966))
* **scraper:** Use `fs.move` with `overwrite: true` ([c777399](https://github.com/sarpik/turbo-schedule/commit/c7773993bc547b440a7fd6d5b6a0700e4dd93842))
* Refurbish `test` scripts ([08e1021](https://github.com/sarpik/turbo-schedule/commit/08e10211036527a74acf55659a7d4649ded64ea2))
* **scraper:** Do not just invoke `createUniqueLessonsArray` lol ([47295f1](https://github.com/sarpik/turbo-schedule/commit/47295f1bff6d4c0fa17d1b65d80b92b6da0b4e26))
* **scraper:** Update package.json & tsconfig ([c677211](https://github.com/sarpik/turbo-schedule/commit/c67721126a59233c5405a23e8257c6a9bb88585d))


### Features

* **scraper:** Save the student's schedule's html ([cc549f2](https://github.com/sarpik/turbo-schedule/commit/cc549f297513ef1b7cb9f4a9631454cb501a8c87))
