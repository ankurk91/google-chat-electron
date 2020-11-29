'use strict';

const electron = require('electron');
const app = electron.app;
const windowWrapper = require('./windowWrapper.js');
const aboutPanel = require('./features/about.js');
const enforceSingleInstance = require('./features/singleInstance.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

enforceSingleInstance(app, mainWindow);
aboutPanel(app);

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
