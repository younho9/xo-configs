/** @type {import('xo').Options & {overrides?: Array<{files: string} & import('xo').Options>}} */
module.exports = {
	rules: {
		/** @see https://github.com/sindresorhus/eslint-plugin-unicorn/issues/781 */
		'unicorn/no-array-callback-reference': 'off',
	},
	overrides: [
		{
			files: '**/*.ts',
			rules: {
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						prefer: 'type-imports',
					},
				],
			},
		},
	],
};

