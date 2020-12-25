import {app} from 'electron';

import reportExceptions from './features/reportExceptions';
import windowWrapper from './windowWrapper';
import {enforceSingleInstance, restoreFirstInstance} from './features/singleInstance';

import enableContextMenu from './features/contextMenu';
import runAtLogin from './features/openAtLogin';
import updateNotifier from './features/updateNotification';
import setupTrayIcon from './features/trayIcon';
import keepWindowState from './features/windowState';
import externalLinks from './features/externalLinks';
import badgeIcons from './features/badgeIcon';
import closeToTray from './features/closeToTray';
import setAppMenu from './features/appMenu';
import overrideUserAgent from './features/userAgent';
import {checkForInternet} from './features/inOnline';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let trayIcon = null;

// Features
reportExceptions();

if (enforceSingleInstance()) {
  app.whenReady()
    .then(() => {
      overrideUserAgent();
      mainWindow = windowWrapper('https://chat.google.com/');
      checkForInternet(mainWindow);

      trayIcon = setupTrayIcon(mainWindow);
      setAppMenu(mainWindow);
      restoreFirstInstance(mainWindow);
      keepWindowState(mainWindow);
      runAtLogin(mainWindow);
      updateNotifier();
      enableContextMenu();
      badgeIcons(mainWindow, trayIcon);
      closeToTray(mainWindow);
      externalLinks(mainWindow);
    })
}

app.on('window-all-closed', () => {
  app.exit();
})
