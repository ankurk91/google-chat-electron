'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;

const electronStore = require('electron-store');
const store = new electronStore();

// Garbage collection hack
let trayIcon = undefined;
let window;

module.exports = (url) => {
  window = new electron.BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../../resources/icons/256.png'),
    show: false
  });

  if (store.has('window.bounds')) {
    window.setBounds(store.get('window.bounds'))
  }

  window.once('ready-to-show', () => {
    window.show()
  })

  if (store.get('window.isMaximised')) {
    window.maximize()
  }

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
  trayIcon.setToolTip('Google Chat')
  trayIcon.setContextMenu(contextMenu);

  // Open EXTERNAL links in the OS default browser instead
  window.webContents.on('will-navigate', handleRedirect);
  window.webContents.on('new-window', handleRedirect);

  window.on('close', () => {
    store.set('window', {
      bounds: window.getBounds(),
      isMaximized: window.isMaximized()
    })
  });

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
