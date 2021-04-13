# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.18.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.17.0...v2.18.0) (2021-04-13)

**Note:** Version bump only for package @turbo-schedule/database





# [2.16.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.15.3...v2.16.0) (2021-04-11)

**Note:** Version bump only for package @turbo-schedule/database





# [2.15.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.14.1...v2.15.0) (2021-04-11)


### Features

* **db:** create `copy-prod-data` script ([8e82e0a](https://github.com/kiprasmel/turbo-schedule/commit/8e82e0a66cb7e5e0d5c113077acca670e7af68f6))





## [2.14.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.14.0...v2.14.1) (2021-04-11)

**Note:** Version bump only for package @turbo-schedule/database





# [2.14.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.13.1...v2.14.0) (2021-04-11)

**Note:** Version bump only for package @turbo-schedule/database





## [2.13.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.13.0...v2.13.1) (2021-04-11)

**Note:** Version bump only for package @turbo-schedule/database





# [2.13.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.12.3...v2.13.0) (2021-03-18)


### Features

* **server:** allow specifying `max` count of participants for `/random` ([93ab2d2](https://github.com/kiprasmel/turbo-schedule/commit/93ab2d2ce60b3698a70c715cd8c4e20525dfb417))





## [2.12.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.12.0...v2.12.1) (2021-02-18)


### Bug Fixes

* force **exact** versions for all dependencies ([05ae6d8](https://github.com/kiprasmel/turbo-schedule/commit/05ae6d8b78a2897753f7e65fe34b6b2cf02e6b35))





# [2.12.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.3...v2.12.0) (2021-02-18)


### Bug Fixes

* bring back the sane typescript version ([2f250e4](https://github.com/kiprasmel/turbo-schedule/commit/2f250e43153c272ff5a21792f347e62957b18217))
* initialize db once starting server to make sure default data is created ([467744e](https://github.com/kiprasmel/turbo-schedule/commit/467744ed8141502ed19de96c0201cdc10957f26c))





## [2.11.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.11.1...v2.11.2) (2021-02-18)

**Note:** Version bump only for package @turbo-schedule/database





# [2.11.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.4...v2.11.0) (2021-02-18)


### Features

* **database:** create `create-fake-data` 🔥🔥🔥 ([21f48f7](https://github.com/kiprasmel/turbo-schedule/commit/21f48f775d612169fbd3c36d79596d7039a133b8))
* **database:** create fake data if none available yet (ideal for new clones) 🚀 ([3bf22b5](https://github.com/kiprasmel/turbo-schedule/commit/3bf22b5cdeba7fbf6a6a5ba36f2d06ed7cb9fd09))



## 2.10.3 (2021-02-17)





## [2.10.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.10.2...v2.10.3) (2021-02-17)


### Bug Fixes

* **scraper:** do not use the pipeline operator & switch to official typescript ([096d748](https://github.com/kiprasmel/turbo-schedule/commit/096d748ce6ba19047e74ed7d67fdd59bbdb2a41b))





## [2.8.4](https://github.com/kiprasmel/turbo-schedule/compare/v2.8.3...v2.8.4) (2020-08-18)

**Note:** Version bump only for package @turbo-schedule/database





# [2.8.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.7.3...v2.8.0) (2020-07-14)

**Note:** Version bump only for package @turbo-schedule/database





## [2.7.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.7.2...v2.7.3) (2020-05-27)


### Bug Fixes

* Update typescript version ([d7e114c](https://github.com/kiprasmel/turbo-schedule/commit/d7e114c1f77e9c2fcd737b2e65533a69cd8c8900))





# [2.7.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.6.3...v2.7.0) (2020-05-06)


### Features

* Add temo typescript version to enable pipeline operators 🎷 ([795b970](https://github.com/kiprasmel/turbo-schedule/commit/795b970e1733f984e42d64050dfdb7fa018e143b))





# [2.6.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.5.1...v2.6.0) (2020-04-29)


### Features

* **db:** Extend schema with `participants`! ([97032ab](https://github.com/kiprasmel/turbo-schedule/commit/97032ab8b41cf89cf3fd3fa88595d2b8e56ff1cf))



# 2.5.0 (2020-04-26)





## [2.5.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.5.0...v2.5.1) (2020-04-28)


### Bug Fixes

* **db:** Replace invalid filename chars! ([f1ca949](https://github.com/kiprasmel/turbo-schedule/commit/f1ca9490a24602a2f17e3e807776ae69f21eed62))





# [2.5.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.4.0...v2.5.0) (2020-04-26)


### Features

* **db:** Extend schema with `teachers` & `rooms`! ([0e3d0d9](https://github.com/kiprasmel/turbo-schedule/commit/0e3d0d917eeaaa751cc564ea4e73b45a2c7c2f37))





# [2.4.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.3.2...v2.4.0) (2020-04-21)


### Bug Fixes

* **db:** In `initDb`, ensure not only the directory, but the file too! 🚀 ([74b5ec7](https://github.com/kiprasmel/turbo-schedule/commit/74b5ec7ebfd724b2a71a232921bf2f013c7f123f))


### Features

* **db:** Create a 100x simplier successor of `setNewDbState` - `setDbState` 🔥🔥🔥 ([9a4f869](https://github.com/kiprasmel/turbo-schedule/commit/9a4f8692413e84b0ddf207a524f614cbbaddea8a))





## [2.3.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.3.1...v2.3.2) (2020-04-18)


### Bug Fixes

* Auto re-generate the `CHANGELOG`s 🔥 ([772f0c4](https://github.com/kiprasmel/turbo-schedule/commit/772f0c44481d67acd55250478e4beafe1a8ca801))
* Change the repository links in package.json lol ([537e765](https://github.com/kiprasmel/turbo-schedule/commit/537e765de4facc6e96c9975de218618cb05f3391))







# [2.3.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.2.2...v2.3.0) (2020-04-18)


### Features

* **db:** Extend the schema with `scrapeInfo` ([cbc0253](https://github.com/kiprasmel/turbo-schedule/commit/cbc0253b8307f1852fc272209d24ed3eb5f203a8))



## [2.2.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.5...v2.2.1) (2020-04-16)


### Features

* **db:** Extend the schema with `classes` ([5c5af7d](https://github.com/kiprasmel/turbo-schedule/commit/5c5af7dd221bab6b166daeae62d8c1f6f79ced86))



## [2.1.5](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.4...v2.1.5) (2020-04-12)


### Bug Fixes

* Add `repository` field to all `package.json`s ([7803f4d](https://github.com/kiprasmel/turbo-schedule/commit/7803f4d58156524ff2239cae146c7e1c8fdbfcf0))



## [2.1.4](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.3...v2.1.4) (2020-04-12)


### Bug Fixes

* **database:** Get rid of the "smart" dynamic paths based on production ([179f01e](https://github.com/kiprasmel/turbo-schedule/commit/179f01e34678b4ed9cc4b4a56cc11fc0a18374f0))



## [2.1.3](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.2...v2.1.3) (2020-04-12)



## [2.1.2](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.1...v2.1.2) (2020-04-06)


### Bug Fixes

* **db:** Use correct path to `data` when in production ([f04f848](https://github.com/kiprasmel/turbo-schedule/commit/f04f848c27a4ac1271762ea0da9276895be3850f))



## [2.1.1](https://github.com/kiprasmel/turbo-schedule/compare/v2.1.0...v2.1.1) (2020-04-06)



# [2.1.0](https://github.com/kiprasmel/turbo-schedule/compare/v2.0.3...v2.1.0) (2020-04-06)


### Bug Fixes

* **db:** Remove `type: module` ([089ad27](https://github.com/kiprasmel/turbo-schedule/commit/089ad273672f69a8fc8ed5469f7fd71a76cd356b))
* **db:** Remove the `Change` import - too early:D ([efd03d7](https://github.com/kiprasmel/turbo-schedule/commit/efd03d7ecbabd4d079b728abafa68d9c375fcf73))
* **db:** Update the database logic to reflect patches ([435f389](https://github.com/kiprasmel/turbo-schedule/commit/435f389bd5179c7bfde32ac40bc723c761437297))


### Features

* **db:** Choose database file based on NODE_ENV ([8b5424f](https://github.com/kiprasmel/turbo-schedule/commit/8b5424fa14480293364fffd9c2444646eb6d839a))
* **db:** Create `fakeDb` util ([2dbe4e1](https://github.com/kiprasmel/turbo-schedule/commit/2dbe4e15dbce10e7c27277d412a55ab3b4292a5c))
* **db:** Create `injectDb` util ([678bf2b](https://github.com/kiprasmel/turbo-schedule/commit/678bf2b83991b13b77e8fb2dee10b551a53fac1b))
* **db:** Create `setNewDbState` (was it a mistake though?:/) ([f1239b1](https://github.com/kiprasmel/turbo-schedule/commit/f1239b1360970623d6d0028bf231d7a376907413))
* **db:** Export the `defaultDbState` ([46158f8](https://github.com/kiprasmel/turbo-schedule/commit/46158f827c8df27532bcb51d0c03909c60d9c5d3))
* **db:** Extract the name of `databaseFile` & export it ([b55c285](https://github.com/kiprasmel/turbo-schedule/commit/b55c285c896bc32568479ca3968b3a25aaf426d7))
* **db:** Install dependencies (debug, uuid, etc) ([09463df](https://github.com/kiprasmel/turbo-schedule/commit/09463dfe2ad22905b030ce117ecb5aa7acf59530))
* **db:** Instead of exporting the `db`, export it's `initDb` function ([bb55421](https://github.com/kiprasmel/turbo-schedule/commit/bb554213dc93854b4b9cb1d88e0dda51327b46f3))
* Create the `database` using `lowdb` ([f1d609b](https://github.com/kiprasmel/turbo-schedule/commit/f1d609bdaf43c4166f31e2eb73ce5b10a82f9a3c))
