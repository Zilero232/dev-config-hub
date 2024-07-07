// scripts/emoji-commit.js
const fs = require('fs');

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

// Function for reading a commit message from a file
function readCommitMessage(commitMsgFile) {
  try {
    return fs.readFileSync(commitMsgFile, 'utf8').trim();
  } catch (error) {
    console.error(`Error reading commit message file: ${error.message}`);
    throw error;
  }
}

// Function for writing a new commit message to a file
function writeCommitMessage(commitMsgFile, newCommitMsg) {
  try {
    fs.writeFileSync(commitMsgFile, newCommitMsg, 'utf8');
  } catch (error) {
    console.error(`Error writing commit message file: ${error.message}`);
    throw error;
  }
}

// Function for processing the commit message
function processCommitMessage(commitMsgFile) {
  const commitMsg = readCommitMessage(commitMsgFile);
  const match = commitMsg.match(/^(\w+)(?=:)\s*/);

  if (match) {
    const type = match[1];
    const emoji = commitTypes[type];

    if (emoji) {
      // Forming a new commit message with the addition of an emoji before the rest of the message
      const newCommitMsg = `${type} ${emoji} ${commitMsg.replace(match[0], '').trim()}`;

      // Writing the new message back to the file
      writeCommitMessage(commitMsgFile, newCommitMsg);
    }
  } else {
    console.error('Commit type not found in commit message.');
  }
}

// Get the path to the commit message file from the command line arguments
const commitMsgFile = process.argv[2];
if (commitMsgFile) {
  processCommitMessage(commitMsgFile);
} else {
  console.error('Usage: node emoji-commit.js <commit-message-file>');
}
