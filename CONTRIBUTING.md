# Contributing

PRs welcome!

## Couple things to know:

* This is still a work-in-progress & we're continually working on improving the whole app!
* Projects are split up into the `scraper`, `server`, `client`, `common` and `database` folders

* The deployed version of the app might not be directly from the default `master` branch -- we sometimes deploy from a selected commit in a [pull request](https://github.com/kiprasmel/turbo-schedule/pulls).

* <details> <summary>We're using <a href="https://yarnpkg.com/lang/en/docs/workspaces/">yarn workspaces</a> + a little of <a href="https://github.com/lerna/lerna">lerna</a> + TypeScript's <a href="https://www.typescriptlang.org/docs/handbook/project-references.html">Project References</a>.</summary>

  See also:
  * https://stackoverflow.com/questions/51631786/how-to-use-project-references-in-typescript-3-0
  * https://github.com/RyanCavanaugh/learn-a
</details>

## Known issues

| package | issue                                                                                                                                                       | fix                                                                                                           | tracking                                              |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| client  | `Error: ENOENT: no such file or directory, scandir 'node_modules/node-sass/vendor'`                                                                         | in the repository root, run `npm rebuild node-sass --force`                                                   |
| *       | `TypeError [ERR_FEATURE_UNAVAILABLE_ON_PLATFORM]: The feature watch recursively is unavailable on the current platform, which is being used to run Node.js` | downgrade nodejs version to < 14 (I recommend using https://github.com/tj/n or https://github.com/nvm-sh/nvm) | https://github.com/kiprasmel/turbo-schedule/issues/78 |

## Environment variables

The following environment variables affect some parts of the functionality

| env variable (`process.env.`)       | description                                                                                                                                                                                                                   |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`                          | one of the following: `"development"`, `"production"`, or `"test"`. `"development"` is the default, `"production"` disables development-only features, and `"test"` is somewhere in the middle, used only when running tests. |
| `PORT`                              | The server port (check default @ [./server/src/server.ts](./server/src/server.ts)).                                                                                                                                           |
| `FORCE_ENABLE_SCRAPING`             | Enable scraping of the schedule data, even in development mode. By default, schedule data scraping is disabled in development mode and the default sample data is used. See also `NO_SCRAPE`.                                 |
| `NO_SCRAPE`                         | Disable scraping, even in production mode. Overrides `FORCE_ENABLE_SCRAPING` and `USE_FAKE_DATA_INSTEAD_OF_SCRAPING` in all modes.                                                                                            |
| `START_SCRAPER_NOW`                 | Start scrapping schedule data immediately instead of when it gets updated / periodically todo.                                                                                                                                |
| `FAST`                              | (only applicable if data is being scraped) scrape only a limited amount of users from the schedule instead of all of them. Useful for prototyping/debugging the scraper without overloading the upstream.                     |
| `USE_FAKE_DATA_INSTEAD_OF_SCRAPING` | Forget the scraper -- just use some fake data bro.                                                                                                                                                                            |

## Adding a new package folder (like `server` or `database`)

1. Create the folder
2. Add it's name into:

| file          | path                |
| ------------- | ------------------- |
| package.json  | workspaces.packages |
| lerna.json    | packages            |
| tsconfig.json | references.path     |

3. Inside the `.dockerignore`

* Whitelist it's `package.json`
* Whitelist it's `dist/`

4. Inside the `Dockerfile`

* Copy it's `package.json` (update both `from` & `to` paths!)
* Copy it's `dist/` (update both `from` & `to` paths!)

5. Create a sample `tsconfig.json`

```json
{
	"extends": "../tsconfig-base.json",
	"references": [
		{ "path": "../local-package-name-that-you-depend-on" } //
	],
	"compilerOptions": {
		"rootDir": "./src",
		"outDir": "dist"
	},
	"exclude": [
		"node_modules", //
		"dist"
	]
}
```

6. add package's name to `dependencies` @ packages you want to import it from.

7. glhf!

8. automate this?
