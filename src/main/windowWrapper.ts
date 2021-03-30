import path from 'path';
import {app, BrowserWindow, nativeImage} from 'electron';
import store from './config';
import environment from "../environment";

export default (url: string): BrowserWindow => {
  const window = new BrowserWindow({
    webPreferences: {
      autoplayPolicy: 'user-gesture-required',
      contextIsolation: false,
      worldSafeExecuteJavaScript: false,
      enableRemoteModule: environment.isTesting,
      nodeIntegration: environment.isTesting,
      sandbox: false,
      disableBlinkFeatures: 'Auxclick',
      preload: path.join(app.getAppPath(), 'lib/preload/index.js'),
    },
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png')),
    show: false,
    minHeight: 570,
    minWidth: 480,
    center: true,
    title: 'Google Chat',
    backgroundColor: '#E8EAED',
    fullscreenable: false,
  });

  window.once('ready-to-show', () => {
    if (!store.get('app.startHidden')) {
      window.show();
    }
  });

  window.loadURL(url);

  return window;
};
