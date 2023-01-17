module.exports = {
	extends: [
		"eslint-config-sarpik" /** https://github.com/kiprasmel/eslint-config-sarpik */
	],
	rules: {
		"prefer-destructuring": 0,
		"@typescript-eslint/no-non-null-assertion": 0,
		"no-continue": 0,
		"@typescript-eslint/no-use-before-define": 0,
	}
};
