import {ipcMain, app, nativeImage, BrowserWindow, Tray} from 'electron';
import path from 'path';

// Decide app icon based on favicon URL
const decideIcon = (href: string) => {
  let type = 'offline';

  if (href.match(/chat-favicon-no-new/)) {
    type = 'normal';
  } else if (href.match(/chat-favicon-new-non-notif/) ||
    href.match(/chat-favicon-new-notif/)) {
    type = 'badge';
  }

  return type;
}

export default (window: BrowserWindow, trayIcon: Tray) => {

  ipcMain.on('favicon-changed', (evt, href) => {
    const type = decideIcon(String(href));

    const icon = nativeImage.createFromPath(path.join(app.getAppPath(), `resources/icons/${type}/256.png`))
    trayIcon.setImage(icon);
  });

  ipcMain.on('unreadCount', (event, count: number) => {
    app.setBadgeCount(Number(count))
  });
}
