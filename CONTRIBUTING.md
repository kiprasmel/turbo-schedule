# Contributing

PRs welcome!

## Couple things to know:

* This is still a work-in-progress & we're continually working on improving the whole app!
* Projects are split up into the `scraper`, `server`, `client` and `common` folders

* <details> <summary>We're using <a href="https://yarnpkg.com/lang/en/docs/workspaces/">yarn workspaces</a> + a little of <a href="https://github.com/lerna/lerna">lerna</a> + TypeScript's <a href="https://www.typescriptlang.org/docs/handbook/project-references.html">Project References</a>.</summary>

  See also:
  * https://stackoverflow.com/questions/51631786/how-to-use-project-references-in-typescript-3-0
  * https://github.com/RyanCavanaugh/learn-a
</details>

* A mobile app for `turbo-schedule` is being worked on by [my friend @sballl](http://github.com/sballl) - don't make a duplicate, or at least ping us before doing stuff:D (more info soon, hopefully!)

## Known issues

| package | issue                                                                               | fix                                                         |
| ------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| client  | `Error: ENOENT: no such file or directory, scandir 'node_modules/node-sass/vendor'` | in the repository root, run `npm rebuild node-sass --force` |


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

* Copy it's `package.json`
* Copy it's `dist/`

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

6. glhf!

7. automate this?
