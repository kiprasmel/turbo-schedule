# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
