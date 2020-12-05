'use strict';

const {app} = require('electron');
const reportExceptions = require('./features/reportExceptions.js');
const windowWrapper = require('./windowWrapper.js');
const {enforceSingleInstance, restoreFirstInstance} = require('./features/singleInstance.js');
const enableContextMenu = require('./features/contextMenu.js');
const runAtLogin = require('./features/openAtLogin.js');
const updateNotifier = require('./features/updateNotification.js');
const setupTrayIcon = require('./features/trayIcon.js');
const keepWindowState = require('./features/windowState.js');
const externalLinks = require('./features/externalLinks.js');
const badgeIcons = require('./features/badgeIcon.js');
const closeToTray = require('./features/closeToTray.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let trayIcon = null;

// Features
reportExceptions(app);
if (!enforceSingleInstance(app)) {
  return;
}

app.whenReady()
  .then(() => {
    mainWindow = windowWrapper('https://chat.google.com/');

    trayIcon = setupTrayIcon(app, mainWindow);
    restoreFirstInstance(app, mainWindow);
    keepWindowState(mainWindow);
    runAtLogin(app, mainWindow);
    updateNotifier();
    enableContextMenu();
    badgeIcons(app, mainWindow, trayIcon);
    closeToTray(app, mainWindow);
    externalLinks(mainWindow);
  })
  .catch((error) => {
    console.error(error)
  });
