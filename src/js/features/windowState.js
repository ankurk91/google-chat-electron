const electronStore = require('electron-store');
const store = new electronStore();

module.exports = (window) => {
  if (store.has('window.bounds')) {
    window.setBounds(store.get('window.bounds'))
  }

  if (store.get('window.isMaximised', false)) {
    window.maximize()
  }

  window.once('close', () => {
    store.set('window', {
      bounds: window.getBounds(),
      isMaximized: window.isMaximized()
    })
  });
}
