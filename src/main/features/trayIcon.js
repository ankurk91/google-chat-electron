const path = require('path');
const {app, Tray, Menu} = require('electron');

module.exports = (window) => {
  const trayIcon = new Tray(path.join(app.getAppPath(), 'resources/icons/normal/256.png'));

  trayIcon.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show/Hide',
      click: () => {
        if (window.isVisible() && window.isFocused()) {
          window.minimize()
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
        app.exit()
      }
    }
  ]));

  trayIcon.setToolTip(app.getName());

  trayIcon.on('click', () => {
    window.show();
  });

  return trayIcon;
}
