const reactConfig = require('./react.cjs');

/** @type {import('xo').Options & {overrides?: Array<{files: string} & import('xo').Options>}} */
module.exports = {
	...reactConfig,
	extends: [
		...reactConfig.extends,
		'plugin:@next/next/core-web-vitals',
	],
	ignores: [...reactConfig.ignores, 'next-env.d.ts'],
};
