/**  @type {import('eslint').Linter.Config} */

module.exports = {
	env: {
		browser: true, // Enable browser global variables
		node: true, // Enable Node.js global variables
		es2021: true // Enable ECMAScript 2021 features
	},
	extends: [
		'airbnb-base', // Extend Airbnb's base JavaScript style guide
		'plugin:node/recommended', // Use Node.js recommended rules
		'plugin:eslint-comments/recommended', // Use recommended rules for eslint-comments plugin
		'plugin:promise/recommended', // Use recommended rules for promise plugin
		'plugin:prettier/recommended' // Integrate Prettier with ESLint
	],
	plugins: ['simple-import-sort', 'prettier'], // Use simple-import-sort and Prettier plugins
	ignorePatterns: ['dist'], // Ignore the dist directory
	parserOptions: {
		ecmaVersion: 'latest', // Use the latest ECMAScript version
		sourceType: 'module' // Enable ECMAScript modules
	},
	rules: {
		'max-len': 'off', // Turn off max length rule
		'consistent-return': 'off', // Turn off consistent return rule
		'no-shadow': 'off', // Turn off no-shadow rule
		'no-param-reassign': 'warn', // Warn when reassigning function parameters
		'no-console': [
			'warn',
			{
				allow: ['info', 'error']
			}
		], // Warn on console usage except for info and error
		'sort-imports': 'off', // Turn off sort-imports rule
		'import/order': 'off', // Turn off import/order rule
		'import/extensions': 'off', // Turn off import/extensions rule
		'import/prefer-default-export': 'off', // Turn off import/prefer-default-export rule
		'import/no-extraneous-dependencies': 'off', // Turn off import/no-extraneous-dependencies rule
		'import/first': 'error', // Error on import statements not being at the top of the module
		'import/no-duplicates': 'error', // Error on duplicate imports
		'simple-import-sort/exports': 'error', // Error on unsorted export statements
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					// External packages:
					['^react', '^@?\\w'], // Group react and other external packages
					// Alias imports:
					['^@(([\\/.]?\\w)|src|assets|test-utils)'], // Group alias imports
					// Side effect imports:
					['^\\u0000'], // Group side effect imports
					// Parent imports:
					['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Group parent imports
					// Other relative imports:
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Group other relative imports
					// Style imports:
					['^.+\\.s?css$'] // Group style imports
				]
			}
		],
		'require-await': 'error', // Error on async functions without await
		'node/no-unpublished-require': 'off', // Turn off node/no-unpublished-require rule
		'node/no-missing-require': 'off' // Turn off node/no-missing-require rule
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'], // Apply these settings to TypeScript files
			parser: '@typescript-eslint/parser', // Use @typescript-eslint/parser for TypeScript files
			parserOptions: {
				project: './tsconfig.json' // Specify the path to the TypeScript config file
			},
			extends: [
				'airbnb-typescript/base', // Extend Airbnb's base TypeScript style guide
				'plugin:@typescript-eslint/recommended', // Use recommended rules for TypeScript
				'plugin:@typescript-eslint/recommended-requiring-type-checking', // Use recommended rules for TypeScript requiring type checking
				'plugin:prettier/recommended' // Integrate Prettier with ESLint for TypeScript
			],
			settings: {
				'import/parsers': {
					'@typescript-eslint/parser': ['.ts', '.tsx'] // Use @typescript-eslint/parser for import parsing
				},
				'import/resolver': {
					typescript: {
						project: './tsconfig.json' // Specify the path to the TypeScript config file for import resolver
					}
				}
			},
			rules: {
				'import/order': 'off', // Turn off import/order rule
				'import/extensions': 'off', // Turn off import/extensions rule
				'import/prefer-default-export': 'off', // Turn off import/prefer-default-export rule
				'import/no-extraneous-dependencies': 'off', // Turn off import/no-extraneous-dependencies rule
				'@typescript-eslint/no-explicit-any': 'off', // Turn off no-explicit-any rule for TypeScript
				'@typescript-eslint/no-unsafe-return': 'off', // Turn off no-unsafe-return rule for TypeScript
				'@typescript-eslint/ban-ts-comment': 'off', // Turn off ban-ts-comment rule for TypeScript
				'@typescript-eslint/no-shadow': 'off', // Turn off no-shadow rule for TypeScript
				'@typescript-eslint/restrict-template-expressions': [
					'warn',
					{
						allowBoolean: true,
						allowNullish: true
					} // Warn on restrict-template-expressions allowing booleans and nullish
				],
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						prefer: 'type-imports',
						disallowTypeAnnotations: false
					} // Enforce consistent type imports
				],
				'require-await': 'off', // Turn off require-await rule for JavaScript
				'@typescript-eslint/require-await': 'error' // Enforce require-await rule for TypeScript
			}
		}
	]
};
