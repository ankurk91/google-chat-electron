import path from 'path';
import {BrowserWindow, app, Tray, Menu, nativeImage} from 'electron';

export default (window: BrowserWindow) => {
  const trayIcon = new Tray(nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/offline/16.png')));

  const handleIconClick = () => {
    if (window.isVisible() && window.isFocused()) {
      window.minimize()
    } else {
      window.show()
    }
  }

  trayIcon.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Toggle',
      click: handleIconClick
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        // The running webpage can prevent the app from quiting via window.onbeforeunload handler
        // So lets use exit() instead of quit()
        app.exit()
      }
    }
  ]));

  trayIcon.setToolTip('Google Chat');

  return trayIcon;
}
