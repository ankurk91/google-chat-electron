const {app} = require('electron');

module.exports = (window) => {

  window.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      window.minimize();
    }
  });
}
