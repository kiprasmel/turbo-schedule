# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.12.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.12.0...v2.12.1) (2021-02-18)


### Bug Fixes

* force **exact** versions for all dependencies ([05ae6d8](https://github.com/kiprasmel/turbo-schedule/commit/05ae6d8b78a2897753f7e65fe34b6b2cf02e6b35))





# [2.12.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.3...v2.12.0) (2021-02-18)


### Bug Fixes

* **client:** internationalize the common availability page ([171f8c6](https://github.com/kiprasmel/turbo-schedule/commit/171f8c628e86d3b9868a1cfe992d8b8290b36bac))
* always build docker images & dev builds with fake data 🔎 ([7d4f8e6](https://github.com/kiprasmel/turbo-schedule/commit/7d4f8e6c44c8b6694346cfc617aaed10f95b8363))
* bring back the sane typescript version ([2f250e4](https://github.com/kiprasmel/turbo-schedule/commit/2f250e43153c272ff5a21792f347e62957b18217))
* create hacky work-around for duplicate lessons @ availability ([72d118a](https://github.com/kiprasmel/turbo-schedule/commit/72d118ada45629b5a9503a8de3eb51aa6300528b))
* default yarn install to `--frozen-lockfile --check-files` ([8e4c417](https://github.com/kiprasmel/turbo-schedule/commit/8e4c4175ea5c0fa202ea46e157f09c0cfc5724c1))
* ensure busy & available participants are unique ([7f24a06](https://github.com/kiprasmel/turbo-schedule/commit/7f24a06351055d2d12abdda3ec9b279cfb1a6f39))
* fix "common availability" bug - account for **each** wanted participant in a lesson, not one ([609dd04](https://github.com/kiprasmel/turbo-schedule/commit/609dd0465e0cdb480b69a4ad5eda1bf09131b94a))
* handle err response properly @ common avail ([5e12cd0](https://github.com/kiprasmel/turbo-schedule/commit/5e12cd00c8414b45d98a8285d7206fbde240ed15))
* initialize db once starting server to make sure default data is created ([467744e](https://github.com/kiprasmel/turbo-schedule/commit/467744ed8141502ed19de96c0201cdc10957f26c))
* make a bug easy to spot:D ([6b67a29](https://github.com/kiprasmel/turbo-schedule/commit/6b67a29b599c0aacd59dc2a4123db1e65fab0011))
* use `cross-env-shell` to pass arguments to multiple commands ([1cf8569](https://github.com/kiprasmel/turbo-schedule/commit/1cf8569390ed54bb4721091bc043721b75bca4f0))


### Features

* create `/participant/random` route & use it for common-availability example ([df58b06](https://github.com/kiprasmel/turbo-schedule/commit/df58b060139a409e2d6284808917c85db0d00843))
* create common availability (beta) 🚀🚀 ([5fd7efa](https://github.com/kiprasmel/turbo-schedule/commit/5fd7efa2714b58b8087b26d97454a48ef36c4174))
* improve UI of extra info ([1a95ec2](https://github.com/kiprasmel/turbo-schedule/commit/1a95ec299ebf5c4f7894352a91363b345d3d3071))
* provide participant names instead of their count 👨👩 ([4a4bd16](https://github.com/kiprasmel/turbo-schedule/commit/4a4bd16b7334957a2c11aaec9c9abf3e6412076f))





## [2.11.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.2...v2.11.3) (2021-02-18)


### Bug Fixes

* **client:** add `resolutions` field for `@types/react` (finally fixes) ([2c5372c](https://github.com/kiprasmel/turbo-schedule/commit/2c5372cd8588b697d57f5a655c7487c42923019d)), closes [/github.com/DefinitelyTyped/DefinitelyTyped/issues/33822#issuecomment-606123081](https://github.com//github.com/DefinitelyTyped/DefinitelyTyped/issues/33822/issues/issuecomment-606123081)





## [2.11.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.1...v2.11.2) (2021-02-18)

**Note:** Version bump only for package turbo-schedule





## [2.11.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.0...v2.11.1) (2021-02-18)


### Bug Fixes

* **server:** create fake data instead of scraping in development ([914aaa5](https://github.com/kiprasmel/turbo-schedule/commit/914aaa554f061c76166aded6ba6704ac156ef383))





# [2.11.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.4...v2.11.0) (2021-02-18)


### Bug Fixes

* **client:** handle partly-empty schedule with lesson gap(s) ([79caef8](https://github.com/kiprasmel/turbo-schedule/commit/79caef8bd57a23648f205d7532084754dcf7d407))
* **server:** disable scraping by default, except in production ([0349a4a](https://github.com/kiprasmel/turbo-schedule/commit/0349a4a2f5de15dd94b953567adfb71c707ae9df))
* **server:** include `classes` in the `participant` lookup ([15a1dd6](https://github.com/kiprasmel/turbo-schedule/commit/15a1dd63592bbea61b7cb02d1add8a143b94839e))


### Features

* **database:** create `create-fake-data` 🔥🔥🔥 ([21f48f7](https://github.com/kiprasmel/turbo-schedule/commit/21f48f775d612169fbd3c36d79596d7039a133b8))
* **database:** create fake data if none available yet (ideal for new clones) 🚀 ([3bf22b5](https://github.com/kiprasmel/turbo-schedule/commit/3bf22b5cdeba7fbf6a6a5ba36f2d06ed7cb9fd09))



## 2.10.3 (2021-02-17)





## [2.10.4](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.3...v2.10.4) (2021-02-18)


### Bug Fixes

* **server:** disable scraping by default, except in production ([0349a4a](https://github.com/kiprasmel/turbo-schedule/commit/0349a4a2f5de15dd94b953567adfb71c707ae9df))





## [2.10.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.2...v2.10.3) (2021-02-17)


### Bug Fixes

* **client:** only track from specified domains ([99d1879](https://github.com/kiprasmel/turbo-schedule/commit/99d1879dd2cd0f8bda96e43ead5c994e953b489a))
* **scraper:** do not use the pipeline operator & switch to official typescript ([096d748](https://github.com/kiprasmel/turbo-schedule/commit/096d748ce6ba19047e74ed7d67fdd59bbdb2a41b))





## [2.10.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.1...v2.10.2) (2020-12-31)


### Bug Fixes

* **ci:** fix the syntax of adding env variable lol ([6139b35](https://github.com/kiprasmel/turbo-schedule/commit/6139b35503664f7288e210df671062c67e93ca2e))
* **ci:** update to latest github actions syntax ([b31a627](https://github.com/kiprasmel/turbo-schedule/commit/b31a6276800e228ee51bb8e9538546425b4f8e91))
* **client:** update to even leaner analytics ([75863e5](https://github.com/kiprasmel/turbo-schedule/commit/75863e51724dae5f90a803bd50da85b95341593a))
* **server:** do not die if scraper encounters error ([b67721f](https://github.com/kiprasmel/turbo-schedule/commit/b67721f1d31c922ee7baaeb72e183c46097766a5))



# 2.10.0 (2020-10-29)





## [2.10.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.0...v2.10.1) (2020-11-15)


### Bug Fixes

* **server:** do not die if scraper encounters error ([b67721f](https://github.com/kiprasmel/turbo-schedule/commit/b67721f1d31c922ee7baaeb72e183c46097766a5))





# [2.10.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.9.1...v2.10.0) (2020-10-29)


### Features

* **client:** add self-hosted user-friendly analytics! ([2950374](https://github.com/kiprasmel/turbo-schedule/commit/2950374c4f3272a6f6851be75d26a2cf1585a306))





## [2.9.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.9.0...v2.9.1) (2020-09-23)


### Bug Fixes

* add `/` to participant links to make them work ([085d153](https://github.com/kiprasmel/turbo-schedule/commit/085d1539e099f4401df14f01ec7a41aba2cdfd9b))





# [2.9.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.8.4...v2.9.0) (2020-09-02)


### Features

* show all participants in the mobile lesson's info modal ([de7a11f](https://github.com/kiprasmel/turbo-schedule/commit/de7a11f12718a4465f2059f009d437fd53d92834))





## [2.8.4](https://github.com/kiprasmel/turbo-schedule/compare/v2.8.3...v2.8.4) (2020-08-18)

**Note:** Version bump only for package turbo-schedule





## [2.8.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.8.2...v2.8.3) (2020-08-18)


### Bug Fixes

* update root url for api docs ([bddc706](https://github.com/kiprasmel/turbo-schedule/commit/bddc70604f29b2d37a56565ea02b8b901c62c853))





## [2.8.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.8.1...v2.8.2) (2020-08-18)


### Bug Fixes

* use the proper path for statically built client in production ([b57cd08](https://github.com/kiprasmel/turbo-schedule/commit/b57cd087f1f87abebbb92b64968f05576c732632))





## [2.8.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.8.0...v2.8.1) (2020-08-18)


### Bug Fixes

* redirect to API docs instead of providing them ([fc722cd](https://github.com/kiprasmel/turbo-schedule/commit/fc722cddc31292c3298cb972ea1a718ab6a04035))





# [2.8.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.7.3...v2.8.0) (2020-07-14)


### Bug Fixes

* **ci:** add `--check-files` to `yarn install` ([f8d6cbc](https://github.com/kiprasmel/turbo-schedule/commit/f8d6cbc58a41c3c80bb1c55b41f5b6219bb3521d))
* **client:** Create miscallanious fixes & improvements ([29141bf](https://github.com/kiprasmel/turbo-schedule/commit/29141bfc81d899ffd987996f04976d6f930ddb3b))
* **client:** Do not export `useTranslation` from `i18n` - errors with cycles ([24fb5c2](https://github.com/kiprasmel/turbo-schedule/commit/24fb5c2fc488671cee3f69cd4e703752298fc295))
* **client:** Do not filter out lessons by index if the selectedDay is `*` ([c6644e3](https://github.com/kiprasmel/turbo-schedule/commit/c6644e354c016b2123c161ddc238aac61de44feb))
* **client:** Fixes after review ([56e7cd8](https://github.com/kiprasmel/turbo-schedule/commit/56e7cd84ad3afbc7b429da209f3ff96ee5ecd2fe))
* **client:** Handle StudentListModal's edge cases & add z-index ([e167c2c](https://github.com/kiprasmel/turbo-schedule/commit/e167c2cae963535bcb3c472d9ac7562db24d9e99))
* **client:** Improve DaySelector's styles & css ([a51a255](https://github.com/kiprasmel/turbo-schedule/commit/a51a2550a8ac6a4d6a7057c53101ef2aa8599bd7))
* **client:** Temporarely disable the "*" (week) schedule selection ([cc5acbe](https://github.com/kiprasmel/turbo-schedule/commit/cc5acbe829cb34587013fc017a4dbfe3cb89ce80))


### Features

* **client:** Add a few translations ([438a24b](https://github.com/kiprasmel/turbo-schedule/commit/438a24b6190aef31450eedc780420ef7b8144e4e))
* **client:** Add some crazy amazing navigation @ mobile student schedule 🔥🔥🔥 ([6ef72e8](https://github.com/kiprasmel/turbo-schedule/commit/6ef72e83e52159eaf1ce9d1fae91fb5f5d26b33b))
* **client:** Add some css resets for `a`, `button` etc. ([01da2db](https://github.com/kiprasmel/turbo-schedule/commit/01da2dbaa3e82158d5dfbcd771243fd2bc43388e))
* **client:** Allow using `Header` & `Footer` conditionally ([9af0b85](https://github.com/kiprasmel/turbo-schedule/commit/9af0b85e4d2ef1563680badbba9ffe9a5b37fdeb))
* **client:** Create `getLesson(Start|End)Time` utils ([96965a5](https://github.com/kiprasmel/turbo-schedule/commit/96965a59c92d648c511d6db331b48c47df9569cd))
* **client:** Create a different, way better & simplier LangSelect! ([7a6d9b1](https://github.com/kiprasmel/turbo-schedule/commit/7a6d9b154e46e460f9aaccbd9883b82171c88b9d))
* **client:** Create a separate Navbar for mobile & improve both! 🔥🔥 ([7058e89](https://github.com/kiprasmel/turbo-schedule/commit/7058e89c84049f5452ef33c82875084c9ed9cfca))
* **client:** Create the alpha version of the new `SchedulePage`! 🔥 ([2ccb0b7](https://github.com/kiprasmel/turbo-schedule/commit/2ccb0b75f8590122057c3c0dc68809a89fa63cf1))
* **client:** Improve the shit outta the Landing page! 🚀 ([34b2572](https://github.com/kiprasmel/turbo-schedule/commit/34b2572ca8d402923e8e5b14c40be4f742b20ef1))
* **client:** Install emotion 💅 ([87d4fab](https://github.com/kiprasmel/turbo-schedule/commit/87d4fab9407916218ae36a7e9a495aca9c52bf9c))
* **client:** Make ParticipantList actually good! 🚀 ([4e58371](https://github.com/kiprasmel/turbo-schedule/commit/4e583710b49a4a2da3779ac0601cf1cd1c896bc4))
* **client:** Strike trough the lesson number if it's empty 〰 ([4f517f1](https://github.com/kiprasmel/turbo-schedule/commit/4f517f1291dabb1968594a3eab06f20d14e2ca27))
* **client:** Use the new Navbar instead of the old Header @ Landing! ([3417e60](https://github.com/kiprasmel/turbo-schedule/commit/3417e60239fe5b75d5fe5d55fa17e6f701974cbc))
* **common:** Create `parseParticipants` util ([cb75fa5](https://github.com/kiprasmel/turbo-schedule/commit/cb75fa5fc0aa1e016ce5faecef0ac7c1b6cbe5b6))





## [2.7.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.7.2...v2.7.3) (2020-05-27)


### Bug Fixes

* Update typescript version ([d7e114c](https://github.com/kiprasmel/turbo-schedule/commit/d7e114c1f77e9c2fcd737b2e65533a69cd8c8900))





## [2.7.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.7.1...v2.7.2) (2020-05-15)

**Note:** Version bump only for package turbo-schedule





## [2.7.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.7.0...v2.7.1) (2020-05-10)


### Bug Fixes

* **scraper:** Split by `\n` instead of `,` (upstream) ([d55f6eb](https://github.com/kiprasmel/turbo-schedule/commit/d55f6eb0ee86363827c72245e69e4d4596f7b4b0))





# [2.7.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.6.3...v2.7.0) (2020-05-06)


### Features

* Add temo typescript version to enable pipeline operators 🎷 ([795b970](https://github.com/kiprasmel/turbo-schedule/commit/795b970e1733f984e42d64050dfdb7fa018e143b))





## [2.6.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.6.2...v2.6.3) (2020-05-06)


### Bug Fixes

* **scraper:** Use somewhat type-safe `participants2D` accessor ([d3bb650](https://github.com/kiprasmel/turbo-schedule/commit/d3bb650ddb47eb1a00c89fdaa2e473ef67f165a2))





## [2.6.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.6.1...v2.6.2) (2020-04-29)


### Bug Fixes

* **scraper:** Change field saving order to the db ([f98c492](https://github.com/kiprasmel/turbo-schedule/commit/f98c492d468e178250c51672066365a5cd86b7a9))





## [2.6.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.6.0...v2.6.1) (2020-04-29)


### Bug Fixes

* **server:** Default `/api/` to `/api/v1` (the latest API router) ([10c8947](https://github.com/kiprasmel/turbo-schedule/commit/10c8947b94e6f12ee6f6f37623adab43cf27c53a))
* **server:** Default `/api/v1/` to `/api/v1/docs` ([d23bfa3](https://github.com/kiprasmel/turbo-schedule/commit/d23bfa3fda6a16a23e95851e55866019b0c844f1))





# [2.6.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.5.1...v2.6.0) (2020-04-29)


### Bug Fixes

* **client:** Allow `LessonTextBox`'s `text` to be `string` only ([bb38ecd](https://github.com/kiprasmel/turbo-schedule/commit/bb38ecdfcc396ea4a40140d00778ea3a730355e3))
* **client:** Display correct participant count & do not display participants if lesson is empty ([0ed4563](https://github.com/kiprasmel/turbo-schedule/commit/0ed4563a1951abcefdabc12ba9120895c8c145b3))
* **client:** Fetch from the new `/participant` (instead of `/schedule-item`) endpoint ([8358452](https://github.com/kiprasmel/turbo-schedule/commit/8358452960f0c464a19b448881942ba0bad22dbe))
* **common:** Handle empty `href`s @ `getSpecificScheduleURI` ([431a1dd](https://github.com/kiprasmel/turbo-schedule/commit/431a1ddcaece680bc49342a1e08efbaf4f2fa50f))
* **server:** Instead of using `new ...()`, use `getDefault...()` ([d5e8f61](https://github.com/kiprasmel/turbo-schedule/commit/d5e8f61b3dbee2314f451a6efe2ff43030ef67c3))
* **test:** Disable scraper cronjobs when running tests ([ed34388](https://github.com/kiprasmel/turbo-schedule/commit/ed34388b96a293f3374bbb2e299db63bf3640f79))
* Add missing `cross-env` for assigning env vars where missing ([6b15daf](https://github.com/kiprasmel/turbo-schedule/commit/6b15daf806af696853850e11d4258ad0cbbe855f))
* Do not `yarn purge` in `yarn setup` ([0fa33d9](https://github.com/kiprasmel/turbo-schedule/commit/0fa33d99ec9f28bd01bdba559176e2fe977e3dc7))
* In `setup:prod` script, first `install`, only then call `cross-env` ([619f990](https://github.com/kiprasmel/turbo-schedule/commit/619f9904c414bdc22c91764dc80115f3a4f1c79b))


### Features

* **common:** Create the `mergeBy` util! 🚀 ([b8299e9](https://github.com/kiprasmel/turbo-schedule/commit/b8299e9361b5bba7ae60929fc6184d9884f51729))
* **common:** Create the `Participant` model! 🚀 ([61bbf21](https://github.com/kiprasmel/turbo-schedule/commit/61bbf21ed58ae60e3fb7f6107e2bf31e9ad525cf))
* **db:** Extend schema with `participants`! ([97032ab](https://github.com/kiprasmel/turbo-schedule/commit/97032ab8b41cf89cf3fd3fa88595d2b8e56ff1cf))
* **scraper:** Add `labels` to `Participant`s on creation! ([f998b55](https://github.com/kiprasmel/turbo-schedule/commit/f998b55026abdc9182ba347a7ac53a483a4aba9e))
* **scraper:** Create `Initializer` type ([be6f9fc](https://github.com/kiprasmel/turbo-schedule/commit/be6f9fc3637b286aee0edfb4f9def08edfefc20b))
* **scraper:** Create `scrapeAndDoMagicWithLessonsFromParticipants` util ([3e3bcca](https://github.com/kiprasmel/turbo-schedule/commit/3e3bccadc197876ef3b263ed3a70f0e9e1c08b13))
* **scraper:** Handle `Participant`s @ lesson extraction! ([488c79c](https://github.com/kiprasmel/turbo-schedule/commit/488c79c0bef26e2c274eef1738a922291c8e909d))
* **scraper:** Use the new stuff to enable `Participant`s & more! 🔥 ([a822a4e](https://github.com/kiprasmel/turbo-schedule/commit/a822a4e0a4746eb334d55f307f027112233bb972))
* **server:** Allow disabling scraper cronjobs @ `startServer` ([0ac1c0a](https://github.com/kiprasmel/turbo-schedule/commit/0ac1c0aa19284f81b547c7fc6db83593b51a1fc0))
* **server:** Create the `/v1/participant` endpoint! ([7aad884](https://github.com/kiprasmel/turbo-schedule/commit/7aad8849dc1546184144f0a80dd64978adfcf077))



# 2.5.0 (2020-04-26)





## [2.5.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.5.0...v2.5.1) (2020-04-28)


### Bug Fixes

* Add missing `cross-env` for assigning env vars where missing ([6b15daf](https://github.com/kiprasmel/turbo-schedule/commit/6b15daf806af696853850e11d4258ad0cbbe855f))
* Also remove `./*/tsconfig.tsbuildinfo` @ purge ([0e1b973](https://github.com/kiprasmel/turbo-schedule/commit/0e1b973a0c1d214d602b403f8b73aa81811223a0))
* Do not `purge:build` before `build`ing ([f4ac803](https://github.com/kiprasmel/turbo-schedule/commit/f4ac8034ae04e38a454a114d55a024315057f1b8))
* Do not `yarn purge` in `yarn setup` ([0fa33d9](https://github.com/kiprasmel/turbo-schedule/commit/0fa33d99ec9f28bd01bdba559176e2fe977e3dc7))
* In `setup:prod` script, first `install`, only then call `cross-env` ([619f990](https://github.com/kiprasmel/turbo-schedule/commit/619f9904c414bdc22c91764dc80115f3a4f1c79b))
* Remove `./*/dist` instead of specifying every package ([d578c8a](https://github.com/kiprasmel/turbo-schedule/commit/d578c8a6b2f07ad8b4b4abc9ed461f28686d0673))
* Remove quotes around rimraf paths!! ([3ff92d1](https://github.com/kiprasmel/turbo-schedule/commit/3ff92d1af2e467099618c2480315084d767747bd))
* Use `npx rimraf` instead of `yarn rimraf` since we only use it once now! ([1a033b0](https://github.com/kiprasmel/turbo-schedule/commit/1a033b047bad6e7e99236e531a82bde67af31904))
* **db:** Replace invalid filename chars! ([f1ca949](https://github.com/kiprasmel/turbo-schedule/commit/f1ca9490a24602a2f17e3e807776ae69f21eed62))


### Reverts

* Revert "fix: Do not `purge:build` before `build`ing" ([90eb63a](https://github.com/kiprasmel/turbo-schedule/commit/90eb63aa91dac1484d9ac21afcfdc6f9747330e8))





# [2.5.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.4.0...v2.5.0) (2020-04-26)


### Bug Fixes

* **client:** Pass in the correct index to `LessonItem` ([74b8b8a](https://github.com/kiprasmel/turbo-schedule/commit/74b8b8a8d434c97414df34290760eb7b89249cb1))
* **common:** Allow having `students` in `NonUniqueLesson` ([352ee96](https://github.com/kiprasmel/turbo-schedule/commit/352ee96221e4242c6e536c6f32fd502f9d77027f))
* **common:** Remove `readonly` types from `Lesson` model's fields ([306b455](https://github.com/kiprasmel/turbo-schedule/commit/306b45524344074b43e4332d670fbe4bcf4edd95))
* **common:** Use `text` field for initializing `Class` ([bf8f0d4](https://github.com/kiprasmel/turbo-schedule/commit/bf8f0d40b1518083df3d1ad1c959aafab3515006))
* **scraper:** Merge all needed fields when merging lessons ([7244bc9](https://github.com/kiprasmel/turbo-schedule/commit/7244bc92f269ed39863287a059055560b4947cb1))


### Features

* **client:** Fetch from `schedule-item` to include all participants! ([ffd0127](https://github.com/kiprasmel/turbo-schedule/commit/ffd0127eaa7ce5dd6892abc4c4d2f11d05e636b0))
* **common:** Create `Room` model 🚀 ([38d6f93](https://github.com/kiprasmel/turbo-schedule/commit/38d6f931f22a5879b5a2418ac5469a8c48f6d533))
* **common:** Create `Scrapable` model ([b5f54ca](https://github.com/kiprasmel/turbo-schedule/commit/b5f54ca419bd53e6fc5689070dbb2627713816db))
* **common:** Create `Teacher` model 🚀 ([8ee4fa4](https://github.com/kiprasmel/turbo-schedule/commit/8ee4fa4573f697fb764c53f309016349f60571f5))
* **db:** Extend schema with `teachers` & `rooms`! ([0e3d0d9](https://github.com/kiprasmel/turbo-schedule/commit/0e3d0d917eeaaa751cc564ea4e73b45a2c7c2f37))
* **scraper:** Allow NOT passing in `scheduleEntityID` into `extractLessonsFactory` ([87a2468](https://github.com/kiprasmel/turbo-schedule/commit/87a24687de9c7b8fd1166a4669707fa05b66aacb))
* **scraper:** Create `extractLessonFromTeacherParser`! ([2ee1e2f](https://github.com/kiprasmel/turbo-schedule/commit/2ee1e2f783e7728157b4188426a1e19ca6033836))
* **scraper:** Create `findElementIndex` util! ([04d72d6](https://github.com/kiprasmel/turbo-schedule/commit/04d72d6bcf307e5ee6923b9c23ef84f5b6aee9d1))
* **scraper:** Create `scrapeScheduleItemList` to scrape any time of participant's schedule! 🔥 ([6f235a7](https://github.com/kiprasmel/turbo-schedule/commit/6f235a78bc44c9605bdc38c095fcc444f806af64))
* **scraper:** Use the new stuff to scrape `teachers` & `rooms`! 🚀 ([2df8f43](https://github.com/kiprasmel/turbo-schedule/commit/2df8f43c14c7a40b361f10673130562b02ba6300))
* **server:** Create the `/v1/room` api endpoint ([11f6b7a](https://github.com/kiprasmel/turbo-schedule/commit/11f6b7af3bf37f7b669c8b8dd1429d324e127038))
* **server:** Create the `/v1/teacher` api endpoint ([0a435a8](https://github.com/kiprasmel/turbo-schedule/commit/0a435a8678313868e76f5c8d14b4d630b43a0abb))
* **server:** Extend the `schedule-item` endpoint - include `teachers` & `rooms` too! ([520a914](https://github.com/kiprasmel/turbo-schedule/commit/520a9140541c0a9f3ae9e107b55e7569f99ec59e))





# [2.4.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.3.2...v2.4.0) (2020-04-21)


### Bug Fixes

* **db:** In `initDb`, ensure not only the directory, but the file too! 🚀 ([74b5ec7](https://github.com/kiprasmel/turbo-schedule/commit/74b5ec7ebfd724b2a71a232921bf2f013c7f123f))
* **scraper:** Use the new `setDbStateAndBackupCurrentOne` to avoid nasty errors! 🚀 ([5d093c6](https://github.com/kiprasmel/turbo-schedule/commit/5d093c6d281b92dbe2f4e59f4defc853dd39a120))


### Features

* Create a simple `yarn deve` script which includes `DEBUG=turbo-schedule*` ([f6f6287](https://github.com/kiprasmel/turbo-schedule/commit/f6f62878a7291440faa659f7d6cf990e118ede87))
* **db:** Create a 100x simplier successor of `setNewDbState` - `setDbState` 🔥🔥🔥 ([9a4f869](https://github.com/kiprasmel/turbo-schedule/commit/9a4f8692413e84b0ddf207a524f614cbbaddea8a))





## [2.3.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.3.1...v2.3.2) (2020-04-18)


### Bug Fixes

* Auto re-generate the `CHANGELOG`s 🔥 ([772f0c4](https://github.com/kiprasmel/turbo-schedule/commit/772f0c44481d67acd55250478e4beafe1a8ca801))
* Change the repository links in package.json lol ([537e765](https://github.com/kiprasmel/turbo-schedule/commit/537e765de4facc6e96c9975de218618cb05f3391))







## [2.3.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.3.0...v2.3.1) (2020-04-18)


### Bug Fixes

* **test:** Use `.write()` on top of `lowDb.setState()` ([e7d9aa2](https://github.com/kiprasmel/turbo-schedule/commit/e7d9aa268d372e7ccd98c948b21fad42607d23d5))



# [2.3.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.2.2...v2.3.0) (2020-04-18)


### Features

* **common:** Create `ScrapeInfo` model ([6df5f66](https://github.com/kiprasmel/turbo-schedule/commit/6df5f66b6e4725fdde42e9c8f5d14a832e73c8bb))
* **common:** Create `timeElapsed` util ([c6e6aac](https://github.com/kiprasmel/turbo-schedule/commit/c6e6aac4f5119d85272de0c95a65becc344c6671))
* **db:** Extend the schema with `scrapeInfo` ([cbc0253](https://github.com/kiprasmel/turbo-schedule/commit/cbc0253b8307f1852fc272209d24ed3eb5f203a8))
* **scraper:** Create & write `scrapeInfo` into the database! 🚀 ([75dd6c6](https://github.com/kiprasmel/turbo-schedule/commit/75dd6c6729e404e2d21bff77b5d3da83c32bcaad))
* **scraper:** Create `createPageVersionIdentifier` util ([b85f2c2](https://github.com/kiprasmel/turbo-schedule/commit/b85f2c213080d9ccfb7519d24c08b5bf34cdde2f))
* **scraper:** Create `wasScheduleUpdated` util ([e973eab](https://github.com/kiprasmel/turbo-schedule/commit/e973eab65da57c8c5da8db076bc1445667926f19))
* **server:** Create `runScraperIfUpdatesAvailable` util ([8fea54e](https://github.com/kiprasmel/turbo-schedule/commit/8fea54e73930956bb4c34992bbb5a70cb222ef89))
* **server:** Create `watchForUpdatesAndRunScraper` util / cronjob ([dc70d51](https://github.com/kiprasmel/turbo-schedule/commit/dc70d51cc7f78a1f0b427a7b7747ff9203865982))
* **server:** Enable `watchForUpdatesAndRunScraper` 🚀 ([9c362a8](https://github.com/kiprasmel/turbo-schedule/commit/9c362a8b80135c0a884a1fe03879bc9124e08540))



## [2.2.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.2.1...v2.2.2) (2020-04-17)


### Bug Fixes

* **server:** Make `eoas-gen` re-use pre-built spec, if it's available ([f8c7eff](https://github.com/kiprasmel/turbo-schedule/commit/f8c7eff710b987bee1d56029e0dd7601176f11ef))
* **server:** Remove hacks in `generateOpenAPIDocs` related to multiple rootDirs ([1c863d5](https://github.com/kiprasmel/turbo-schedule/commit/1c863d5e4505f0bc322fd491f38d31f3ef040f30))



## [2.2.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.5...v2.2.1) (2020-04-16)


### Bug Fixes

* **ci:** Do not run if a commit contains `[skip ci]` ([d193b2c](https://github.com/kiprasmel/turbo-schedule/commit/d193b2c83d30f4809b93aa6eabbbcc26745e23f4))
* **ci:** Pull all git history + all tags for lerna versioning ([e465024](https://github.com/kiprasmel/turbo-schedule/commit/e465024e045bf331ba6e9817f202afccd53f03f9))
* **common:** Add default param values for `createClass` ([8d2256e](https://github.com/kiprasmel/turbo-schedule/commit/8d2256e9e9039a0addfa6a769c6e4f9d50191294))
* **common:** Allow `Class` to have `lessons` field ([da18a2b](https://github.com/kiprasmel/turbo-schedule/commit/da18a2bab65ee6151c0afa0196ec83c059b98605))
* **common:** Parse `Student`'s `fullClassOrig` properly ([561ef0a](https://github.com/kiprasmel/turbo-schedule/commit/561ef0ab98fda0c9d29da339ee7d8cd58442db69))
* **scraper:** Make `mergeStudentsOfDuplicateLessons` concat full arrays ([1ddcd8f](https://github.com/kiprasmel/turbo-schedule/commit/1ddcd8f35adba3598b0a11901cedddfad8004fdd))
* **server:** Make sure we're using `await` with the database ([e0dd189](https://github.com/kiprasmel/turbo-schedule/commit/e0dd189abe0e074ddea1085348a85985a598b116))
* **server:** Remove `script` symlink - typescript ignores src/script too! ([f55b8df](https://github.com/kiprasmel/turbo-schedule/commit/f55b8df23b101363267dd55c3b75fb88a6a8fa89))
* **server:** Remove `tsconfig.tsbuildinfo` before building typescript ([4265026](https://github.com/kiprasmel/turbo-schedule/commit/4265026bd224a3a5d56a1e02864a74bb1ddbee96))


### Features

* **common:** Create `Schedule` model ([af888e3](https://github.com/kiprasmel/turbo-schedule/commit/af888e3ef4f928e7018391160c97961db406d69d))
* **common:** Create the `Class` model ([8674e25](https://github.com/kiprasmel/turbo-schedule/commit/8674e258c0617ba1ba640bee5558e6dd70bc3859))
* **common:** Export the `Schedule` & `Class` models ([ad28fad](https://github.com/kiprasmel/turbo-schedule/commit/ad28fad82f20f2996c2b8ce00a7af9de47ca3eca))
* **db:** Extend the schema with `classes` ([5c5af7d](https://github.com/kiprasmel/turbo-schedule/commit/5c5af7dd221bab6b166daeae62d8c1f6f79ced86))
* **scraper:** Collect unique lessons from classes too!! 🚀 ([21c1f34](https://github.com/kiprasmel/turbo-schedule/commit/21c1f349b914d91b05275574c15ca14e06bb1b89)), closes [/github.com/kiprasmel/turbo-schedule/issues/31#issuecomment-612705409](https://github.com//github.com/kiprasmel/turbo-schedule/issues/31/issues/issuecomment-612705409)
* **scraper:** Create `mergeStudentsOfDuplicateLessons` ([e913e59](https://github.com/kiprasmel/turbo-schedule/commit/e913e59d8e8b57f8439cbbe339046aa607f554c6))
* **scraper:** Create `scrapeClassList` util ([45ea373](https://github.com/kiprasmel/turbo-schedule/commit/45ea373da0b05ace22752e06d33b57af537c5eab))
* **scraper:** Rewrite `extractLessons` to allow individual parsers ([15e49a3](https://github.com/kiprasmel/turbo-schedule/commit/15e49a394c4e5625f43c9539d1e4b479c1952efd))
* **scraper:** Scrape the class list! ([043613f](https://github.com/kiprasmel/turbo-schedule/commit/043613fab0ef40a20d4d5fbf9dff57a31d3f4071))
* **scraper:** Use the new `mergeStudentsOfDuplicateLessons` 🚀 ([9eca8dd](https://github.com/kiprasmel/turbo-schedule/commit/9eca8dd0bef0e1d87929e94359051cd14d0464e3))
* **server:** Create API endpoint for `class` 🚀 ([e5994e4](https://github.com/kiprasmel/turbo-schedule/commit/e5994e4e6f664173dd15e1ad43cc2dd689b9444a))
* **server:** Create API endpoint for `schedule-item` 🚀 ([3c73488](https://github.com/kiprasmel/turbo-schedule/commit/3c734887609673b638218b2399d63b3fd478dbe0))


### Reverts

* Revert "fix(server): Remove `tsconfig.tsbuildinfo` before building typescript" ([0a0a683](https://github.com/kiprasmel/turbo-schedule/commit/0a0a68373daacd192e491d6a365637539c1e39df))



## [2.1.5](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.4...v2.1.5) (2020-04-12)


### Bug Fixes

* Add `repository` field to all `package.json`s ([7803f4d](https://github.com/kiprasmel/turbo-schedule/commit/7803f4d58156524ff2239cae146c7e1c8fdbfcf0))



## [2.1.4](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.3...v2.1.4) (2020-04-12)


### Bug Fixes

* Do not ignore `database/data/` @ `.dockerignore` & copy it @ `Dockerfile` ([7d85b76](https://github.com/kiprasmel/turbo-schedule/commit/7d85b7631ef97501484e707008752ead74816e35))
* **database:** Get rid of the "smart" dynamic paths based on production ([179f01e](https://github.com/kiprasmel/turbo-schedule/commit/179f01e34678b4ed9cc4b4a56cc11fc0a18374f0))
* **server:** Fix `package.json` `script` paths ([ca8777e](https://github.com/kiprasmel/turbo-schedule/commit/ca8777ef3ffc6acd091e838ba46163dae98b03c7))
* **server:** Move `server/script/` -> `server/src/script/` ([0bbce00](https://github.com/kiprasmel/turbo-schedule/commit/0bbce000552e593d4b7890e48e6a10b1472798c4))
* **server:** Move `server/test/` -> `server/src/test/` ([dc5d589](https://github.com/kiprasmel/turbo-schedule/commit/dc5d58920bee524cfbe322c2773a536fb06ddd44))
* **server:** Provide a `rootDir` instead of having multiple ones ([d903f08](https://github.com/kiprasmel/turbo-schedule/commit/d903f08af205daccbe2098e2fe7014c081744b55))



## [2.1.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.2...v2.1.3) (2020-04-12)


### Bug Fixes

* Use `cross-env NODE_ENV=production` in ALL build scripts ([08e9dc5](https://github.com/kiprasmel/turbo-schedule/commit/08e9dc538e6d0cdc57dad60e6643e54e0c363115))



## [2.1.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.1...v2.1.2) (2020-04-06)


### Bug Fixes

* **db:** Use correct path to `data` when in production ([f04f848](https://github.com/kiprasmel/turbo-schedule/commit/f04f848c27a4ac1271762ea0da9276895be3850f))



## [2.1.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.0...v2.1.1) (2020-04-06)


### Bug Fixes

* Include `database` inside `Dockerfile` & `.dockerignore` ([6d4b0ad](https://github.com/kiprasmel/turbo-schedule/commit/6d4b0ad9828e753afd12b2fbe7d0d365a00f5da4))



# [2.1.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.3...v2.1.0) (2020-04-06)


### Bug Fixes

* **ci:** Build fully before testing - something's currently missing ([2f9c646](https://github.com/kiprasmel/turbo-schedule/commit/2f9c6461fe8fc0f856f59c3534c14ab5b06020bb))
* **ci:** Disable `actions/setup-node` cause of upstream bug ([148dc63](https://github.com/kiprasmel/turbo-schedule/commit/148dc639804307ceb0afbaf438d57d3f5e57cdf9)), closes [/github.com/actions/setup-node/issues/132#issuecomment-609695951](https://github.com//github.com/actions/setup-node/issues/132/issues/issuecomment-609695951)
* **ci:** Inline jobs instead of trying to reuse them ([b5fda2c](https://github.com/kiprasmel/turbo-schedule/commit/b5fda2ce985538501f7b219c2a1c6d709b4a1a0a))
* **db:** Fix the patch ([2100a28](https://github.com/kiprasmel/turbo-schedule/commit/2100a28a0a25536bc4424962f40f680d0ab718a1))
* **db:** Introduce patches for `lowdb` & `@types/lowdb` ([42259b3](https://github.com/kiprasmel/turbo-schedule/commit/42259b343f5e88a6001776ea4a51ac06fee8563c))
* **db:** Remove `type: module` ([089ad27](https://github.com/kiprasmel/turbo-schedule/commit/089ad273672f69a8fc8ed5469f7fd71a76cd356b))
* **db:** Remove patches for `(@types/)lowdb` - broken ([0a01ad7](https://github.com/kiprasmel/turbo-schedule/commit/0a01ad7ab90dc864441198b29aee9c6ff575c843))
* **db:** Remove the `Change` import - too early:D ([efd03d7](https://github.com/kiprasmel/turbo-schedule/commit/efd03d7ecbabd4d079b728abafa68d9c375fcf73))
* **db:** Update the database logic to reflect patches ([435f389](https://github.com/kiprasmel/turbo-schedule/commit/435f389bd5179c7bfde32ac40bc723c761437297))
* **scraper:** Throw if there's an error ([90a0564](https://github.com/kiprasmel/turbo-schedule/commit/90a0564972edbf140c49bbc1662a3df5784aa7ae))
* **scraper:** Use the sync method of `fs.ensureDir` @ `extractUniqueLessonsSync` ([987aa4a](https://github.com/kiprasmel/turbo-schedule/commit/987aa4a7b2d7f3727df02758659f18608d49935e))
* **server:** Disable `json-server` for now ([bf37d05](https://github.com/kiprasmel/turbo-schedule/commit/bf37d051970c7f09e0f38b636a2411fd191e69f3))
* **server:** Handle requests when data was not found ([04d0fa3](https://github.com/kiprasmel/turbo-schedule/commit/04d0fa35da630efb2718d632689e72d21b6c57bc))
* **server:** Instead of renaming `students` to `studentsId`, empty out the `foreignKeySuffix` ([91b7613](https://github.com/kiprasmel/turbo-schedule/commit/91b76132aea0ae90c77622256a5fc1eba5d55c80))
* **server:** Make `/api/temp` READ-ONLY (through `json-server`) ([900dc4f](https://github.com/kiprasmel/turbo-schedule/commit/900dc4f4c2017c7d84e66dedce189b8beec758bc))
* **server:** Temporarily fix the "test:api" script ([4468f19](https://github.com/kiprasmel/turbo-schedule/commit/4468f195d9679884e3025ad04e79b9dc3adb7631))
* **server:** Use `await` for `db.get` @ `student`s API ([b20f755](https://github.com/kiprasmel/turbo-schedule/commit/b20f755566c659e7c46be5e33e5cba6e5dcd1d32))
* **test:** Fix'em server's API tests & explain the hurdle ([5415d6a](https://github.com/kiprasmel/turbo-schedule/commit/5415d6a395d7230185bf12e23f458c5d21e735ac))
* **test:** Force removal of temp fake database ([dc7c8ca](https://github.com/kiprasmel/turbo-schedule/commit/dc7c8cada97714e8403f5b23d142374add69655d))
* **test:** Update `student`s API tests (0 breaking changes) ([f01977b](https://github.com/kiprasmel/turbo-schedule/commit/f01977b0ff3e7172082fdd75b8f6a9ddd9d8fd8f))
* **test:** Update server's API tests to use the new db stuff! ([93e552f](https://github.com/kiprasmel/turbo-schedule/commit/93e552fc47c396227d89e637b982c7a53a1aefcf))
* **test:** Use the new db stuff @ server's API tests' setup & teardown ([d0abd8b](https://github.com/kiprasmel/turbo-schedule/commit/d0abd8baf64d012a247e0a15c5a64aa59334b83a))
* Pass in the correct ENV vars for `yarn test` script ([9bc5de4](https://github.com/kiprasmel/turbo-schedule/commit/9bc5de4dd699d33c5f0497cafc36589fdd606697))
* Rename `students` to `studentsId` @ `Lesson` model ([8b3f853](https://github.com/kiprasmel/turbo-schedule/commit/8b3f8530f5906ac6e5b9078676e7f7abf1633d78))


### Features

* **db:** Choose database file based on NODE_ENV ([8b5424f](https://github.com/kiprasmel/turbo-schedule/commit/8b5424fa14480293364fffd9c2444646eb6d839a))
* **db:** Create `fakeDb` util ([2dbe4e1](https://github.com/kiprasmel/turbo-schedule/commit/2dbe4e15dbce10e7c27277d412a55ab3b4292a5c))
* **db:** Create `injectDb` util ([678bf2b](https://github.com/kiprasmel/turbo-schedule/commit/678bf2b83991b13b77e8fb2dee10b551a53fac1b))
* **db:** Create `setNewDbState` (was it a mistake though?:/) ([f1239b1](https://github.com/kiprasmel/turbo-schedule/commit/f1239b1360970623d6d0028bf231d7a376907413))
* **db:** Export the `defaultDbState` ([46158f8](https://github.com/kiprasmel/turbo-schedule/commit/46158f827c8df27532bcb51d0c03909c60d9c5d3))
* **db:** Extract the name of `databaseFile` & export it ([b55c285](https://github.com/kiprasmel/turbo-schedule/commit/b55c285c896bc32568479ca3968b3a25aaf426d7))
* **db:** Install dependencies (debug, uuid, etc) ([09463df](https://github.com/kiprasmel/turbo-schedule/commit/09463dfe2ad22905b030ce117ecb5aa7acf59530))
* **db:** Instead of exporting the `db`, export it's `initDb` function ([bb55421](https://github.com/kiprasmel/turbo-schedule/commit/bb554213dc93854b4b9cb1d88e0dda51327b46f3))
* **docs:** Create README for `patches` & explain them ([7f5ebe1](https://github.com/kiprasmel/turbo-schedule/commit/7f5ebe1093370ea0378f1e042229a3750ce3dfcd))
* **scraper:** Stop using `.then` to cleanup & start also saving lessons to db ([08348bb](https://github.com/kiprasmel/turbo-schedule/commit/08348bbe0a65dbcbba0d59310575ebebafebceee))
* **server:** Add `database` pkg as a dependency ([ee1b068](https://github.com/kiprasmel/turbo-schedule/commit/ee1b0683fd61a7b191524ed78a3d91426d248b6f))
* **server:** Change email save path to the new database! 📧 ([0ef0340](https://github.com/kiprasmel/turbo-schedule/commit/0ef03409d2770245509ba8d1e622a85a495bdbe6))
* **server:** Create `mwPickFields` middleware util ([2b1ca9c](https://github.com/kiprasmel/turbo-schedule/commit/2b1ca9c148f726b0d0987bcf0e0c57363275fd9c))
* **server:** Install `(@types/)json-server` ([831a12f](https://github.com/kiprasmel/turbo-schedule/commit/831a12f16e2f0671dc63eda34627aed6d866c82f))
* **server:** Install dependencies (debug) ([397c9e9](https://github.com/kiprasmel/turbo-schedule/commit/397c9e9be6b6f86bc7d60bd92cd9dc5df04a6ea7))
* Add pkg `database` to workspace ([cd0a920](https://github.com/kiprasmel/turbo-schedule/commit/cd0a920e8ff41a09d42e56a24f2ae10332d63f83))
* Create patch for `steno` ([d186245](https://github.com/kiprasmel/turbo-schedule/commit/d186245bdc5c5e119cec1ac191a85641c1d7cf38))
* Create the `database` using `lowdb` ([f1d609b](https://github.com/kiprasmel/turbo-schedule/commit/f1d609bdaf43c4166f31e2eb73ce5b10a82f9a3c))
* Patch `json-server` to allow one-to-many relationship embedding ([f945a39](https://github.com/kiprasmel/turbo-schedule/commit/f945a395fdce49f07cbec45d231e190b31f4da25))
* Update patch for json-server (new one) ([856b001](https://github.com/kiprasmel/turbo-schedule/commit/856b00104f3bc8adbde3d3463e03615cea23233a))
* **server:** Create `mwReadOnly` middleware ([2af1023](https://github.com/kiprasmel/turbo-schedule/commit/2af1023e5ebc995f53454a0bf1f8c4308bd2125b))
* **server:** Use `json-server`s router @ `/api/temp` ([bcac3c4](https://github.com/kiprasmel/turbo-schedule/commit/bcac3c4202e6422e0bacf4ddf1a0f317af4d2b14))
* **server:** Use the new `database` for the `student` API 🚀 ([95163c9](https://github.com/kiprasmel/turbo-schedule/commit/95163c9d763b3030f0f9d9223057803d8082f119))


### Performance Improvements

* **scraper:** (BIG) Do NOT populate students with lessons 💣 ([1de0350](https://github.com/kiprasmel/turbo-schedule/commit/1de0350f0eef0f1994de33be63fba1f54542cd87))


### Reverts

* Revert "fix: Rename `students` to `studentsId` @ `Lesson` model" ([0ccbc65](https://github.com/kiprasmel/turbo-schedule/commit/0ccbc6568b03f81b0f63713a10d2b9f2c82b78a2))



## [2.0.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.2...v2.0.3) (2020-02-06)


### Bug Fixes

* **ci:** Apparently, you cannot re-use jobs:/ Inline instead ([479c4a1](https://github.com/kiprasmel/turbo-schedule/commit/479c4a1f01782bc8f0833f306d51160ffc6f23ba))
* **ci:** Create secrets & pass in env vars for `yarn docker:deploy` step ([26449ad](https://github.com/kiprasmel/turbo-schedule/commit/26449ad60c9fb7e53ef78272fedd4113a1e4a446))
* **ci:** Pass in `LATEST_TAG` env var into docker's version tag & push steps ([d2c3bab](https://github.com/kiprasmel/turbo-schedule/commit/d2c3babfb7dc14c0cee4ed6c50e044a6348e27e3))
* **ci:** Properly (re)store node_modules cache ([e1fd6f0](https://github.com/kiprasmel/turbo-schedule/commit/e1fd6f01dddd8473a0af5809761b42cd99acde8b))
* **ci:** Properly check if current branch is/is not `master` ([cb26351](https://github.com/kiprasmel/turbo-schedule/commit/cb26351a584e5abce652c8d773d3a24d4d461618))
* **ci:** Set git's user `name` & `email` ([9c86fb5](https://github.com/kiprasmel/turbo-schedule/commit/9c86fb59c4b405bfe36328ab63e16b37495ad64e))
* **server:** Make `fakeDb` `stopFakeDbSync` not fail on error ([3569dad](https://github.com/kiprasmel/turbo-schedule/commit/3569dadb48eea4c15f98f9045c0fbb5b70803d51))


### Features

* **ci:** Create `deploy` job (`master` only) ([5222d8a](https://github.com/kiprasmel/turbo-schedule/commit/5222d8ae889886a2034a50c9706cce46f5490c5d))
* **ci:** Create `install` job ([0944160](https://github.com/kiprasmel/turbo-schedule/commit/09441601531ccc3114bce8eea7ce4c2693334834))
* **ci:** Create `test` job ([fa88d07](https://github.com/kiprasmel/turbo-schedule/commit/fa88d07adf9f8d8f55811cc2b88366f28a550188))
* **ci:** Create github workflow `main.yaml` 🚀 ([81bf575](https://github.com/kiprasmel/turbo-schedule/commit/81bf575db92293041b1d469c7f7f9111252c955b))
* **ci:** Enable `install` job & run `test` + `build` in parallel ([9f297a1](https://github.com/kiprasmel/turbo-schedule/commit/9f297a12142bc8c78092f5559fb1217c546204d3))
* **ci:** Use *artifacts* to persist data between jobs ([9cfde35](https://github.com/kiprasmel/turbo-schedule/commit/9cfde354fabb44c077bd32631c1429f3d55c2508))


### Reverts

* Revert "feat(ci): Use *artifacts* to persist data between jobs" ([38b1364](https://github.com/kiprasmel/turbo-schedule/commit/38b136441f8dd42163239282cb2eeec7d9210029))



## [2.0.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.1...v2.0.2) (2020-02-05)



## [2.0.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.0...v2.0.1) (2020-02-05)


### Bug Fixes

* **client:** (Questionable) Use `nohoist` for `client`s `eslint` ([3ec4d3e](https://github.com/kiprasmel/turbo-schedule/commit/3ec4d3eec601d02c0f09afb6647c3d93ce4842f1))
* **client:** Extend from the correct eslint config (`kiprasmel`) ([4b34e43](https://github.com/kiprasmel/turbo-schedule/commit/4b34e433d69450c0bb0b92d639d8da16b59ae073))
* **lint:** Update `eslint` to `6.x` ([6a8b137](https://github.com/kiprasmel/turbo-schedule/commit/6a8b1372b17ea1d53a164178bad555cbfb3ad5a8))


### Features

* **lint:** Add `eslint.workingDirectories` to `.vscode/settings.json` ([2175fdd](https://github.com/kiprasmel/turbo-schedule/commit/2175fdd9e335da0395b7de3b2cb70a9f9c3d4599))
* **lint:** Create `.eslintignore` ([8ab1e94](https://github.com/kiprasmel/turbo-schedule/commit/8ab1e9450d4296e6728e8f5e934487572f946af7))
* **lint:** Create `.eslintrc.js` 🚀 ([114c4cc](https://github.com/kiprasmel/turbo-schedule/commit/114c4cc209bee1519a0ec17bb8a3b930821e87c5))
* **root:** Create npm scripts for linting & fixing ([db33244](https://github.com/kiprasmel/turbo-schedule/commit/db33244ead6dc41e67658881c7c108b60db19d23))



# [2.0.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.7.3...v2.0.0) (2020-02-05)


### Bug Fixes

* (revertable) Temporarily stop using `prettier` to avoid CRA errors ([caf8e52](https://github.com/kiprasmel/turbo-schedule/commit/caf8e52c832402cddff5628a281db806e1125a1d))
* **ci:** Update build step - use `yarn build:prod` script ([69c13da](https://github.com/kiprasmel/turbo-schedule/commit/69c13dace279843e5916b04d32bf5f7487aaa07b))
* **client:** Update react to `16.12` ([e597761](https://github.com/kiprasmel/turbo-schedule/commit/e59776113cf7c9a97b92eb7cdaaefa59dbb855e4))
* **client:** Update tsconfig to reference "../common" pkg ([71a55e9](https://github.com/kiprasmel/turbo-schedule/commit/71a55e9e2525bc8cb3abab86e2654b9eff43fc76))
* **client:** Use `?.` to access potentially undefined property ([91210d3](https://github.com/kiprasmel/turbo-schedule/commit/91210d336f36872e68b6929de8a8653519f7a14a))
* **common:** Add required dependencies to package.json ([a6729d8](https://github.com/kiprasmel/turbo-schedule/commit/a6729d83c07c52ada49df1a38b7adb72cd15edf8))
* **common:** Use dynamic imports to avoid errors in react ([47abfe3](https://github.com/kiprasmel/turbo-schedule/commit/47abfe3376706935f873c0c592660339fb74872c))
* **docs:** Use proper npm scripts in README's installation guide ([d10da37](https://github.com/kiprasmel/turbo-schedule/commit/d10da37824b5f7ff155391926fc872b85fb8752a))
* **root:** Add missing `&&` between 2 npm scripts 🚀 lol ([3c821ac](https://github.com/kiprasmel/turbo-schedule/commit/3c821acf4a1c071ad6f1e9e59f6f6d12135b0814))
* **root:** Update npm scripts to properly separate dev vs prod environments ([4b6f5f8](https://github.com/kiprasmel/turbo-schedule/commit/4b6f5f83ce212e0d27d02011604c32070e125e43))
* **server:** Create a little hack to copy `openAPI.json` once building for production ([9d0b2ab](https://github.com/kiprasmel/turbo-schedule/commit/9d0b2abd8fa82fcd2679525db86bd37def05e2da))
* **server:** Patch `express-oas-generator` to NOT keep only 1 example of an array ([2bd67ad](https://github.com/kiprasmel/turbo-schedule/commit/2bd67ad6a632420f0b0c4a1da13b4b59571cf957)), closes [/github.com/mpashkovskiy/express-oas-generator/issues/37#issuecomment-582141420](https://github.com//github.com/mpashkovskiy/express-oas-generator/issues/37/issues/issuecomment-582141420)
* **server:** Update npm scripts to properly separate dev vs prod environments ([0e71458](https://github.com/kiprasmel/turbo-schedule/commit/0e714586aa70be514363aef24f9277c155ef7130))


### Features

* **common:** Create `applyMixins` util (from ts, for ts) ([adf8f31](https://github.com/kiprasmel/turbo-schedule/commit/adf8f3199a3292eafc2a38efe022c79522eb18c0))
* **common:** Create `toJson` util ([8a81a15](https://github.com/kiprasmel/turbo-schedule/commit/8a81a156a7af146a2a9c244608736e29b0e5eace))
* **common:** Create `writeToSingleFile(Sync)` utils ([9049b6b](https://github.com/kiprasmel/turbo-schedule/commit/9049b6be68b91f7041ef8dcda04878b0ef76811f))
* **common:** Experiment with different ways of creating models ([f364ca7](https://github.com/kiprasmel/turbo-schedule/commit/f364ca7886f7a0d12880d71517f8d03bda5fc662))
* **common:** Improve the sh1t outta `Student` model! ([d385e8f](https://github.com/kiprasmel/turbo-schedule/commit/d385e8fe638529b7db76084f555d22f5b0710002))
* **common:** Improve the shoes outta `Lesson` model! ([9424abc](https://github.com/kiprasmel/turbo-schedule/commit/9424abcd79b02863ec6a50bdd15bb3f1185b6f2e))
* **scraper:** Create `memoize` util... ([8f4de3e](https://github.com/kiprasmel/turbo-schedule/commit/8f4de3e19e81a2b3ec09e6e94d91759b205f62de))
* **scraper:** Revamp `config` - single source of truth ([fc9a1f0](https://github.com/kiprasmel/turbo-schedule/commit/fc9a1f06ff45fb3b37404c81f34947e508a68716))


### Reverts

* Revert "feat(scraper): Create `memoize` util..." ([8293256](https://github.com/kiprasmel/turbo-schedule/commit/8293256b1a024442e32b9542e0f18a05fe129c34))
* Revert "feat(common): Experiment with different ways of creating models" ([71d308f](https://github.com/kiprasmel/turbo-schedule/commit/71d308f5c2001f231b686234fe1a99d82099d799))



## [1.7.3](https://github.com/kiprasmel/turbo-schedule/compare/v1.7.2...v1.7.3) (2019-12-27)


### Bug Fixes

* **server:** Remove wrong params from `handleRequests` ([1da8613](https://github.com/kiprasmel/turbo-schedule/commit/1da8613c17056d0b347cd78033d1774c6e997166))



## [1.7.2](https://github.com/kiprasmel/turbo-schedule/compare/v1.7.1...v1.7.2) (2019-11-21)


### Bug Fixes

* **scraper:** Stop saving bs & make scraper 4X FASTER!! 🌠🚀 ([13f765c](https://github.com/kiprasmel/turbo-schedule/commit/13f765cea3a7acbaad002acffdfd5ffdb94f7973))



## [1.7.1](https://github.com/kiprasmel/turbo-schedule/compare/v1.7.0...v1.7.1) (2019-11-21)


### Reverts

* Revert "refactor(server): Move `scrapedDataDirPath` into `generated/`" ([cf247f7](https://github.com/kiprasmel/turbo-schedule/commit/cf247f747fd72ed78b43538c41250240c33c93ff))



# [1.7.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.6...v1.7.0) (2019-11-20)


### Bug Fixes

* **ci:** Remove `saved-content` from cache ([cda3a5e](https://github.com/kiprasmel/turbo-schedule/commit/cda3a5ec8c670cec9b3f193be65d4e9d7bf1bc34))
* **scraper:** Handle errors @ `getStudentsListHtml` ([0db3150](https://github.com/kiprasmel/turbo-schedule/commit/0db3150b182eb48a1cd4ee21845a0580698719ae))
* **scraper:** Handle errors @ `scrapeStudentSchedule` ([51db295](https://github.com/kiprasmel/turbo-schedule/commit/51db2958662a4ee586702d8a37bdbf61401d01a1))
* **scraper:** Handle failed responses @ `getHtml` 🧯 ([4738c45](https://github.com/kiprasmel/turbo-schedule/commit/4738c4582d1bc467756d4964fe79115325e23bc5))


### Features

* **scraper:** Retry on failed scrapes! ⛑ ([0ad5093](https://github.com/kiprasmel/turbo-schedule/commit/0ad5093572310c1ce27777ae43ac97ae70a75d10))



## [1.6.6](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.5...v1.6.6) (2019-11-18)


### Bug Fixes

* **scraper:** Return empty strings instead of `null` for `lessons` ([d43c3db](https://github.com/kiprasmel/turbo-schedule/commit/d43c3db10249df7be11dc9149b65afd6fe8dc458))
* **server:** Set app to trust proxy ([c600edc](https://github.com/kiprasmel/turbo-schedule/commit/c600edc6444c74c0eb318357ca92c8cc78be080e)), closes [/github.com/expressjs/morgan/issues/214#issuecomment-555068350](https://github.com//github.com/expressjs/morgan/issues/214/issues/issuecomment-555068350)



## [1.6.5](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.4...v1.6.5) (2019-11-16)


### Bug Fixes

* **server:** Use `--force` with `cp` when updating openAPI docs ([dae731d](https://github.com/kiprasmel/turbo-schedule/commit/dae731d3e71cd17d30b2228975f086ee9d95c35b))
* **server:** Use the newer `eoas-gen` API for docs generation ([91003d6](https://github.com/kiprasmel/turbo-schedule/commit/91003d6242bf1d67fb8a6eaa15009d9d647c4849))



## [1.6.4](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.3...v1.6.4) (2019-11-14)


### Bug Fixes

* Remove `eoas-gen` patch ([1981ab8](https://github.com/kiprasmel/turbo-schedule/commit/1981ab81902f069d8c7c2b0f9e19fdc0f9f3757c))



## [1.6.3](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.2...v1.6.3) (2019-11-13)


### Bug Fixes

* Rename `cabinet` to `room` ([0537fba](https://github.com/kiprasmel/turbo-schedule/commit/0537fba190343d79ea039fd29ff52025cd6eec94))
* Rename `Cabinet` to `Room` ([411cd9a](https://github.com/kiprasmel/turbo-schedule/commit/411cd9a2e67f3f52e3c3183ebb2f022f255c3811))



## [1.6.2](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.1...v1.6.2) (2019-11-13)


### Bug Fixes

* **server:** Bring back & fix the tests for `/student/:studentName` ([2d58ac0](https://github.com/kiprasmel/turbo-schedule/commit/2d58ac04c404f8cf9b2b8e0ecfae2fac14ca8705))
* **server:** Return consistent `emailEntry` fields ([0ac1324](https://github.com/kiprasmel/turbo-schedule/commit/0ac1324e331e3eb0bb30c7dbfe7031ec106be36d))



## [1.6.1](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.0...v1.6.1) (2019-11-12)


### Bug Fixes

* Handle `studentSchedule` -> `lessons` implications ([3d9e337](https://github.com/kiprasmel/turbo-schedule/commit/3d9e337a0269d4e1618a5fa2c26f53028f5e0633))
* Move `Student` model from `scraper` to `common` ([cc42181](https://github.com/kiprasmel/turbo-schedule/commit/cc42181a561dc58e032b57b911332b8d2ce26351))
* **server:** Rename API field `studentSchedule` to `lessons` ([6bd9eda](https://github.com/kiprasmel/turbo-schedule/commit/6bd9eda1856cce1e3fd12e2172a94de25d4a5126))
* **server:** Rename API filed `studentsList` to `students` ([65f4d28](https://github.com/kiprasmel/turbo-schedule/commit/65f4d287ec49141fcd7b404db6f3ce542d484938))



# [1.6.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.5.0...v1.6.0) (2019-10-31)


### Bug Fixes

* **server:** Add `--forceExit` to `jest`/`test` script ([9df1016](https://github.com/kiprasmel/turbo-schedule/commit/9df101636a938a7c25c27c70fd174a31e9403669))
* **server:** Handle if file exists checking @ student-list ([b1bb972](https://github.com/kiprasmel/turbo-schedule/commit/b1bb9724ba5def9c3fb835129fd3ae117894bbe4))
* **server:** Make `applyAPIDocsGenerator` the first middleware! 🚀 ([0467a88](https://github.com/kiprasmel/turbo-schedule/commit/0467a88192007c480a3cbc9cec687921abba52e4))
* **server:** Modify `build:docs` script - make it independent ([0f43d6c](https://github.com/kiprasmel/turbo-schedule/commit/0f43d6cede067309bb241142274cca299f1264dc))
* **server:** Serve openAPI docs from the same filename ([6c03181](https://github.com/kiprasmel/turbo-schedule/commit/6c03181e809b7fcf3db15fcd024a11f9e1a1dd26))
* **server:** Use `child_process.execSync` to run tests w/ script! ([90360f8](https://github.com/kiprasmel/turbo-schedule/commit/90360f8d306fbb77c2cc2e576b0e7d8e1117fa71))
* Remove a patch that does not serve us well:D ([d798d46](https://github.com/kiprasmel/turbo-schedule/commit/d798d4673261354acc9728caa688447210b1c24d)), closes [/github.com/mpashkovskiy/express-oas-generator/pull/32#issuecomment-546630020](https://github.com//github.com/mpashkovskiy/express-oas-generator/pull/32/issues/issuecomment-546630020)
* **test:** Stop ignoring `test/` folder in `server/tsconfig.json` ([e8d01b6](https://github.com/kiprasmel/turbo-schedule/commit/e8d01b61adc5548b61cc84ec055ff1d2a42124e5))


### Features

* **common:** Create `delay` util ([a5a374e](https://github.com/kiprasmel/turbo-schedule/commit/a5a374e383349399de3e5020c8f11301c19d215f))
* **server:** Add `pathToStudentDataArrayFile` to config ([7998e42](https://github.com/kiprasmel/turbo-schedule/commit/7998e42428346659eb09450ca530228ef1b3e886))
* **server:** Create `build:docs` npm script ([917c353](https://github.com/kiprasmel/turbo-schedule/commit/917c3538b5f26fb7306d33b2589f6645cf9fbe9c))
* **server:** Create `fakeDb` test utility! 🤡 ([0d510f9](https://github.com/kiprasmel/turbo-schedule/commit/0d510f9ac282441803e447f6d12201d4379c641c))
* **server:** Start using `modifyGeneratedAPIDocs` again! 🔥 ([f5bb5c3](https://github.com/kiprasmel/turbo-schedule/commit/f5bb5c339ab9696083554ef5efbc857bca16df8e))
* **server:** Write modified docs to same file; provide html description ([bd58c90](https://github.com/kiprasmel/turbo-schedule/commit/bd58c90c2724641dc67eb24200ff5b0266a5451c))
* Create a different patch to allow onWriteCallback ([6debdab](https://github.com/kiprasmel/turbo-schedule/commit/6debdabbb173a08e0e8e14ae0b50c5b14144227f))


### Reverts

* Revert "test: Add everything that did NOT work for future reference" ([d144fc6](https://github.com/kiprasmel/turbo-schedule/commit/d144fc619cc67546f30e30d564cf409f5de4c21f))



# [1.5.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.4.0...v1.5.0) (2019-10-24)


### Bug Fixes

* **server:** Clean up `email` & `student` routes ([3bc1343](https://github.com/kiprasmel/turbo-schedule/commit/3bc13438c0759f896aff74fe677f80f336477f98))
* **server:** Clean up directory/file (path) naming @ config ([ab080bf](https://github.com/kiprasmel/turbo-schedule/commit/ab080bf700de73e6edd4033d201397ed22a1e41d))
* **server:** Fix config imports in `script/` dir ([7b96cdd](https://github.com/kiprasmel/turbo-schedule/commit/7b96cdd3e50268db45a1c7de8c0bb7ec02e30284))
* **server:** Realise that you need to watch all ts files! ([0d8f80b](https://github.com/kiprasmel/turbo-schedule/commit/0d8f80bae034ca697a7a6893553b9db14730a2b7))
* **server:** Update config imports (clean AF!) ([87c35ea](https://github.com/kiprasmel/turbo-schedule/commit/87c35eaf772bb8ec67b99f8c940b5703975c09a0))
* **server:** Update to latest config exports ([c2c75cd](https://github.com/kiprasmel/turbo-schedule/commit/c2c75cd6f8bfd6bc88aae5b840d66314c3317d0c))


### Features

* **server:** Export config vars directly, not inside an {} 🚀 ([d4324cc](https://github.com/kiprasmel/turbo-schedule/commit/d4324cc522082435672eb1c97b728e514ce98438))
* **server:** Provide default return values from API ([78097f3](https://github.com/kiprasmel/turbo-schedule/commit/78097f3df7cc4dad5db6314f2b746560bee7b1c3))
* **server:** Start logging warnings/errors to console ([355f74a](https://github.com/kiprasmel/turbo-schedule/commit/355f74a2452553b288201a7c58b1cd0d92069f69))



# [1.4.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.3.0...v1.4.0) (2019-10-23)


### Features

* **server:** Create `setupLogger` util ([bbb42cc](https://github.com/kiprasmel/turbo-schedule/commit/bbb42ccd8a31eba85c2f8882889534d3069ec287))
* **server:** Install `morgan` & `rotating-file-stream` ([ecf9745](https://github.com/kiprasmel/turbo-schedule/commit/ecf974576dbac5e41385674abc18e5c4d81ccfd9))
* **server:** Use `setupLogger` util ([09850d1](https://github.com/kiprasmel/turbo-schedule/commit/09850d19ac93e439a4496aa158ec2bd35919856f))



# [1.3.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.2.1...v1.3.0) (2019-10-23)


### Bug Fixes

* **ci:** Try `echo`ing properly with double quotes ([c7ff40e](https://github.com/kiprasmel/turbo-schedule/commit/c7ff40e3e7c5939ec18c8cdabdb037e02ddd1688))


### Features

* **ci:** Run `yarn lerna version` once done deploying ([2313066](https://github.com/kiprasmel/turbo-schedule/commit/2313066bcdbc5f914563a28ce3049164a41cea9e))
* **server:** Refactor `email` route & handle duplicates ([bd1dbb3](https://github.com/kiprasmel/turbo-schedule/commit/bd1dbb308ea2b919324ffc4653428d0a21b56434))
* **tests:** Update `email` route tests ([bc56341](https://github.com/kiprasmel/turbo-schedule/commit/bc56341fadc746ff9be5c842cc52eafb86bdbb04))



## [1.2.1](https://github.com/kiprasmel/turbo-schedule/compare/v1.2.0...v1.2.1) (2019-10-23)


### Bug Fixes

* **server:** Get rid of `.env` & relatives ([d80be08](https://github.com/kiprasmel/turbo-schedule/commit/d80be08088cc94e06b0775ba061b268d5c7f44b4))



# [1.2.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.1.0...v1.2.0) (2019-10-23)


### Bug Fixes

* **server:** Disable `debug` for `loadDotEnv` ([0167af2](https://github.com/kiprasmel/turbo-schedule/commit/0167af2da345e0f1406e3d1e565def013e41a6f2))
* **server:** Extract `app`s middleware out of `startServer` for proper exports ([b0e01a2](https://github.com/kiprasmel/turbo-schedule/commit/b0e01a2abccdd04dacdd7f068bb05b8d7892a13c))
* **server:** Set `PORT` env var once tests are ran ([3a436b3](https://github.com/kiprasmel/turbo-schedule/commit/3a436b30b575a7b588b117b02bea02fb33cca3e5))
* **server:** Simplify `.env` naming & usage ([93aede4](https://github.com/kiprasmel/turbo-schedule/commit/93aede452cd924b057eb623c2dae5029dc3e623d))


### Features

* **server:** Create `.env.example` ([1b600d7](https://github.com/kiprasmel/turbo-schedule/commit/1b600d737f02e490aad27cf0e42fbf7cf6fb20b3))
* Install `dotenv` & create `loadDotEnv` util & use it ([b389b9a](https://github.com/kiprasmel/turbo-schedule/commit/b389b9a8b1fb0d00e40b80420c638c3fbf63a701))
* **server:** Install jest, ts-jest, supertest & their types ([e82b2f2](https://github.com/kiprasmel/turbo-schedule/commit/e82b2f2fd3f173b9811a27a007a5e96ae24787b4))
* **tests:** Create my first ever test! 🧪 ([644715b](https://github.com/kiprasmel/turbo-schedule/commit/644715b297e5283a672d9ee7236cd14d08b7c89e))
* **tests:** Create tests for `/email` API ([1b206b7](https://github.com/kiprasmel/turbo-schedule/commit/1b206b7115e7929f1c0a90349e597a27cf6b5941))
* **tests:** Create tests for `/student` API ([d6dabcc](https://github.com/kiprasmel/turbo-schedule/commit/d6dabccc7e312abd16978259e0273282205ba4ba))
* Create `jest.config.js` & a yarn script for jest ([59a5673](https://github.com/kiprasmel/turbo-schedule/commit/59a5673e94bc07d95e26f4978423feceee8203bf))



# [1.1.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.0.0...v1.1.0) (2019-10-23)


### Bug Fixes

* **client:** Get rid of input's value validation altogether ([75acdb1](https://github.com/kiprasmel/turbo-schedule/commit/75acdb1c20ab5fe6d5811f80e6b39043319b6ae4))
* **client:** Validate the whole value instead of only the first char ([0047722](https://github.com/kiprasmel/turbo-schedule/commit/0047722b6c466d118b40439c54651a5da734d6a4))
* **server:** Do not use `localhost` for `redoc`s `spec-url` ([0a22ed3](https://github.com/kiprasmel/turbo-schedule/commit/0a22ed3f2df20a964277c021d21facc69432bd34))
* **server:** Remove `async/await` from useless places ([7ced520](https://github.com/kiprasmel/turbo-schedule/commit/7ced52018b745436668485aace6995f9f63d0e25))
* **server:** Update .gitignore - allow `generated/` ([676ba6d](https://github.com/kiprasmel/turbo-schedule/commit/676ba6d8b83bad316ebb2ac99a9bda14900f7179))


### Features

* **server:** Use `axios` instead of `fetch` & improve typescript ([ffa47b3](https://github.com/kiprasmel/turbo-schedule/commit/ffa47b3ee8cda3e41ad112ffc9a6771d5b794a13))



# [1.0.0](https://github.com/kiprasmel/turbo-schedule/compare/1ff81bdba6fb25786e7a72f7f4e7ae6a9eadfb4f...v1.0.0) (2019-10-22)


### Bug Fixes

* **ci:** Update save_cache path for `saved-content` ([b5080ef](https://github.com/kiprasmel/turbo-schedule/commit/b5080ef66e29de7c1a4756b837f1f09ccd3407a5))
* Update yarn.lock (typescript was incorrect version etc) ([ae4c771](https://github.com/kiprasmel/turbo-schedule/commit/ae4c7714e836123b0dfd45caf7baf13e3f4ec1c4))
* **client:** Handle errors & provide defautls @ `fetchStudentsList` ([ccc997f](https://github.com/kiprasmel/turbo-schedule/commit/ccc997f8f07d923a2bff1c05f6e6f641fb661797))
* **client:** Make `BackBtn` navigate to `"/"` ([9e66804](https://github.com/kiprasmel/turbo-schedule/commit/9e668045869b5affa7edacf7884d0747e1ddad28))
* **client:** Run tests in ci mode ([c44a4e0](https://github.com/kiprasmel/turbo-schedule/commit/c44a4e0bbfcd553c4e378f0304575b0040aba1fa))
* **client:** Set `outDir` to `build/` ([a5e6209](https://github.com/kiprasmel/turbo-schedule/commit/a5e6209828d36669b09779833edbf59add317399))
* **client:** Set ReactModal's app element to "body" ([6e953bd](https://github.com/kiprasmel/turbo-schedule/commit/6e953bd53cd2b1972e796f51eff93bcb52ddfc18))
* **client:** Update tsconfig & package.json ([27cfb28](https://github.com/kiprasmel/turbo-schedule/commit/27cfb282b9bec218bd8392a86cec25d50bf8cf71))
* **client:** Use `cross-env` for yarn script ([6aa20ae](https://github.com/kiprasmel/turbo-schedule/commit/6aa20aef67c9a60d7ecfd12657eb9d7f4b801404))
* **common:** Update tsconfig & package.json ([c65de29](https://github.com/kiprasmel/turbo-schedule/commit/c65de29dca99d228749e6bc0ea76ee4f5af07f0b))
* **scraper:** `forEach` => `for of` bcuz `continue` ([962a9df](https://github.com/kiprasmel/turbo-schedule/commit/962a9df8e75d1397f4d3776007a41313f243368a))
* **scraper:** Do not just invoke `createUniqueLessonsArray` lol ([47295f1](https://github.com/kiprasmel/turbo-schedule/commit/47295f1bff6d4c0fa17d1b65d80b92b6da0b4e26))
* **scraper:** Handle errors & count failures @ `getAllSchedules` ([3dc2788](https://github.com/kiprasmel/turbo-schedule/commit/3dc27884b4791fe71b9e0ea14c28429c1ffd4966))
* **scraper:** Update package.json & tsconfig ([c677211](https://github.com/kiprasmel/turbo-schedule/commit/c67721126a59233c5405a23e8257c6a9bb88585d))
* **scraper:** Use `fs.move` with `overwrite: true` ([c777399](https://github.com/kiprasmel/turbo-schedule/commit/c7773993bc547b440a7fd6d5b6a0700e4dd93842))
* **server:** Actually enable the scraper cronjob ([9601d2c](https://github.com/kiprasmel/turbo-schedule/commit/9601d2c35b97f34257b6b501399725607365b990))
* **server:** Clean up `server` & `runScraperCronjob` ([1ff81bd](https://github.com/kiprasmel/turbo-schedule/commit/1ff81bdba6fb25786e7a72f7f4e7ae6a9eadfb4f))
* **server:** Handle exceptions when reading/parsing docs ([b8e3d47](https://github.com/kiprasmel/turbo-schedule/commit/b8e3d477e8c7415ef749eb3fd4c57c0eace2e60d))
* **server:** Move `openAPIDocs` into `v1` of `api` routes ([501b60e](https://github.com/kiprasmel/turbo-schedule/commit/501b60e9bfea3a0e92accbb0883e88cfe315edbf))
* **server:** Move `predeploy` into `scrape-content` script ([041aad8](https://github.com/kiprasmel/turbo-schedule/commit/041aad84ec208a224b261c6c7e35aee971b58dd1))
* **server:** Move `start-server` into `script/` ([975848e](https://github.com/kiprasmel/turbo-schedule/commit/975848ef79ef3fab0c123289ca77cf8d869d89b5))
* **server:** Properly forward middleware w/ `next` ([2e5fdf2](https://github.com/kiprasmel/turbo-schedule/commit/2e5fdf204af25f7196318906e23668f136e7a3ab))
* **server:** Properly handle static file serving ([ef51bc9](https://github.com/kiprasmel/turbo-schedule/commit/ef51bc9955342b06d2785945fc8acebc44945336))
* **server:** Remove `rootDir` from `tsconfig.json` ([bc78422](https://github.com/kiprasmel/turbo-schedule/commit/bc7842228df4582505a411d5ee31b48a2eb4187b))
* **server:** Remove unnecessary/unreachable route ([3405b36](https://github.com/kiprasmel/turbo-schedule/commit/3405b3675b8da23334bc7c38b1dacef14cc3e75d))
* **server:** Resolve to correct path when serving docs ([a585004](https://github.com/kiprasmel/turbo-schedule/commit/a58500476a2c1687cce5b87abb675c22ca52b1d8))
* **server:** Update .gitignore ([b7d47be](https://github.com/kiprasmel/turbo-schedule/commit/b7d47be1be302be14253984a085696b584f7899a))
* **server:** Update `main` & `typings` @ `package.json` ([78ab269](https://github.com/kiprasmel/turbo-schedule/commit/78ab269df7d7a269bda194b66f3ff8d81c3af6f7))
* **server:** Update scripts ([603f6ff](https://github.com/kiprasmel/turbo-schedule/commit/603f6ff42ffc18ce85112aa5860181de3255feac))
* **server:** Update tsconfig to ignore `test/` ([894a43c](https://github.com/kiprasmel/turbo-schedule/commit/894a43c26e0966b359bba1c3006cf581e66b1f70))
* **server:** Use docs generator ONLY in NON-production env ([6816a42](https://github.com/kiprasmel/turbo-schedule/commit/6816a42b820bc3b12491a4e86fa3948703fd7beb))
* Add `strict`: `true` to `tsconfig-base.json` ([ab13f7e](https://github.com/kiprasmel/turbo-schedule/commit/ab13f7eb3d58c4d809e8f5e315e9be73d5302149))
* Provide fallback for build:ts via `npx` ([2b4fd7b](https://github.com/kiprasmel/turbo-schedule/commit/2b4fd7b65c0a549e76b871d5ea3a86841bd85ae4))
* Refurbish `test` scripts ([08e1021](https://github.com/kiprasmel/turbo-schedule/commit/08e10211036527a74acf55659a7d4649ded64ea2))
* Use `apiRouter` in server for `/api` ([0f71e68](https://github.com/kiprasmel/turbo-schedule/commit/0f71e681e15e74a1ba5c6d09ad274e4830f1f175))
* **server:** Update tsconfig & package.json ([e4b0a6c](https://github.com/kiprasmel/turbo-schedule/commit/e4b0a6c04367ee1d3ae6343b17b8fcef2101499c))


### Features

* **ci:** Instead of building in docker, copy node_modules lmao 😈😈😈 ([6d095a4](https://github.com/kiprasmel/turbo-schedule/commit/6d095a4ba7f87508849996ff8c3187b40d734994))
* Create `express-oas-generator` patch ([d220dc7](https://github.com/kiprasmel/turbo-schedule/commit/d220dc7cec979a69009959968472012561ccda9c))
* Start using `patch-package` to apply patches ([4d75131](https://github.com/kiprasmel/turbo-schedule/commit/4d751318891650fc904a8f2b8223e90f3bd15208))
* Update the sh1t outta `package.json` scripts! ([4bab28b](https://github.com/kiprasmel/turbo-schedule/commit/4bab28b211d01bc1bfa400a948b132f2d5911053))
* **scraper:** Save the student's schedule's html ([cc549f2](https://github.com/kiprasmel/turbo-schedule/commit/cc549f297513ef1b7cb9f4a9631454cb501a8c87))
* **server:** Create `generate-openapi-docs` script ([8cc9ae3](https://github.com/kiprasmel/turbo-schedule/commit/8cc9ae362e2e787b4f14bb86a7d521f538f830b7))
* **server:** Create `index.d.ts` for `server/script/module`s ([28bcf89](https://github.com/kiprasmel/turbo-schedule/commit/28bcf89bd66ace51e2479407d290d016d6adc0f0))
* **server:** Create `isProd` util ([8d83dc4](https://github.com/kiprasmel/turbo-schedule/commit/8d83dc4c4db66f81f1624fd5c29634bd1ea4da5d))
* **server:** Create `modify-generated-openapi-docs` script! ([32099f3](https://github.com/kiprasmel/turbo-schedule/commit/32099f3b52316cd67ccb6a2da46a1c174be17f6f))
* **server:** Create `modifyGeneratedAPIDocs` script module ([6598c8d](https://github.com/kiprasmel/turbo-schedule/commit/6598c8d999b43933beaa304c10c7b0dd571a15a3))
* **server:** Create build scripts! 👷‍♀️ ([c680439](https://github.com/kiprasmel/turbo-schedule/commit/c6804395ed544bd519f4ff29e0772cd1aa46d165))
* **server:** Improve the sh1t outta `openAPIDocs`! ([02001cf](https://github.com/kiprasmel/turbo-schedule/commit/02001cf5758fcd19946f4a90befaa69b881de016))
* **server:** Install `express-oas-generator` ([905b7d6](https://github.com/kiprasmel/turbo-schedule/commit/905b7d67de749b06978c82bfe5da7599ff39e60b))
* **server:** Move & improve the SH1T outta `modifyGeneratedAPIDocs`! ([4668b35](https://github.com/kiprasmel/turbo-schedule/commit/4668b358a09b7c422c65633f950858daa30fbc10))
* **server:** Provide config options; remove callback ([5a2fa5c](https://github.com/kiprasmel/turbo-schedule/commit/5a2fa5c5a784dff7004f669fca51ad0b92a7f1a7))
* **server:** Return the created server! ([1ed5cef](https://github.com/kiprasmel/turbo-schedule/commit/1ed5cef28c65b2e30a26dc4a619a6f0dfe19c717))
* **server:** Update `email` route ([3159aa2](https://github.com/kiprasmel/turbo-schedule/commit/3159aa2cb50d2286ea701f22af56c9ad0826d984))
* **server:** Update the sh1t ooutta `apiV1` & `api` routers! ([a084ff7](https://github.com/kiprasmel/turbo-schedule/commit/a084ff7679a4053d24546ae06cb80352c20985d3))
* **server:** Update the sh1t outta `applyAPIDocsGenerator`! ([9d1e267](https://github.com/kiprasmel/turbo-schedule/commit/9d1e267208d9ecd4b0e8cb4003d3881c0cd98001))
* **server:** Update the sh1t outta `student` route! ([7de711b](https://github.com/kiprasmel/turbo-schedule/commit/7de711b6a9adc8771e44094807097c34fdc0c061))
* **server:** Use `applyAPIDocsGenerator` after server is listening ([f0144f5](https://github.com/kiprasmel/turbo-schedule/commit/f0144f56b1c21562af23ef56c02a35fdd0bedaa6))
* Create `apiRouter` for all `/api` route handling ([ad83935](https://github.com/kiprasmel/turbo-schedule/commit/ad83935c60830a137c16a97353cbb24fae17509b))
* Create `applyAPIDocsGenerator` util & use it ([b996a25](https://github.com/kiprasmel/turbo-schedule/commit/b996a2594030632e413d64f433302923d289c6fa))
* Create `modifyGeneratedAPIDocs` util ([0855286](https://github.com/kiprasmel/turbo-schedule/commit/0855286528d27f26cfe58e82a55e00dcc769d678))
* Create `openAPIDocs.ts` route utility ([3713b20](https://github.com/kiprasmel/turbo-schedule/commit/3713b208ab505929c7b92a97bbd2a2212df48fd6))
* Install swagger-jsdoc, swagger-ui-express, redoc etc. ([4afb6ee](https://github.com/kiprasmel/turbo-schedule/commit/4afb6ee772cbb2bb1f9bfe23f926289d5fc0b8df))
* Serve *auto-generated* API docs! ([d339254](https://github.com/kiprasmel/turbo-schedule/commit/d3392545c2f176e8ed290adecadf8b57db3260fc))
* Start versioning API endpoints (now @ `v1`) ([55b20db](https://github.com/kiprasmel/turbo-schedule/commit/55b20dbb7d10662e8c5fce1630f1e53f2ba58d2b))
* Turn `server.ts` into a module ([727f543](https://github.com/kiprasmel/turbo-schedule/commit/727f543a78e9bad2fa3e6473b154d77214e62d24))


### Reverts

* Revert "docs: Attempt *manually* documenting endpoints lmao" ([2757046](https://github.com/kiprasmel/turbo-schedule/commit/2757046b74c86941e5bf46083776443fd1859b86))
