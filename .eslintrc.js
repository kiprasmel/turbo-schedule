module.exports = {
	extends: [
		"eslint-config-sarpik" /** https://github.com/kiprasmel/eslint-config-sarpik */
	],
	rules: {
		"prefer-destructuring": 0,
		"no-plusplus": 0,
		"@typescript-eslint/camelcase": 0,
		"@typescript-eslint/no-use-before-define": 0,
		"no-continue": 0,
		"no-void": 0,
	}
}
