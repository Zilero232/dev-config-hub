/** @type {import('stylelint').Config} */

module.exports = {
	ignoreFiles: ['dist/**/*.css', 'coverage/**/*.css'], // Ignore these directories and their CSS files from being linted
	extends: ['stylelint-config-standard-scss', 'stylelint-config-idiomatic-order'], // Extend these standard configurations for SCSS and idiomatic CSS order
	plugins: 'stylelint-order', // Use the stylelint-order plugin for enforcing CSS property order
	rules: {
		'no-duplicate-selectors': true, // Disallow duplicate selectors within a stylesheet
		'color-hex-length': 'short', // Enforce short hex color codes where possible
		'color-named': 'never', // Disallow named colors (e.g., 'red', 'blue')
		'selector-no-qualifying-type': [
			// Disallow qualifying a selector by type, except for attributes and classes
			true,
			{
				ignore: ['attribute', 'class']
			}
		],
		'selector-attribute-quotes': 'always', // Always quote attribute values in selectors
		'declaration-no-important': true, // Disallow the use of !important in declarations
		'font-weight-notation': 'numeric', // Enforce numeric notation for font-weight (e.g., 400 instead of 'normal')
		'comment-whitespace-inside': 'always', // Require whitespace inside comments
		'comment-empty-line-before': 'always', // Require an empty line before comments
		'rule-empty-line-before': 'always', // Require an empty line before rules
		'selector-pseudo-element-colon-notation': 'single', // Enforce single colon notation for pseudo-elements
		'selector-class-pattern': [
			'^([a-z][a-z0-9]*)(_[a-z0-9]+)*$', // Enforce snake_case for class selectors
			{
				message: 'Expected class selector to be snake_case'
			}
		],
		'keyframes-name-pattern': [
			'^([a-z][a-z0-9]*)(_[a-z0-9]+)*$', // Enforce snake_case for keyframe names
			{
				message: 'Expected keyframe name to be snake_case'
			}
		],
		'scss/percent-placeholder-pattern': [
			'^([a-z][a-z0-9]*)(_[a-z0-9]+)*$', // Enforce snake_case for SCSS %-placeholders
			{
				message: 'Expected pattern for %-placeholders to be snake_case'
			}
		],
		'scss/at-mixin-pattern': [
			'^([a-z][a-z0-9]*)(_[a-z0-9]+)*$', // Enforce snake_case for SCSS mixins
			{
				message: 'Expected pattern for mixin to be snake_case'
			}
		]
	}
};
