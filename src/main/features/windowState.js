const electronStore = require('electron-store');
let store = null;

module.exports = (window) => {
  store = new electronStore();

  if (store.has('window.bounds')) {
    window.setBounds(store.get('window.bounds'))
  }

  if (store.get('window.isMaximised', false)) {
    window.maximize()
  }

  window.on('close', () => {
    store.set('window', {
      bounds: window.getBounds(),
      isMaximized: window.isMaximized()
    })
  });
}
