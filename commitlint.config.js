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

const commitRegex = /^(\w+)(?=:)/; // Регулярное выражение для извлечения типа коммита

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [2, 'always', Object.keys(commitTypes)],
    'format': (commit) => {
      const [, type] = commit.match(commitRegex) || []; // Деструктуризация и извлечение типа коммита
      const emoji = commitTypes[type];                  // Получение соответствующего смайлика

      return emoji ? `${emoji} ${commit}` : commit;     // Форматирование сообщения с смайликом или без него
    }
  }
};
