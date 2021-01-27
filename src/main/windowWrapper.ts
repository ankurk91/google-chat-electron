import path from 'path';
import {app, BrowserWindow, nativeImage} from 'electron';
import {userAgentString} from './features/userAgent';

export default function (url: string) {
  const window = new BrowserWindow({
    webPreferences: {
      autoplayPolicy: 'user-gesture-required',
      contextIsolation: false,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: false,
      disableBlinkFeatures: 'Auxclick',
      preload: path.join(app.getAppPath(), 'lib/preload/index.js'),
    },
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png')),
    show: false,
    minHeight: 570,
    minWidth: 400,
    center: true,
    title: 'Google Chat',
    backgroundColor: '#E8EAED',
    fullscreenable: false,
  });

  window.once('ready-to-show', () => {
    window.show();
  });

  window.loadURL(url, {
    userAgent: userAgentString()
  });

  return window;
};
