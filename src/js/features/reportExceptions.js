const unhandled = require('electron-unhandled');
const {openNewGitHubIssue, debugInfo} = require('electron-util');
const path = require('path');
const {app} = require('electron');

module.exports = () => {
  const packageJson = require(path.join(app.getAppPath(), 'package.json'));

  return unhandled({
    reportButton: error => {
      openNewGitHubIssue({
        repoUrl: packageJson.repository,
        body: `\`\`\`\n${error.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`
      });
    }
  });
}
