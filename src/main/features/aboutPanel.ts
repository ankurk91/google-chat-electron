import {app, dialog, nativeImage, clipboard, BrowserWindow} from 'electron';
import path from 'path';
import os from 'os';

export default function (window: BrowserWindow) {
  const detail = getDetails().join('\n')
  const packageJson = require(path.join(app.getAppPath(), 'package.json'));

  return dialog.showMessageBox(window, {
    type: 'info',
    title: 'About - ' + app.getName(),
    message: app.getName(),
    detail: packageJson.description + "\n\n" + detail,
    buttons: ['Copy', 'Ok'],
    cancelId: 1,
    defaultId: 1,
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/64.png'))
  })
    .then(({response}) => {
      if (response === 0) {
        clipboard.writeText(detail)
      }
    })
}

const getDetails = () => {
  return [
    'App Version: ' + app.getVersion(),
    'Electron version: ' + process.versions.electron,
    'Platform: ' + os.type() + ', ' + os.release() + ', ' + os.arch(),
    'OS: ' + os.version(),
    'Locale: ' + app.getLocale()
  ]
}
