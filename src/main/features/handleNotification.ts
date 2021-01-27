import {BrowserWindow, ipcMain, IpcMainEvent} from 'electron';

export default (window: BrowserWindow) => {

  ipcMain.on('notificationClicked', (event: IpcMainEvent) => {

    if (!window.isVisible() || !window.isFocused()) {
      window.show()
    }

  });
}
