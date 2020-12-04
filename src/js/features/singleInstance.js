module.exports.enforceSingleInstance = (app) => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    console.log('Quit from second instance');
    app.isQuiting = true
    app.quit();
  }
}

module.exports.restoreFirstInstance = (app, mainWindow) => {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.show()
    }
  })
}
