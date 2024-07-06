/** @type {import('@commitlint/types').UserConfig} */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: ['conventional-changelog-atom'],
  formatter: ['@commitlint/format'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // :sparkles: Adding a new feature
        'fix', // :bug: Fixing a bug
        'docs', // :pencil: Updating documentation
        'style', // :art: Changes in styling
        'refactor', // :recycle: Code refactoring without functional changes
        'test', // :white_check_mark: Adding tests
        'build', // :hammer: Changes in the build system or external dependencies
        'perf', // :zap: Improving performance
        'chore', // :wrench: Other changes that don't modify src or test files
      ],
    ],
  },
};
