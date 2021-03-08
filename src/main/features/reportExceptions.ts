import unhandled from 'electron-unhandled';
import log from 'electron-log';
import {openNewGitHubIssue, debugInfo} from 'electron-util';
import path from 'path';
import {app} from 'electron';

export default () => {
  const packageJson = require(path.join(app.getAppPath(), 'package.json'));

  unhandled({
    logger: log.error,
    reportButton: error => {
      openNewGitHubIssue({
        repoUrl: packageJson.repository,
        body: `\`\`\`\n${error.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`
      });
    }
  });
}
