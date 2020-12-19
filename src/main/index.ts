import {app} from 'electron';

import reportExceptions from './features/reportExceptions.js';
import windowWrapper from './windowWrapper.js';
import {enforceSingleInstance, restoreFirstInstance} from './features/singleInstance.js';

import enableContextMenu from './features/contextMenu.js';
import runAtLogin from './features/openAtLogin.js';
import updateNotifier from './features/updateNotification.js';
import setupTrayIcon from './features/trayIcon.js';
import keepWindowState from './features/windowState.js';
import externalLinks from './features/externalLinks.js';
import badgeIcons from './features/badgeIcon.js';
import closeToTray from './features/closeToTray.js';
import setAppMenu from './features/appMenu.js';
import overrideUserAgent from "./features/userAgent";
import {checkForInternet} from "./features/inOnline";

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
