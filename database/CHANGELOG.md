# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.1.1 (2020-04-06)


### Bug Fixes

* Include `database` inside `Dockerfile` & `.dockerignore` ([6d4b0ad](https://github.com/sarpik/turbo-schedule/commit/6d4b0ad9828e753afd12b2fbe7d0d365a00f5da4))





# [2.1.0](https://github.com/sarpik/turbo-schedule/compare/v2.0.3...v2.1.0) (2020-04-06)


### Bug Fixes

* **db:** Remove `type: module` ([089ad27](https://github.com/sarpik/turbo-schedule/commit/089ad273672f69a8fc8ed5469f7fd71a76cd356b))
* **db:** Remove the `Change` import - too early:D ([efd03d7](https://github.com/sarpik/turbo-schedule/commit/efd03d7ecbabd4d079b728abafa68d9c375fcf73))
* **db:** Update the database logic to reflect patches ([435f389](https://github.com/sarpik/turbo-schedule/commit/435f389bd5179c7bfde32ac40bc723c761437297))


### Features

* **db:** Choose database file based on NODE_ENV ([8b5424f](https://github.com/sarpik/turbo-schedule/commit/8b5424fa14480293364fffd9c2444646eb6d839a))
* **db:** Create `fakeDb` util ([2dbe4e1](https://github.com/sarpik/turbo-schedule/commit/2dbe4e15dbce10e7c27277d412a55ab3b4292a5c))
* **db:** Create `injectDb` util ([678bf2b](https://github.com/sarpik/turbo-schedule/commit/678bf2b83991b13b77e8fb2dee10b551a53fac1b))
* **db:** Create `setNewDbState` (was it a mistake though?:/) ([f1239b1](https://github.com/sarpik/turbo-schedule/commit/f1239b1360970623d6d0028bf231d7a376907413))
* **db:** Export the `defaultDbState` ([46158f8](https://github.com/sarpik/turbo-schedule/commit/46158f827c8df27532bcb51d0c03909c60d9c5d3))
* **db:** Extract the name of `databaseFile` & export it ([b55c285](https://github.com/sarpik/turbo-schedule/commit/b55c285c896bc32568479ca3968b3a25aaf426d7))
* **db:** Install dependencies (debug, uuid, etc) ([09463df](https://github.com/sarpik/turbo-schedule/commit/09463dfe2ad22905b030ce117ecb5aa7acf59530))
* **db:** Instead of exporting the `db`, export it's `initDb` function ([bb55421](https://github.com/sarpik/turbo-schedule/commit/bb554213dc93854b4b9cb1d88e0dda51327b46f3))
* Create the `database` using `lowdb` ([f1d609b](https://github.com/sarpik/turbo-schedule/commit/f1d609bdaf43c4166f31e2eb73ce5b10a82f9a3c))
