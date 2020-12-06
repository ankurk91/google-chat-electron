const contextMenu = require('electron-context-menu');

module.exports = () => {
  return contextMenu({
    showSaveImage: true,
    showCopyImageAddress: true,
  });
}
