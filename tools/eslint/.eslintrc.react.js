/** @type {import('eslint').Linter.Config} */

module.exports = {
	env: {
		browser: true, // Enable browser global variables
		es2021: true, // Enable ECMAScript 2021 features
	},
	extends: [
		'airbnb', // Extend Airbnb's base JavaScript and React style guide
		'airbnb/hooks', // Extend Airbnb's hooks style guide
		'plugin:eslint-comments/recommended', // Use recommended rules for eslint-comments plugin
		'plugin:promise/recommended', // Use recommended rules for promise plugin
		'plugin:prettier/recommended', // Integrate Prettier with ESLint
	],
	plugins: ['simple-import-sort', 'prettier'], // Use simple-import-sort and Prettier plugins
	ignorePatterns: ['dist', 'coverage'], // Ignore dist and coverage directories
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		}, // Enable parsing of JSX
		ecmaVersion: 'latest', // Use the latest ECMAScript version
		sourceType: 'module', // Enable ECMAScript modules
	},
	rules: {
		'max-len': 'off', // Turn off max length rule
		'consistent-return': 'off', // Turn off consistent return rule
		'no-shadow': 'off', // Turn off no-shadow rule
		'no-param-reassign': 'warn', // Warn when reassigning function parameters
		'no-template-curly-in-string': 'off', // Turn off no-template-curly-in-string rule
		'no-console': [
			'warn',
			{
				allow: ['info', 'error'],
			},
		], // Warn on console usage except for info and error
		'react/prop-types': 'off', // Turn off prop-types rule for React
		'react/jsx-indent': 'off', // Turn off JSX indent rule
		'react/no-children-prop': 'off', // Turn off no-children-prop rule for React
		'react/react-in-jsx-scope': 'off', // Turn off react-in-jsx-scope rule (not needed for React 17+)
		'react/no-unused-prop-types': 'off', // Turn off no-unused-prop-types rule for React
		'react/require-default-props': 'off', // Turn off require-default-props rule for React
		'react/jsx-props-no-spreading': 'off', // Turn off jsx-props-no-spreading rule for React
		'react/button-has-type': 'warn', // Warn if button elements do not have a type attribute
		'react/no-array-index-key': 'warn', // Warn when using array index as key in React
		'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in React hooks
		'react/function-component-definition': [
			'error',
			{
				namedComponents: ['arrow-function'], // Enforce arrow functions for named components
				unnamedComponents: 'arrow-function', // Enforce arrow functions for unnamed components
			},
		],
		'react/jsx-no-useless-fragment': [
			'error',
			{
				allowExpressions: true,
			},
		], // Error on unnecessary fragments, allowing expressions
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
					['^@(([\\/.]?\\w)|src)'], // Group alias imports
					// Side effect imports:
					['^\\u0000'], // Group side effect imports
					// Parent imports:
					['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Group parent imports
					// Other relative imports:
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Group other relative imports
					// Style imports:
					['^.+\\.s?css$'], // Group style imports
				],
			},
		],
		'require-await': 'error', // Error on async functions without await
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'], // Apply these settings to TypeScript files
			parser: '@typescript-eslint/parser', // Use @typescript-eslint/parser for TypeScript files
			parserOptions: {
				project: './tsconfig.json', // Specify the path to the TypeScript config file
			},
			extends: [
				'airbnb-typescript', // Extend Airbnb's base TypeScript style guide
				'plugin:@typescript-eslint/recommended', // Use recommended rules for TypeScript
				'plugin:@typescript-eslint/recommended-requiring-type-checking', // Use recommended rules for TypeScript requiring type checking
				'plugin:prettier/recommended', // Integrate Prettier with ESLint for TypeScript
			],
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
						allowNullish: true,
					}, // Warn on restrict-template-expressions allowing booleans and nullish
				],
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						prefer: 'type-imports',
						disallowTypeAnnotations: false,
					}, // Enforce consistent type imports
				],
				'require-await': 'off', // Turn off require-await rule for JavaScript
				'@typescript-eslint/require-await': 'error', // Enforce require-await rule for TypeScript
			},
		},
	],
};
