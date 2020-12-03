const {setUpdateNotification} = require('electron-update-notifier');

module.exports = () => {
  setTimeout(() => {
    setUpdateNotification();
  }, 5000)
}
