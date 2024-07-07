/** @type {import('@commitlint/types').UserConfig} */

const { commitTypes } = require('./scripts/emoji-commit')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      2,
      'always',
      Object.keys(commitTypes)
    ]
  }
};
