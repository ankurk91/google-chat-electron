const {setUpdateNotification, checkForUpdates} = require('electron-update-notifier');
const electronStore = require('electron-store');

let interval = null;
let store = null;

module.exports = () => {
  clearInterval(interval);
  store = new electronStore();

  const shouldCheckForUpdates = () => {
    return store.get('app.autoCheckForUpdates', true);
  }

  setTimeout(() => {
    if (shouldCheckForUpdates()) {
      setUpdateNotification();
    }
  }, 5000)

  interval = setInterval(() => {
    if (shouldCheckForUpdates()) {
      checkForUpdates()
    }
  }, 1000 * 60 * 60 * 24 * 7);

  return interval
}
