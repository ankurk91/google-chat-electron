import {app, dialog, nativeImage, clipboard, BrowserWindow} from 'electron';
import path from 'path';
import os from 'os';

// The default Electron about window does not load app icon from asar
// So lets create a custom dialog instead
export default (window: BrowserWindow) => {
  const packageJson = require(path.join(app.getAppPath(), 'package.json'));
  const detail = getDetails();

  detail.unshift(`Developed by - ${packageJson.author}\n`)
  detail.push(`\nLicensed under - ${packageJson.license}`)

  return dialog.showMessageBox(window, {
    type: 'info',
    title: 'About',
    message: 'Google Chat',
    detail: packageJson.description + "\n\n" + detail.join('\n'),
    buttons: ['Copy', 'Ok'],
    cancelId: 1,
    defaultId: 1,
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/64.png'))
  })
    .then(({response}) => {
      if (response === 0) {
        clipboard.writeText(getDetails().join('\n'))
      }
    })
}

const getDetails = () => {
  const isSnap = require('electron-is-snap').isSnap

  return [
    'App Version: ' + app.getVersion(),
    'Installed via : ' + (isSnap ? 'snap' : 'deb'),
    'Electron version: ' + process.versions.electron,
    'Platform: ' + [os.type(), os.release(), os.arch()].join(', '),
    'OS: ' + os.version(),
    'Locale: ' + app.getLocale()
  ]
}
