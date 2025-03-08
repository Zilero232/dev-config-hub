import antfu from '@antfu/eslint-config';
import pluginNext from '@next/eslint-plugin-next';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';

import { transformRules } from './utils/transformRules.js';

/** @type {import('@zilero/eslint').Eslint} */
export const eslint = ({ jsxA11y = false, next = false, sort = false, ...options }, ...configs) => {
	const stylistic = options?.stylistic ?? false;

	if (next) {
		configs.unshift({
			name: 'eslint/next',
			plugins: {
				'eslint-next': pluginNext,
			},
			rules: {
				...transformRules(pluginNext.configs.recommended.rules, '@next/next', 'eslint-next'),
			},
		});
	}

	if (jsxA11y) {
		configs.unshift({
			name: 'eslint/jsx-a11y',
			plugins: {
				'eslint-jsx-a11y': pluginJsxA11y,
			},
			rules: {
				...transformRules(pluginJsxA11y.flatConfigs.recommended.rules, 'jsx-a11y', 'eslint-jsx-a11y'),
			},
		});
	}

	if (options.react) {
		configs.unshift({
			name: 'eslint/react',
			plugins: {
				'eslint-react': pluginReact,
			},
			rules: {
				...transformRules(pluginReact.configs.recommended.rules, 'react', 'eslint-react'),

				/**
				 * Enforce arrow functions for React components
				 * @example
				 * // ✓ Good
				 * const Component = () => { return <div />; }
				 * // ✗ Bad
				 * function Component() { return <div />; }
				 */
				'eslint-react/function-component-definition': [
					'error',
					{
						namedComponents: ['arrow-function'], // For named components
						unnamedComponents: 'arrow-function', // For anonymous components
					},
				],

				/**
				 * Disable PropTypes validation
				 * Use TypeScript types instead of runtime checks
				 */
				'eslint-react/prop-types': 'off',

				/**
				 * Disable React import requirement
				 * Not needed in modern React with new JSX transform
				 * @example
				 * // ✓ Good
				 * const App = () => <div />
				 * // Old way (no longer needed)
				 * import React from 'react'
				 */
				'eslint-react/react-in-jsx-scope': 'off',

				/**
				 * Enforce destructuring for props and state
				 * @example
				 * // ✓ Good
				 * const { name, age } = props;
				 * // ✗ Bad
				 * const name = props.name;
				 */
				'eslint-react/destructuring-assignment': ['error', 'always'],

				/**
				 * Enforce consistent naming for hooks
				 * @example
				 * // ✓ Good
				 * const useCustomHook = () => {};
				 * // ✗ Bad
				 * const customHook = () => {};
				 */
				'eslint-react/hook-naming-convention': [
					'error',
					{
						prefix: 'use',
					},
				],

				/**
				 * Enforce consistent naming for boolean props
				 * @example
				 * // ✓ Good
				 * <Component isVisible={true} hasData={false} />
				 * // ✗ Bad
				 * <Component visible={true} data={false} />
				 */
				'eslint-react/boolean-prop-naming': ['error', { prefix: 'is|has|should|can|will|did' }],
			},

			// React-specific settings
			settings: {
				react: {
					version: 'detect', // Automatically detect React version
				},
			},
		});
	}

	if (stylistic) {
		configs.unshift({
			name: 'eslint/formatter',
			rules: {
				/**
				 * Always require parentheses around arrow function arguments
				 * @example
				 * // ✓ Good
				 * (x) => x
				 * // ✗ Bad
				 * x => x
				 */
				'style/arrow-parens': ['error', 'always'],

				/**
				 * Brace style for blocks - disabled to avoid conflicts
				 * Let other rules handle this
				 */
				'style/brace-style': 'off',

				/**
				 * Disallow trailing commas
				 * @example
				 * // ✓ Good
				 * { a: 1, b: 2 }
				 * // ✗ Bad
				 * { a: 1, b: 2, }
				 */
				'style/comma-dangle': ['error', 'never'],

				/**
				 * Enforce 2 spaces indentation with 1 space for switch cases
				 * @example
				 * // ✓ Good
				 * function foo() {
				 *   if (bar) {
				 *     baz();
				 *   }
				 * }
				 */
				'style/indent': ['error', 2, { SwitchCase: 1 }],

				/**
				 * JSX newline formatting - disabled for better readability
				 */
				'style/jsx-curly-newline': 'off',

				/**
				 * Allow multiple JSX expressions per line
				 */
				'style/jsx-one-expression-per-line': 'off',

				/**
				 * Use single quotes in JSX
				 * @example
				 * // ✓ Good
				 * <div className='foo'>
				 * // ✗ Bad
				 * <div className="foo">
				 */
				'style/jsx-quotes': ['error', 'prefer-single'],

				/**
				 * Enforce Unix linebreaks (LF)
				 * Prevents issues with different operating systems
				 */
				'style/linebreak-style': ['error', 'unix'],

				/**
				 * Maximum line length of 150 characters
				 * Ignores comments, strings, and template literals
				 * @example
				 * // ✓ Good: Lines under 150 characters
				 * // ✗ Bad: Lines over 150 characters (with exceptions)
				 */
				'style/max-len': [
					'error',
					150,
					2,
					{
						ignoreComments: true, // Ignore comments when checking length
						ignoreStrings: true, // Ignore strings when checking length
						ignoreTemplateLiterals: true, // Ignore template literals when checking length
					},
				],

				/**
				 * TypeScript interface/type member delimiter style - disabled
				 */
				'style/member-delimiter-style': 'off',

				/**
				 * Allow flexible multiline ternary expressions
				 */
				'style/multiline-ternary': 'off',

				/**
				 * Disallow tabs in favor of spaces
				 */
				'style/no-tabs': 'error',

				/**
				 * Allow flexible operator linebreaks
				 */
				'style/operator-linebreak': 'off',

				/**
				 * Quotation marks for object properties - disabled
				 */
				'style/quote-props': 'off',

				/**
				 * Use single quotes for strings, allow template literals
				 * @example
				 * // ✓ Good
				 * const str = 'string'
				 * const template = `template`
				 * // ✗ Bad
				 * const str = "string"
				 */
				'style/quotes': ['error', 'single', { allowTemplateLiterals: true }],

				/**
				 * Require semicolons at the end of statements
				 * @example
				 * // ✓ Good
				 * const foo = 'bar';
				 * // ✗ Bad
				 * const foo = 'bar'
				 */
				'style/semi': ['error', 'always'],
			},
		});
	}

	if (sort) {
		configs.unshift({
			name: 'eslint/sort',
			rules: {
				/**
				 * Sort array includes calls alphabetically
				 * @example
				 * // ✓ Good
				 * ['a', 'b', 'c'].includes(x)
				 * // ✗ Bad
				 * ['c', 'a', 'b'].includes(x)
				 */
				'perfectionist/sort-array-includes': [
					'error',
					{
						order: 'asc', // Ascending order
						type: 'alphabetical', // Sort alphabetically
					},
				],

				/**
				 * Enforce consistent import ordering
				 * Groups:
				 * 1. Type imports
				 * 2. Built-in & external modules
				 * 3. Internal type imports
				 * 4. Internal modules
				 * 5. Parent/sibling type imports
				 * 6. Parent/sibling modules
				 * 7. Object imports
				 * 8. Style imports
				 * 9. Side effect styles
				 * 10. Unknown
				 */
				'perfectionist/sort-imports': [
					'error',
					{
						groups: [
							'type', // Type imports first
							['builtin', 'external'], // Node.js and external packages
							'internal-type', // Internal type imports
							['internal'], // Internal modules
							['parent-type', 'sibling-type', 'index-type'], // Relative type imports
							['parent', 'sibling', 'index'], // Relative module imports
							'object', // Object imports
							'style', // Style imports
							'side-effect-style', // Side effect styles
							'unknown', // Everything else
						],
						internalPattern: ['^~/.*', '^@/.*'], // Internal module patterns
						newlinesBetween: 'always', // Always add newlines between groups
						order: 'asc', // Ascending order
						type: 'natural', // Natural sort order
					},
				],

				/**
				 * Sort interface members
				 * @example
				 * // ✓ Good
				 * interface User {
				 *   age: number;
				 *   name: string;
				 *   sayHello(): void;
				 * }
				 */
				'perfectionist/sort-interfaces': [
					'error',
					{
						groups: ['unknown', 'method', 'multiline'], // Group by type
						order: 'asc', // Ascending order
						type: 'alphabetical', // Sort alphabetically
					},
				],

				/**
				 * Sort JSX props in consistent order
				 * @example
				 * // ✓ Good
				 * <Button
				 *   ref={ref}
				 *   disabled
				 *   label="Click me"
				 *   onClick={handleClick}
				 * />
				 */
				'perfectionist/sort-jsx-props': [
					'error',
					{
						customGroups: {
							callback: 'on*', // Event handlers
							reserved: ['key', 'ref'], // React special props
						},
						groups: [
							'shorthand', // Boolean props
							'reserved', // React special props
							'multiline', // Multiline props
							'unknown', // Other props
							'callback', // Event handlers
						],
						order: 'asc', // Ascending order
						type: 'alphabetical', // Sort alphabetically
					},
				],

				/**
				 * Sort union types consistently
				 * @example
				 * // ✓ Good
				 * type Status = 'error' | 'loading' | 'success';
				 * type Value = boolean | null | number | string;
				 */
				'perfectionist/sort-union-types': [
					'error',
					{
						groups: [
							'conditional', // Conditional types
							'function', // Function types
							'import', // Import types
							'intersection', // Intersection types
							'keyword', // TypeScript keywords
							'literal', // Literal types
							'named', // Named types
							'object', // Object types
							'operator', // Operator types
							'tuple', // Tuple types
							'union', // Union types
							'nullish', // null/undefined
						],
						order: 'asc', // Ascending order
						specialCharacters: 'keep', // Keep special characters
						type: 'alphabetical', // Sort alphabetically
					},
				],
			},
		});
	}

	return antfu(
		{ ...options, stylistic },
		{
			name: 'eslint/rewrite',
			rules: {
				/**
				 * Disable requirement for curly braces
				 * Allows single-line if statements without braces
				 * @example
				 * // Both are allowed:
				 * if (foo) bar();
				 * if (foo) { bar(); }
				 */
				'antfu/curly': 'off',

				/**
				 * Disable forced newline after if statement
				 * Allows more flexible formatting
				 * @example
				 * // Both are allowed:
				 * if (foo) bar();
				 * if (foo)
				 *   bar();
				 */
				'antfu/if-newline': 'off',

				/**
				 * Disable top-level function requirements
				 * Allows both named and anonymous functions at top level
				 * @example
				 * // Both are allowed:
				 * function foo() {}
				 * export default () => {}
				 */
				'antfu/top-level-function': 'off',

				/**
				 * Warn on console statements
				 * Helps identify debugging code that shouldn't be in production
				 * @example
				 * // ⚠️ Warns:
				 * console.log('debug');
				 */
				'no-console': 'warn',

				/**
				 * Disable exhaustive dependencies check for React hooks
				 * Allows manual control over hook dependencies
				 * @example
				 * // Allowed:
				 * useEffect(() => {}, [selectedDeps])
				 */
				'react-hooks/exhaustive-deps': 'off',

				/**
				 * Disable lowercase test title requirement
				 * Allows more flexible test naming
				 * @example
				 * // Both are allowed:
				 * test('my test')
				 * test('My Test')
				 */
				'test/prefer-lowercase-title': 'off',
			},
		},
		...configs,
	);
};
