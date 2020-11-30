const unhandled = require('electron-unhandled');
const {openNewGitHubIssue, debugInfo} = require('electron-util');
const path = require('path');

module.exports = (app) => {
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
