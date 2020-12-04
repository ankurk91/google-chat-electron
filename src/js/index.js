'use strict';

const electron = require('electron');
const app = electron.app;
const reportExceptions = require('./features/reportExceptions.js');
const windowWrapper = require('./windowWrapper.js');
const {enforceSingleInstance, restoreFirstInstance} = require('./features/singleInstance.js');
const enableContextMenu = require('./features/contextMenu.js');
const openAtLogin = require('./features/openAtLogin.js');
const updateNotification = require('./features/updateNotification.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Features
enforceSingleInstance(app);
reportExceptions(app);

app.whenReady()
  .then(() => {
    mainWindow = windowWrapper('https://chat.google.com/');

    mainWindow.once('closed', () => {
      mainWindow = null;
    });

    restoreFirstInstance(app, mainWindow)
    openAtLogin(app, mainWindow);
    updateNotification();
    enableContextMenu();
  })
  .catch((error) => {
    console.error(error)
  });
