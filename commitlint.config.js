/** @type {import('@commitlint/types').UserConfig} */

const commitTypes = {
  'feat': ':sparkles:',
  'fix': ':bug:',
  'docs': ':pencil:',
  'style': ':art:',
  'refactor': ':recycle:',
  'test': ':white_check_mark:',
  'build': ':hammer:',
  'perf': ':zap:',
  'chore': ':wrench:'
};

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [2, 'always', Object.keys(commitTypes)]
  }
};
