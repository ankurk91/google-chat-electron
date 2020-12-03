'use strict';

const electron = require('electron');
const app = electron.app;
const reportExceptions = require('./features/reportExceptions.js');
const windowWrapper = require('./windowWrapper.js');
const enforceSingleInstance = require('./features/singleInstance.js');
const enableContextMenu = require('./features/contextMenu.js');
const openAtLogin = require('./features/openAtLogin.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Features
enforceSingleInstance(app);
reportExceptions(app);
enableContextMenu();

app.whenReady()
  .then(() => {
    mainWindow = windowWrapper('https://chat.google.com/');

    mainWindow.once('closed', () => {
      mainWindow = null;
    });

    openAtLogin(app, mainWindow);
  })
  .catch((error) => {
    console.error(error)
  });
