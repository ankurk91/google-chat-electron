import {BrowserWindow, ipcMain, app, IpcMainEvent} from 'electron';
import path from 'path';
import {promises as fs} from 'fs';

const getJSContent = async () => {

  try {
    return await fs.readFile(path.join(app.getAppPath(), 'lib/content/overrideNotifications.js'), {
      encoding: 'utf-8'
    });

  } catch (error) {
    throw new Error(error)
  }
}

export default function (window: BrowserWindow) {

  window.webContents.on('dom-ready', async () => {
    const jsCode = await getJSContent();
    window.webContents.executeJavaScript(jsCode)
  });

  ipcMain.on('gchat:notificationClicked', (event: IpcMainEvent) => {

    if (!window.isVisible() || !window.isFocused()) {
      window.show()
    }

  });
}
