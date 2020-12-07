const {ipcRenderer} = require('electron');
let favicon = null;
let observer = null;

const emitFaviconChanged = () => {
  ipcRenderer.send('favicon-changed', favicon?.href);
}

const watchFaviconChange = () => {
  observer = new MutationObserver(emitFaviconChanged);

  observer.observe(favicon, {
    attributes: true
  });
};

window.addEventListener('DOMContentLoaded', () => {
  favicon = document.querySelector('link#favicon256');
  emitFaviconChanged();

  if (favicon) {
    watchFaviconChange()
  }
});



