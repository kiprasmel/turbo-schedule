# Contributing

PRs welcome!

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
