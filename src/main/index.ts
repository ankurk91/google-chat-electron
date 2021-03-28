import {app} from 'electron';

// Need to fix the paths before loading any other library
// https://github.com/electron/electron/issues/23854
import fixPathsForSnap from './features/fixPathsForSnap';

fixPathsForSnap();

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
import darkReader from './features/darkReader';
import handleNotification from './features/handleNotification';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let trayIcon = null;

// Features
app.commandLine.appendSwitch('disk-cache-size', String(300 * 1024 * 1024));
reportExceptions();

if (enforceSingleInstance()) {
  app.whenReady()
    .then(() => {
      overrideUserAgent();
      mainWindow = windowWrapper(environment.appUrl);
      setupOfflineHandlers(mainWindow);
      checkForInternet(mainWindow);

      trayIcon = setupTrayIcon(mainWindow);
      darkReader(mainWindow);
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
    })
}

app.on('window-all-closed', () => {
  app.exit();
})
