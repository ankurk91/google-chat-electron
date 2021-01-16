import {ipcMain, app, nativeImage, BrowserWindow, Tray} from 'electron';
import path from 'path';

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

const getBadgeCount = (type: string): number => {
  if (type === 'badge') {
    return 1
  }

  return 0;
}

export default function (window: BrowserWindow, trayIcon: Tray) {

  ipcMain.on('favicon-changed', (evt, href) => {
    const type = decideIcon(String(href));

    const icon = nativeImage.createFromPath(path.join(app.getAppPath(), `resources/icons/${type}/256.png`))
    trayIcon.setImage(icon);
    window.setIcon(icon);

    // Unless we found a way to get real unread count,
    // lets show the badge as 1
    app.setBadgeCount(getBadgeCount(type))
  });
}
