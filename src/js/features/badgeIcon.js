const {ipcMain} = require('electron');
const path = require('path');

module.exports = (app, window, trayIcon) => {

  ipcMain.on('favicon-changed', (evt, href) => {
    const type = decideIcon(href);

    trayIcon.setImage(path.join(app.getAppPath(), `resources/icons/${type}/48.png`));
    window.setIcon(path.join(app.getAppPath(), `resources/icons/${type}/256.png`));
  });

}

function decideIcon(href) {
  let type = 'normal';

  if (href.match(/chat-favicon-new-non-notif/) ||
    href.match(/chat-favicon-new-notif/)) {
    type = 'badge';
  }

  return type;
}
