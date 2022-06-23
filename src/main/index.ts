import {app, BrowserWindow} from 'electron';

import reportExceptions from './features/reportExceptions';
import windowWrapper from './windowWrapper';
import {enforceSingleInstance, restoreFirstInstance} from './features/singleInstance';
import environment from "../environment";
import enableContextMenu from './features/contextMenu';
import runAtLogin from './features/openAtLogin';
import updateNotifier from './features/appUpdates';
import setupTrayIcon from './features/trayIcon';
import keepWindowState from './features/windowState';
import externalLinks from './features/externalLinks';
import badgeIcons from './features/badgeIcon';
import closeToTray from './features/closeToTray';
import setAppMenu from './features/appMenu';
import overrideUserAgent from './features/userAgent';
import setupOfflineHandlers, {checkForInternet} from './features/inOnline';
import logFirstLaunch from './features/firstLaunch';
import handleNotification from './features/handleNotification';
import {enforceMacOSAppLocation} from "electron-util";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;
let trayIcon = null;

// Features
reportExceptions();

if (enforceSingleInstance()) {
  app.whenReady()
    .then(() => {
      overrideUserAgent();
      mainWindow = windowWrapper(environment.appUrl);
      setupOfflineHandlers(mainWindow);
      checkForInternet(mainWindow);

      trayIcon = setupTrayIcon(mainWindow);
      logFirstLaunch();
      setAppMenu(mainWindow);
      restoreFirstInstance(mainWindow);
      keepWindowState(mainWindow);
      runAtLogin(mainWindow);
      updateNotifier();
      enableContextMenu();
      badgeIcons(mainWindow, trayIcon);
      closeToTray(mainWindow);
      externalLinks(mainWindow);
      handleNotification(mainWindow);
      enforceMacOSAppLocation();
    })
}

app.setAppUserModelId('com.electron.google-chat');

app.on('window-all-closed', () => {
  app.exit();
});

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show();
  }
});
