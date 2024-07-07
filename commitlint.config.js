/** @type {import('@commitlint/types').UserConfig} */

const commitTypes = {
  'feat': ':sparkles:',           // Adding a new feature
  'fix': ':bug:',                 // Fixing a bug
  'docs': ':pencil:',             // Updating documentation
  'style': ':art:',               // Changes in styling (e.g., formatting, missing semi colons)
  'refactor': ':recycle:',        // Code refactoring without functional changes
  'test': ':white_check_mark:',   // Adding tests
  'build': ':hammer:',            // Changes in the build system or external dependencies
  'perf': ':zap:',                // Improving performance
  'chore': ':wrench:'             // Other changes that don't modify src or test files
};

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Adding a new feature
        'fix',      // Fixing a bug
        'docs',     // Updating documentation
        'style',    // Changes in styling (e.g., formatting, missing semi colons)
        'refactor', // Code refactoring without functional changes
        'test',     // Adding tests
        'build',    // Changes in the build system or external dependencies
        'perf',     // Improving performance
        'chore',    // Other changes that don't modify src or test files
      ]
    ]
  }
};
