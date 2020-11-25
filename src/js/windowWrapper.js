'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;

// Garbage collection hack
let trayIcon = undefined;
let window;

module.exports = (url) => {
  window = new electron.BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../../resources/icons/256.png')
  });

  window.loadURL(url);

  trayIcon = new electron.Tray(path.join(__dirname, '../../resources/icons/48.png'));
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => {
        window.show()
      }
    },
    {
      label: 'Hide',
      click: () => {
        window.minimize()
      }
    },
    {
      label: 'About',
      click: () => {
        app.showAboutPanel()
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true
        app.quit()
      }
    }
  ]);
  trayIcon.setContextMenu(contextMenu);

  trayIcon.on('click', (e) => {
    if (window.isMinimized()) {
      window.show();
    } else {
      window.focus();
    }
  });

  // Open EXTERNAL links in the OS default browser instead
  window.webContents.on('will-navigate', handleRedirect);
  window.webContents.on('new-window', handleRedirect);

  return window;
};

const handleRedirect = (event, url) => {
  const whiteListDomains = [
    extractHostname(window.webContents.getURL()),
    'accounts.google.com',
    'accounts.youtube.com',
    'support.google.com',
    'chat.google.com'
  ];

  if (!whiteListDomains.includes(extractHostname(url))) {
    electron.shell.openExternal(url);
    event.preventDefault();
  }
};

function extractHostname(url) {
  return (new URL(url)).hostname;
}
