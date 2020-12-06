const {setUpdateNotification, checkForUpdates} = require('electron-update-notifier');

let interval = null;

module.exports = () => {
  setTimeout(() => {
    setUpdateNotification();
  }, 5000)

  interval = setInterval(() => {
    checkForUpdates()
  }, 1000 * 60 * 60 * 24 * 7);

  return interval
}
