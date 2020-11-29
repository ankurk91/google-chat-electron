const path = require('path');

module.exports = (app) => {
  const packageJson = require(path.join(app.getAppPath(), 'package.json'));

  app.setAboutPanelOptions({
    applicationName: app.getName(),
    version: app.getVersion(),
    authors: [packageJson.author],
    website: packageJson.homepage,
    iconPath: path.join(app.getAppPath(), 'resources/icons/64.png')
  });
}
