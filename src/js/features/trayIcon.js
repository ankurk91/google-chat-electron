const path = require('path');
const electron = require('electron');

module.exports = (app, window) => {
  const trayIcon = new electron.Tray(path.join(app.getAppPath(), 'resources/icons/normal/48.png'));

  trayIcon.setContextMenu(electron.Menu.buildFromTemplate([
    {
      label: 'Show/Hide',
      click: () => {
        if (window.isVisible()) {
          window.hide()
        } else {
          window.show()
        }
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
  ]));

  trayIcon.setToolTip(app.getName());

  return trayIcon;
}
