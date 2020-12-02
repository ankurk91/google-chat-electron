const path = require('path');
const electron = require('electron');

module.exports = (app, window) => {
  const trayIcon = new electron.Tray(path.join(app.getAppPath(), 'resources/icons/normal/48.png'));
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => {
        window.show()
      }
    },
    {
      label: 'Hide',
      click: () => {
        window.hide()
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true
        app.quit()
      }
    }
  ]);
  trayIcon.setToolTip(app.getName())
  trayIcon.setContextMenu(contextMenu);

  return trayIcon;
}
