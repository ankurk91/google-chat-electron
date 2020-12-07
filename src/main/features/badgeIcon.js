const {ipcMain, app} = require('electron');
const path = require('path');

const decideIcon = (href) => {
  let type = 'normal';

  if (href.match(/chat-favicon-new-non-notif/) ||
    href.match(/chat-favicon-new-notif/)) {
    type = 'badge';
  }

  return type;
}

module.exports = (window, trayIcon) => {

  ipcMain.on('favicon-changed', (evt, href) => {
    const type = decideIcon(String(href));

    trayIcon.setImage(path.join(app.getAppPath(), `resources/icons/${type}/256.png`));
    window.setIcon(path.join(app.getAppPath(), `resources/icons/${type}/256.png`));
  });
}
