import {ipcMain, app, nativeImage, BrowserWindow, Tray} from 'electron';
import path from 'path';

const decideIcon = (href: string) => {
  let type = 'normal';

  if (href.match(/chat-favicon-new-non-notif/) ||
    href.match(/chat-favicon-new-notif/)) {
    type = 'badge';
  }

  return type;
}

export default function (window: BrowserWindow, trayIcon: Tray) {

  ipcMain.on('favicon-changed', (evt, href) => {
    const type = decideIcon(String(href));

    const icon = nativeImage.createFromPath(path.join(app.getAppPath(), `resources/icons/${type}/256.png`))
    trayIcon.setImage(icon);
    window.setIcon(icon);
  });
}
