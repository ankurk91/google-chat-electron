import {ipcMain, app, nativeImage, BrowserWindow, Tray} from 'electron';
import path from 'path';

type IconTypes = 'offline' | 'normal' | 'badge';

// Decide app icon based on favicon URL
const decideIcon = (href: string): IconTypes => {
  let type: IconTypes = 'offline';

  if (href.match(/favicon_chat_r2/) ||
    href.match(/favicon_chat_new_non_notif_r2/)) {
    type = 'normal';
  } else if (href.match(/favicon_chat_new_notif_r2/)) {
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
