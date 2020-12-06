const {Menu, app, shell} = require('electron');
const {checkForUpdates} = require('electron-update-notifier');
const path = require('path');

module.exports = (window) => {
  const pkg = require(path.join(app.getAppPath(), 'package.json'));

  const menuItems = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Close To Tray',
          click: () => {
            window.hide()
          }
        },
        {
          label: 'Relaunch',
          click: () => {
            app.relaunch();
            app.exit();
          }
        },
        {
          label: 'Logout',
          click: () => {
            window.loadURL('https://www.google.com/accounts/Logout?continue=https://chat.google.com/')
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Ctrl+Q',
          click: () => {
            app.isQuiting = true
            app.quit();
          }
        }
      ]
    },
    {
      role: 'editMenu'
    },
    {
      role: 'viewMenu'
    },
    {
      label: 'Help',
      submenu: [
        {
          label: `v${app.getVersion()}`,
          enabled: false
        },
        {
          type: 'separator'
        },
        {
          label: 'Website',
          click: () => {
            setImmediate(() => {
              shell.openExternal(pkg.homepage)
            })
          }
        },
        {
          label: 'Check For Updates',
          click: () => {
            checkForUpdates();
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menuItems)
}