const baseConfig = require('./index.cjs');

/** @type {import('xo').Options & {overrides?: Array<{files: string} & import('xo').Options>}} */
module.exports = {
	extends: [
		'xo-react',
		/** @see https://github.com/yannickcr/eslint-plugin-react#configuration */
		'plugin:react/jsx-runtime',
	],
	ignores: ['vite-env.d.ts'],
	rules: {
		...baseConfig.rules,
		'import/extensions': 'off',
		/** @see https://github.com/webpack/webpack/issues/13290 */
		'unicorn/prefer-node-protocol': 'off',
	},
	overrides: [
		...baseConfig.overrides,
		{
			files: '**/*.{ts,tsx}',
			rules: {
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						prefer: 'type-imports',
					},
				],
			},
		},
		{
			files: '**/*.tsx',
			rules: {
				/** @see https://github.com/typescript-eslint/typescript-eslint/issues/1184 */
				'@typescript-eslint/no-floating-promises': [
					'error',
					{
						ignoreVoid: true,
					},
				],
				'unicorn/filename-case': [
					'error',
					{
						cases: {
							camelCase: true,
							pascalCase: true,
						},
					},
				],
			},
		},
	],
};
