const baseConfig = require('./index.cjs');

/** @type {import('xo').Options & {overrides?: Array<{files: string} & import('xo').Options>}} */
module.exports = {
	extends: ['xo-react', 'plugin:react/jsx-runtime'],
	ignores: ['vite-env.d.ts'],
	rules: {
		...baseConfig.rules,
		'import/extensions': 'off',
		/** @see https://github.com/webpack/webpack/issues/13290 */
		'unicorn/prefer-node-protocol': 'off',
	},
	overrides: [
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
				'@typescript-eslint/naming-convention': [
					'error',
					// The first three rules are customization of default eslint-config-xo-typescript.
					// Start of custom rules
					{
						// Allowing StrictPascalCase for React components.
						// see - https://github.com/xojs/eslint-config-xo-typescript/issues/48
						selector: ['variable', 'function', 'objectLiteralProperty', 'objectLiteralMethod'],
						types: ['function'],
						format: ['StrictPascalCase', 'strictCamelCase'],
					},
					{
						selector: 'variable',
						modifiers: ['const', 'global'],
						format: ['UPPER_CASE'],
					},
					{
						selector: 'variable',
						types: ['boolean'],
						modifiers: ['const', 'global'],
						format: ['UPPER_CASE'],
						prefix: ['IS_', 'HAS_', 'CAN_', 'SHOULD_', 'WILL_', 'DID_'],
					},
					// End of custom rules
					// see - https://github.com/xojs/eslint-config-xo-typescript/blob/main/index.js#L280
					{
						// Selector: ['variableLike', 'memberLike', 'property', 'method'],
						// Note: Leaving out `parameter` and `typeProperty` because of the mentioned known issues.
						// Note: We are intentionally leaving out `enumMember` as it's usually pascal-case or upper-snake-case.
						selector: [
							// 'variable',
							// 'function',
							'classProperty',
							// 'objectLiteralProperty',
							'parameterProperty',
							'classMethod',
							// 'objectLiteralMethod',
							'typeMethod',
							'accessor',
						],
						format: [
							'strictCamelCase',
						],
						// We allow double underscope because of GraphQL type names and some React names.
						leadingUnderscore: 'allowSingleOrDouble',
						trailingUnderscore: 'allow',
						// Ignore `{'Retry-After': retryAfter}` type properties.
						filter: {
							regex: '[- ]',
							match: false,
						},
					},
					{
						selector: 'typeLike',
						format: [
							'StrictPascalCase',
						],
					},
					{
						selector: 'variable',
						types: [
							'boolean',
						],
						format: [
							'StrictPascalCase',
						],
						prefix: [
							'is',
							'has',
							'can',
							'should',
							'will',
							'did',
						],
					},
					{
						// Interface name should not be prefixed with `I`.
						selector: 'interface',
						filter: /^(?!I)[A-Z]/.source,
						format: [
							'StrictPascalCase',
						],
					},
					{
						// Type parameter name should either be `T` or a descriptive name.
						selector: 'typeParameter',
						filter: /^T$|^[A-Z][a-zA-Z]+$/.source,
						format: [
							'StrictPascalCase',
						],
					},
					// Allow these in non-camel-case when quoted.
					{
						selector: [
							'classProperty',
							'objectLiteralProperty',
						],
						format: null,
						modifiers: [
							'requiresQuotes',
						],
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
