// scripts/emoji-commit.js
const fs = require('fs');
const path = require('path');

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

const commitMsgFile = process.env.HUSKY_GIT_PARAMS;
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();
const commitRegex = /^(\w+)(?=:)/;

const match = commitMsg.match(commitRegex);
if (match) {
  const type = match[1];
  const emoji = commitTypes[type];
  if (emoji) {
    const newCommitMsg = `${emoji} ${commitMsg}`;
    fs.writeFileSync(commitMsgFile, newCommitMsg, 'utf8');
  }
}
