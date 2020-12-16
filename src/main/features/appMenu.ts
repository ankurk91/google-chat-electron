import {Menu, app, shell, clipboard, BrowserWindow, dialog} from 'electron';
import {checkForUpdates} from 'electron-update-notifier';
import path from 'path';
import electronStore from 'electron-store';
import {openNewGitHubIssue, debugInfo} from 'electron-util';
import log from 'electron-log';
import {autoLaunch} from './openAtLogin.js';
import aboutPanel from './aboutPanel.js';

let store: electronStore;

export default function (window: BrowserWindow) {
  const pkg = require(path.join(app.getAppPath(), 'package.json'));
  store = new electronStore();

  const relaunchApp = () => {
    app.relaunch();
    app.exit();
  }

  const resetAppAndRestart = async () => {
    log.log('clearing app data');
    store.clear();
    const {session} = window.webContents;
    await session.clearStorageData();
    await session.clearCache();
    log.log('cleared app data');
    relaunchApp();
  }

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
          click: relaunchApp
        },
        {
          label: 'Sign Out',
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
            app.exit();
          }
        }
      ]
    },
    {
      role: 'editMenu'
    },
    {
      label: 'View',
      submenu: [
        {
          role: 'reload'
        },
        {
          role: 'forceReload'
        },
        {
          label: 'Copy Current URL',
          click: () => {
            clipboard.writeText(window.webContents.getURL())
          }
        },
        {
          role: 'toggleDevTools',
          visible: !app.isPackaged || app.commandLine.hasSwitch('debug')
        },
        {
          type: 'separator'
        },
        {
          role: 'resetZoom'
        },
        {
          role: 'zoomIn'
        },
        {
          role: 'zoomOut'
        },
      ]
    },
    {
      label: 'History',
      submenu: [
        {
          label: 'Back',
          accelerator: 'Alt+Left',
          click: () => {
            window.webContents.goBack()
          }
        },
        {
          label: 'Forward',
          accelerator: 'Alt+Right',
          click: () => {
            window.webContents.goForward()
          }
        },
      ]
    },
    {
      label: 'Preferences',
      submenu: [
        {
          label: 'Auto check for Updates',
          type: 'checkbox',
          checked: <boolean>store.get('app.autoCheckForUpdates', true),
          click: (menuItem) => {
            store.set('app.autoCheckForUpdates', menuItem.checked)
          }
        },
        {
          label: 'Auto launch on Login',
          type: 'checkbox',
          checked: <boolean>store.get('app.autoLaunchAtLogin', true),
          click: async (menuItem) => {

            if (menuItem.checked) {
              await autoLaunch().enable()
            } else {
              await autoLaunch().disable()
            }

            store.set('app.autoLaunchAtLogin', menuItem.checked)
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Visit Website',
          click: () => {
            setImmediate(() => {
              shell.openExternal(pkg.homepage)
            })
          }
        },
        {
          label: 'Check For Updates',
          click: () => {
            checkForUpdates({
              silent: false
            });
          }
        },
        {
          label: 'Troubleshooting',
          submenu: [
            {
              label: 'Report issue',
              click: () => {
                openNewGitHubIssue({
                  repoUrl: pkg.repository,
                  body: `### Platform\n\n${debugInfo()}`
                });
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Show Logs in File Manager',
              click: () => {
                shell.showItemInFolder(path.join(app.getPath('userData'), 'logs'))
              }
            },
            {
              label: 'Reset App and Relaunch',
              click: () => {
                dialog.showMessageBox(window, {
                  type: 'warning',
                  title: 'Confirm',
                  message: 'Reset app data?',
                  detail: `You will be logged out from application.\nAll settings will be reset to default.\nPress 'Yes' to proceed.`,
                  buttons: ['Yes', 'No'],
                  cancelId: 1,
                  defaultId: 1,
                })
                  .then(({response}) => {
                    if (response === 0) {
                      resetAppAndRestart()
                    }
                  })
              }
            },
          ]
        },
        {
          label: 'About',
          click: () => {
            aboutPanel(window)
          }
        },
        {
          type: 'separator'
        },
        {
          label: `Version ${app.getVersion()}`,
          enabled: false
        },
      ]
    }
  ]);

  Menu.setApplicationMenu(menuItems)
}
