import path from 'path';
import {BrowserWindow, app, Tray, Menu, nativeImage} from "electron";

export default function (window: BrowserWindow) {
  const trayIcon = new Tray(nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/offline/256.png')));

  const handleIconClick = () => {
    if (window.isVisible() && window.isFocused()) {
      window.minimize()
    } else {
      window.show()
    }
  }

  trayIcon.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show/Hide',
      click: handleIconClick
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

  trayIcon.on('click', handleIconClick);

  return trayIcon;
}
