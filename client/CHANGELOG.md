# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.33.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.32.6...v2.33.0) (2023-08-22)


### Features

* introduce build info ([6005b29](https://github.com/kiprasmel/turbo-schedule/commit/6005b296265c5fd2f290057c45860d33a7525413))





## [2.32.6](https://github.com/kiprasmel/turbo-schedule/compare/v2.32.5...v2.32.6) (2023-05-11)

**Note:** Version bump only for package @turbo-schedule/client





## [2.32.5](https://github.com/kiprasmel/turbo-schedule/compare/v2.32.4...v2.32.5) (2023-01-17)


### Bug Fixes

* **client:** remove random/experimental bg color from desktop schedule page ([7fe5ecb](https://github.com/kiprasmel/turbo-schedule/commit/7fe5ecb552475386963144b2e0541f9a8090d750))





## [2.32.4](https://github.com/kiprasmel/turbo-schedule/compare/v2.32.3...v2.32.4) (2022-08-29)


### Bug Fixes

* **client:** do not show children in hierarchy if only 1 child ([ec41dc7](https://github.com/kiprasmel/turbo-schedule/commit/ec41dc7a42241d9dce12fa575e5356d1ee6ee53f))





## [2.32.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.32.2...v2.32.3) (2022-05-28)


### Bug Fixes

* **client:** expand not-yet-acknowledged warning only if high importance (warning, but not for info) ([07682ba](https://github.com/kiprasmel/turbo-schedule/commit/07682ba565574dd758f80770b7526787cc41874f))





## [2.32.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.32.1...v2.32.2) (2022-05-28)

**Note:** Version bump only for package @turbo-schedule/client





## [2.32.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.32.0...v2.32.1) (2022-05-28)


### Bug Fixes

* use `window.addEventListener` to get windowWidth, implement `throttle`, get rid of lodash's ([7548750](https://github.com/kiprasmel/turbo-schedule/commit/754875087cdc5cf69c294df206e0f77bac7d9a59))
* use react-app-rewired to modify webpack's config to get rid of the `dynamicRequire` warning ([99cb49e](https://github.com/kiprasmel/turbo-schedule/commit/99cb49e1df9976ba2c34ea0608044e7afc708c22))





# [2.32.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.31.1...v2.32.0) (2022-03-10)


### Features

* improve sticky warning into warning or info, based on fresh vs outdated data ([3695387](https://github.com/kiprasmel/turbo-schedule/commit/369538732f6dc17a615de294c87453c0d911f813))





## [2.31.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.31.0...v2.31.1) (2021-12-29)


### Bug Fixes

* show "outdated data" warning as light blue if it's less than 1 day ([551ac2b](https://github.com/kiprasmel/turbo-schedule/commit/551ac2bcb01261cfa1d779dd36b0a23f29e7c49d))





# [2.31.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.30.3...v2.31.0) (2021-12-08)


### Features

* **client:** create & show `StickyWarningAboutOutdatedData` to inform about current issues ([bf35ad4](https://github.com/kiprasmel/turbo-schedule/commit/bf35ad4995a980f06936254808abbbc8d064e7f3))





## [2.30.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.30.2...v2.30.3) (2021-10-23)

**Note:** Version bump only for package @turbo-schedule/client





## [2.30.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.30.1...v2.30.2) (2021-09-19)

**Note:** Version bump only for package @turbo-schedule/client





## [2.30.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.30.0...v2.30.1) (2021-09-19)

**Note:** Version bump only for package @turbo-schedule/client





# [2.30.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.29.0...v2.30.0) (2021-09-19)

**Note:** Version bump only for package @turbo-schedule/client





# [2.29.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.28.3...v2.29.0) (2021-09-19)


### Bug Fixes

* **client:** stupid typescript error fix ([b939d34](https://github.com/kiprasmel/turbo-schedule/commit/b939d3464e23339b5960ac24cec356f2643cedf7))
* **client:** use `use-fetched-state` @ tsconfig ([b3566fc](https://github.com/kiprasmel/turbo-schedule/commit/b3566fcccc7ef35a130b6339b7392b3ccaba7a3a))


### Features

* improve use-fetched-state ([b5bfe7b](https://github.com/kiprasmel/turbo-schedule/commit/b5bfe7bea6b4897528877e56ac9f8c16b47b3a09))





## [2.28.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.28.2...v2.28.3) (2021-09-07)

**Note:** Version bump only for package @turbo-schedule/client





## [2.28.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.28.1...v2.28.2) (2021-09-07)


### Bug Fixes

* mark all packages as `private` (except use-fetched-state) to avoid trying to publish to npm ([9acb07b](https://github.com/kiprasmel/turbo-schedule/commit/9acb07b84af453b2020cf9d61462b8768ba385cb))





## [2.28.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.28.0...v2.28.1) (2021-09-07)


### Bug Fixes

* remove old naming of "useStateFetch" ([ac601bf](https://github.com/kiprasmel/turbo-schedule/commit/ac601bf8f68dff00a8f44c2936b6825fc5e64854))





# [2.28.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.27.0...v2.28.0) (2021-09-05)


### Bug Fixes

* **client:** cleanup & use the new `use-fetched-state` pkg! ([926249e](https://github.com/kiprasmel/turbo-schedule/commit/926249e4e3aa8644687a2f28192be85f1b02f53a))
* dump axios - back to fetch bby 🌵 ([d4e4bd8](https://github.com/kiprasmel/turbo-schedule/commit/d4e4bd895b4d46f808ad3a46eb42c7a23c956f34))





# [2.27.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.26.0...v2.27.0) (2021-09-04)


### Features

* **client:** make mailing list joiner closable; also close after joining, with some timeout ([9aa46e0](https://github.com/kiprasmel/turbo-schedule/commit/9aa46e04f8af588b768c8a579fab9daa682a8768))





# [2.26.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.25.0...v2.26.0) (2021-08-31)


### Bug Fixes

* upgrade typescript & fix the pair types ([ef207cf](https://github.com/kiprasmel/turbo-schedule/commit/ef207cfb82c900fbbcee12c40ba208ea3af1056a))


### Features

* create participant picker hierarchy 🔥🔥🔥 ([92a289c](https://github.com/kiprasmel/turbo-schedule/commit/92a289c25d9079761ebefc727f39c0a89c7b9b7a))





# [2.24.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.23.2...v2.24.0) (2021-07-05)


### Features

* **client:** test Availability to *not* reset extra info day & time if participants selected ([f15bd18](https://github.com/kiprasmel/turbo-schedule/commit/f15bd1856e8a41f2c826f18fa85c579428b85308))





## [2.23.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.23.1...v2.23.2) (2021-07-04)


### Bug Fixes

* **client:** do not reset time & date @ common avail if >0 participants selected ([d46c360](https://github.com/kiprasmel/turbo-schedule/commit/d46c360d7398824e091d31ebd9126af377d15490))





## [2.23.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.23.0...v2.23.1) (2021-07-02)

**Note:** Version bump only for package @turbo-schedule/client





# [2.23.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.22.1...v2.23.0) (2021-07-01)


### Features

* **client:** do not use classifier because participant type already is available ([62c666d](https://github.com/kiprasmel/turbo-schedule/commit/62c666d8c8782dc45e675a3df33bf418749adeba))
* classify participant through api if scraper specific classifier fails ([49af97d](https://github.com/kiprasmel/turbo-schedule/commit/49af97d27d3a0155976afb3e2a1c789b5534a257))





## [2.22.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.22.0...v2.22.1) (2021-07-01)


### Bug Fixes

* **client:** use pretty times symbol instead of X ([b070812](https://github.com/kiprasmel/turbo-schedule/commit/b0708126cbd178fa48e1b1e7ef689f5a1085ffc9))





# [2.22.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.22.0-alpha.0...v2.22.0) (2021-06-29)

**Note:** Version bump only for package @turbo-schedule/client





# [2.22.0-alpha.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.21.1-alpha.0...v2.22.0-alpha.0) (2021-06-29)


### Bug Fixes

* **client:** do not fetch expensive resource if it's cancelled ([65588bf](https://github.com/kiprasmel/turbo-schedule/commit/65588bffc5ccc124c5f017aa40ff5fef0569da7b))
* react types ([c8127b8](https://github.com/kiprasmel/turbo-schedule/commit/c8127b86f5e9b8baa7a814d164d08004a992e65d))


### Features

* **client:** upgrade to react 18 alpha ([9dbe704](https://github.com/kiprasmel/turbo-schedule/commit/9dbe7045ef0a54d8c7c02fd1092f2c7db7dfc819))
* **client:** use startTransition to defer less important updates @ Availability ([fe0c780](https://github.com/kiprasmel/turbo-schedule/commit/fe0c780bc7061fe9fff765d0ab9ede8020172c9c))





## [2.21.1-alpha.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.21.0...v2.21.1-alpha.0) (2021-06-29)

**Note:** Version bump only for package @turbo-schedule/client





# [2.21.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.20.0...v2.21.0) (2021-06-26)


### Features

* create /comfy/ participant picker in common availability ([4ff262a](https://github.com/kiprasmel/turbo-schedule/commit/4ff262abf19df9a2456ab670d5c984c44577156c))





# [2.20.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.19.0...v2.20.0) (2021-04-16)


### Bug Fixes

* **client:** student schedule `isLoading` state `false` by default ([e1c3207](https://github.com/kiprasmel/turbo-schedule/commit/e1c32073c6c1fd26c0db47c43ef83535f11e2459))


### Features

* **client:** create LRUCache utils & hooks to add/get most recent participants 👀 ([415c9e9](https://github.com/kiprasmel/turbo-schedule/commit/415c9e97d4bb6f9329c2b591b96c91565d189c25))
* **client:** display most recent participants individually by group/label 🚀 ([b5378ea](https://github.com/kiprasmel/turbo-schedule/commit/b5378ea1e060273fea3c631404ab306df6172410))
* **client:** use LRUCache utils to track most recent participants ([2fa617a](https://github.com/kiprasmel/turbo-schedule/commit/2fa617a08d17d3cce173cb9ac053eb18175a9a5c))





# [2.19.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.18.0...v2.19.0) (2021-04-13)


### Bug Fixes

* **client:** use LRUCache as single source of truth instead of an intermediary ([8121842](https://github.com/kiprasmel/turbo-schedule/commit/8121842042986e40ffe708ab2d35fcbd2c0b9509))
* **client:** use LRUCache's value from localStorage to fix stale state ([07a5be6](https://github.com/kiprasmel/turbo-schedule/commit/07a5be650a5c15460996d5d99629a365696f899e))





# [2.18.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.17.0...v2.18.0) (2021-04-13)


### Features

* show recently viewed participants via LRU cache 🔥 ([93bfe7d](https://github.com/kiprasmel/turbo-schedule/commit/93bfe7d9c9be1d927caf7a6d67bdfc239bc1e4a6))





# [2.17.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.16.0...v2.17.0) (2021-04-12)


### Features

* **client:** fix useQueryFor & add encoding/decoding of values ([a521960](https://github.com/kiprasmel/turbo-schedule/commit/a521960a52a51c9997b25b1cf233a74c9ba35da7))
* **client:** sync selected day & time @ availability to query params too ([e6bbc4b](https://github.com/kiprasmel/turbo-schedule/commit/e6bbc4b3594e479219dcba6a5dbb71412ce3a93b))





# [2.16.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.15.3...v2.16.0) (2021-04-11)


### Bug Fixes

* **client:** Use translated "See an example" text ([c049748](https://github.com/kiprasmel/turbo-schedule/commit/c049748521226c739fb2b31032cfb272cfc24f4f))


### Features

* **client:** highlight lesson on load if it's selected via url hash ([e4bc18b](https://github.com/kiprasmel/turbo-schedule/commit/e4bc18b61b8a89c9d2275caa3b965261b3fbba63))
* display lesson info @ availability & properly link to them (html hash to id) ([d18803e](https://github.com/kiprasmel/turbo-schedule/commit/d18803ed7183b5292b96ddf52b61c54a7772d178))





## [2.15.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.15.2...v2.15.3) (2021-04-11)

**Note:** Version bump only for package @turbo-schedule/client





## [2.15.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.15.1...v2.15.2) (2021-04-11)


### Bug Fixes

* **client:** bind extra info of common availability to update once availability itself updates ([c65f0c1](https://github.com/kiprasmel/turbo-schedule/commit/c65f0c149e99ffc7a5b7e70c97feae9a24af2030))





## [2.14.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.14.0...v2.14.1) (2021-04-11)

**Note:** Version bump only for package @turbo-schedule/client





# [2.14.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.13.1...v2.14.0) (2021-04-11)

**Note:** Version bump only for package @turbo-schedule/client





## [2.13.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.13.0...v2.13.1) (2021-04-11)

**Note:** Version bump only for package @turbo-schedule/client





# [2.13.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.12.3...v2.13.0) (2021-03-18)

**Note:** Version bump only for package @turbo-schedule/client





## [2.12.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.12.0...v2.12.1) (2021-02-18)


### Bug Fixes

* force **exact** versions for all dependencies ([05ae6d8](https://github.com/kiprasmel/turbo-schedule/commit/05ae6d8b78a2897753f7e65fe34b6b2cf02e6b35))





# [2.12.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.3...v2.12.0) (2021-02-18)


### Bug Fixes

* **client:** internationalize the common availability page ([171f8c6](https://github.com/kiprasmel/turbo-schedule/commit/171f8c628e86d3b9868a1cfe992d8b8290b36bac))
* bring back the sane typescript version ([2f250e4](https://github.com/kiprasmel/turbo-schedule/commit/2f250e43153c272ff5a21792f347e62957b18217))


### Features

* create `/participant/random` route & use it for common-availability example ([df58b06](https://github.com/kiprasmel/turbo-schedule/commit/df58b060139a409e2d6284808917c85db0d00843))
* create common availability (beta) 🚀🚀 ([5fd7efa](https://github.com/kiprasmel/turbo-schedule/commit/5fd7efa2714b58b8087b26d97454a48ef36c4174))
* improve UI of extra info ([1a95ec2](https://github.com/kiprasmel/turbo-schedule/commit/1a95ec299ebf5c4f7894352a91363b345d3d3071))
* provide participant names instead of their count 👨👩 ([4a4bd16](https://github.com/kiprasmel/turbo-schedule/commit/4a4bd16b7334957a2c11aaec9c9abf3e6412076f))





## [2.11.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.2...v2.11.3) (2021-02-18)


### Bug Fixes

* **client:** add `resolutions` field for `@types/react` (finally fixes) ([2c5372c](https://github.com/kiprasmel/turbo-schedule/commit/2c5372cd8588b697d57f5a655c7487c42923019d)), closes [/github.com/DefinitelyTyped/DefinitelyTyped/issues/33822#issuecomment-606123081](https://github.com//github.com/DefinitelyTyped/DefinitelyTyped/issues/33822/issues/issuecomment-606123081)





## [2.11.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.1...v2.11.2) (2021-02-18)

**Note:** Version bump only for package @turbo-schedule/client





# [2.11.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.4...v2.11.0) (2021-02-18)


### Bug Fixes

* **client:** handle partly-empty schedule with lesson gap(s) ([79caef8](https://github.com/kiprasmel/turbo-schedule/commit/79caef8bd57a23648f205d7532084754dcf7d407))



## 2.10.3 (2021-02-17)





## [2.10.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.2...v2.10.3) (2021-02-17)


### Bug Fixes

* **client:** only track from specified domains ([99d1879](https://github.com/kiprasmel/turbo-schedule/commit/99d1879dd2cd0f8bda96e43ead5c994e953b489a))
* **scraper:** do not use the pipeline operator & switch to official typescript ([096d748](https://github.com/kiprasmel/turbo-schedule/commit/096d748ce6ba19047e74ed7d67fdd59bbdb2a41b))





## [2.10.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.1...v2.10.2) (2020-12-31)


### Bug Fixes

* **client:** update to even leaner analytics ([75863e5](https://github.com/kiprasmel/turbo-schedule/commit/75863e51724dae5f90a803bd50da85b95341593a))





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

**Note:** Version bump only for package @turbo-schedule/client





# [2.8.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.7.3...v2.8.0) (2020-07-14)


### Bug Fixes

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





## [2.7.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.7.2...v2.7.3) (2020-05-27)


### Bug Fixes

* Update typescript version ([d7e114c](https://github.com/kiprasmel/turbo-schedule/commit/d7e114c1f77e9c2fcd737b2e65533a69cd8c8900))





# [2.7.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.6.3...v2.7.0) (2020-05-06)


### Features

* Add temo typescript version to enable pipeline operators 🎷 ([795b970](https://github.com/kiprasmel/turbo-schedule/commit/795b970e1733f984e42d64050dfdb7fa018e143b))





# [2.6.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.5.1...v2.6.0) (2020-04-29)


### Bug Fixes

* **client:** Allow `LessonTextBox`'s `text` to be `string` only ([bb38ecd](https://github.com/kiprasmel/turbo-schedule/commit/bb38ecdfcc396ea4a40140d00778ea3a730355e3))
* **client:** Display correct participant count & do not display participants if lesson is empty ([0ed4563](https://github.com/kiprasmel/turbo-schedule/commit/0ed4563a1951abcefdabc12ba9120895c8c145b3))
* **client:** Fetch from the new `/participant` (instead of `/schedule-item`) endpoint ([8358452](https://github.com/kiprasmel/turbo-schedule/commit/8358452960f0c464a19b448881942ba0bad22dbe))
* **server:** Instead of using `new ...()`, use `getDefault...()` ([d5e8f61](https://github.com/kiprasmel/turbo-schedule/commit/d5e8f61b3dbee2314f451a6efe2ff43030ef67c3))



# 2.5.0 (2020-04-26)





# [2.5.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.4.0...v2.5.0) (2020-04-26)


### Bug Fixes

* **client:** Pass in the correct index to `LessonItem` ([74b8b8a](https://github.com/kiprasmel/turbo-schedule/commit/74b8b8a8d434c97414df34290760eb7b89249cb1))


### Features

* **client:** Fetch from `schedule-item` to include all participants! ([ffd0127](https://github.com/kiprasmel/turbo-schedule/commit/ffd0127eaa7ce5dd6892abc4c4d2f11d05e636b0))





## [2.3.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.3.1...v2.3.2) (2020-04-18)


### Bug Fixes

* Auto re-generate the `CHANGELOG`s 🔥 ([772f0c4](https://github.com/kiprasmel/turbo-schedule/commit/772f0c44481d67acd55250478e4beafe1a8ca801))
* Change the repository links in package.json lol ([537e765](https://github.com/kiprasmel/turbo-schedule/commit/537e765de4facc6e96c9975de218618cb05f3391))







## [2.1.5](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.4...v2.1.5) (2020-04-12)


### Bug Fixes

* Add `repository` field to all `package.json`s ([7803f4d](https://github.com/kiprasmel/turbo-schedule/commit/7803f4d58156524ff2239cae146c7e1c8fdbfcf0))



## [2.1.4](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.3...v2.1.4) (2020-04-12)



## [2.1.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.2...v2.1.3) (2020-04-12)



## [2.1.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.1...v2.1.2) (2020-04-06)



## [2.1.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.0...v2.1.1) (2020-04-06)



# [2.1.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.3...v2.1.0) (2020-04-06)


### Bug Fixes

* Rename `students` to `studentsId` @ `Lesson` model ([8b3f853](https://github.com/kiprasmel/turbo-schedule/commit/8b3f8530f5906ac6e5b9078676e7f7abf1633d78))


### Reverts

* Revert "fix: Rename `students` to `studentsId` @ `Lesson` model" ([0ccbc65](https://github.com/kiprasmel/turbo-schedule/commit/0ccbc6568b03f81b0f63713a10d2b9f2c82b78a2))



## [2.0.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.2...v2.0.3) (2020-02-06)



## [2.0.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.1...v2.0.2) (2020-02-05)



## [2.0.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.0...v2.0.1) (2020-02-05)


### Bug Fixes

* **client:** Extend from the correct eslint config (`kiprasmel`) ([4b34e43](https://github.com/kiprasmel/turbo-schedule/commit/4b34e433d69450c0bb0b92d639d8da16b59ae073))



# [2.0.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.7.3...v2.0.0) (2020-02-05)


### Bug Fixes

* **client:** Update react to `16.12` ([e597761](https://github.com/kiprasmel/turbo-schedule/commit/e59776113cf7c9a97b92eb7cdaaefa59dbb855e4))
* **client:** Update tsconfig to reference "../common" pkg ([71a55e9](https://github.com/kiprasmel/turbo-schedule/commit/71a55e9e2525bc8cb3abab86e2654b9eff43fc76))
* **client:** Use `?.` to access potentially undefined property ([91210d3](https://github.com/kiprasmel/turbo-schedule/commit/91210d336f36872e68b6929de8a8653519f7a14a))



## [1.6.4](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.3...v1.6.4) (2019-11-14)



## [1.6.3](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.2...v1.6.3) (2019-11-13)


### Bug Fixes

* Rename `cabinet` to `room` ([0537fba](https://github.com/kiprasmel/turbo-schedule/commit/0537fba190343d79ea039fd29ff52025cd6eec94))



## [1.6.1](https://github.com/kiprasmel/turbo-schedule/compare/v1.6.0...v1.6.1) (2019-11-12)


### Bug Fixes

* Handle `studentSchedule` -> `lessons` implications ([3d9e337](https://github.com/kiprasmel/turbo-schedule/commit/3d9e337a0269d4e1618a5fa2c26f53028f5e0633))
* Move `Student` model from `scraper` to `common` ([cc42181](https://github.com/kiprasmel/turbo-schedule/commit/cc42181a561dc58e032b57b911332b8d2ce26351))
* **server:** Rename API field `studentSchedule` to `lessons` ([6bd9eda](https://github.com/kiprasmel/turbo-schedule/commit/6bd9eda1856cce1e3fd12e2172a94de25d4a5126))
* **server:** Rename API filed `studentsList` to `students` ([65f4d28](https://github.com/kiprasmel/turbo-schedule/commit/65f4d287ec49141fcd7b404db6f3ce542d484938))



# [1.6.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.5.0...v1.6.0) (2019-10-31)



# [1.5.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.4.0...v1.5.0) (2019-10-24)



# [1.1.0](https://github.com/kiprasmel/turbo-schedule/compare/v1.0.0...v1.1.0) (2019-10-23)


### Bug Fixes

* **client:** Get rid of input's value validation altogether ([75acdb1](https://github.com/kiprasmel/turbo-schedule/commit/75acdb1c20ab5fe6d5811f80e6b39043319b6ae4))
* **client:** Validate the whole value instead of only the first char ([0047722](https://github.com/kiprasmel/turbo-schedule/commit/0047722b6c466d118b40439c54651a5da734d6a4))


### Features

* **server:** Use `axios` instead of `fetch` & improve typescript ([ffa47b3](https://github.com/kiprasmel/turbo-schedule/commit/ffa47b3ee8cda3e41ad112ffc9a6771d5b794a13))



# [1.0.0](https://github.com/kiprasmel/turbo-schedule/compare/27cfb282b9bec218bd8392a86cec25d50bf8cf71...v1.0.0) (2019-10-22)


### Bug Fixes

* **client:** Handle errors & provide defautls @ `fetchStudentsList` ([ccc997f](https://github.com/kiprasmel/turbo-schedule/commit/ccc997f8f07d923a2bff1c05f6e6f641fb661797))
* **client:** Make `BackBtn` navigate to `"/"` ([9e66804](https://github.com/kiprasmel/turbo-schedule/commit/9e668045869b5affa7edacf7884d0747e1ddad28))
* **client:** Run tests in ci mode ([c44a4e0](https://github.com/kiprasmel/turbo-schedule/commit/c44a4e0bbfcd553c4e378f0304575b0040aba1fa))
* **client:** Set `outDir` to `build/` ([a5e6209](https://github.com/kiprasmel/turbo-schedule/commit/a5e6209828d36669b09779833edbf59add317399))
* **client:** Set ReactModal's app element to "body" ([6e953bd](https://github.com/kiprasmel/turbo-schedule/commit/6e953bd53cd2b1972e796f51eff93bcb52ddfc18))
* **client:** Update tsconfig & package.json ([27cfb28](https://github.com/kiprasmel/turbo-schedule/commit/27cfb282b9bec218bd8392a86cec25d50bf8cf71))
* **client:** Use `cross-env` for yarn script ([6aa20ae](https://github.com/kiprasmel/turbo-schedule/commit/6aa20aef67c9a60d7ecfd12657eb9d7f4b801404))


### Features

* Start versioning API endpoints (now @ `v1`) ([55b20db](https://github.com/kiprasmel/turbo-schedule/commit/55b20dbb7d10662e8c5fce1630f1e53f2ba58d2b))
