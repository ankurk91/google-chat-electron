const {activeWindow} = require('electron-util');

module.exports = (app) => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    console.log('Quit from second instance')
    app.quit();
    return;
  }

  app.on('second-instance', () => {
    const mainWindow = activeWindow();

    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.show()
    }
  })
}
