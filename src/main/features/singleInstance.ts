import {app, BrowserWindow} from 'electron';

const enforceSingleInstance = (): boolean => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    console.info('Force exit from second instance');
    app.exit();
  }

  return gotTheLock;
}

const restoreFirstInstance = (window: BrowserWindow) => {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (window) {
      if (window.isMinimized()) {
        window.restore()
      }
      window.show()
    }
  })
}

export {restoreFirstInstance, enforceSingleInstance}
