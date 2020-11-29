'use strict';

const electron = require('electron');
const app = electron.app;
const reportExceptions = require('./features/reportExceptions.js');
const windowWrapper = require('./windowWrapper.js');
const aboutPanel = require('./features/about.js');
const enforceSingleInstance = require('./features/singleInstance.js');
const enableContextMenu = require('./features/contextmenu.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Features
enforceSingleInstance(app, mainWindow);
reportExceptions(app);
aboutPanel(app);
enableContextMenu();

app.whenReady()
  .then(() => {
    mainWindow = windowWrapper('https://chat.google.com/');

    mainWindow.once('closed', () => {
      mainWindow = null;
    });
  })
  .catch((error) => {
    console.error(error)
  });
