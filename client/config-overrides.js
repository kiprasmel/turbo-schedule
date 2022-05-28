module.exports = function override(config, _env) {
	/**
	 * https://stackoverflow.com/a/65857316/9285308
	 *
	 * needed because of
	 * https://github.com/kiprasmel/turbo-schedule/pull/126#pullrequestreview-988531519
	 */
	config.module.exprContextCritical = false;

	return config;
};
