import isOnline from 'is-online';
import {BrowserWindow, ipcMain, Notification, app, nativeImage, IpcMainEvent} from 'electron';
import path from 'path';

const checkForInternet = async (window: BrowserWindow) => {
  const canChat = await isOnline({
    timeout: 3000
  });

  if (!canChat) {
    const offlinePagePath = path.join(app.getAppPath(), 'src/offline/index.html');
    await window.loadURL(`file://${offlinePagePath}`);
    showOfflineNotification();
  }
}

const showOfflineNotification = () => {
  const notification = new Notification({
    title: 'Google Chat',
    body: `You are offline.\nCheck your internet connection.`,
    silent: true,
    timeoutType: 'default',
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png'))
  });

  notification.show();
}

ipcMain.on('checkIfOnline', async (event: IpcMainEvent) => {
  const online = await isOnline({
    timeout: 5000
  });

  event.reply('onlineStatus', online);
});

export {checkForInternet}
