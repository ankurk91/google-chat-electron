const electronStore = require('electron-store');
const throttle = require('lodash/throttle');
let store = null;

module.exports = (window) => {
  store = new electronStore();

  if (store.has('window.bounds')) {
    window.setBounds(store.get('window.bounds'))
  }

  if (store.get('window.isMaximised', false)) {
    window.maximize()
  }

  const saveWindowPosition = () => {
    store.set('window', {
      bounds: window.getBounds(),
      isMaximized: window.isMaximized()
    })
  }

  window.on('close', saveWindowPosition);
  window.on('resize', throttle(saveWindowPosition, 500));
  window.on('move', throttle(saveWindowPosition, 500));
}
