const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const favicon = document.querySelector('link#favicon256');

  const sendFaviconChanged = () => {
    ipcRenderer.send('favicon-changed', favicon.href);
  }

  sendFaviconChanged()
  const observer = new MutationObserver(sendFaviconChanged);

  observer.observe(favicon, {
    attributes: true
  });
});


