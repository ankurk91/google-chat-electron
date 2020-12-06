const {ipcRenderer} = require('electron');

const watchFaviconChange = () => {
  const favicon = document.querySelector('link#favicon256');

  const sendFaviconChanged = () => {
    ipcRenderer.send('favicon-changed', favicon.href);
  }

  sendFaviconChanged()
  const observer = new MutationObserver(sendFaviconChanged);

  observer.observe(favicon, {
    attributes: true
  });
};

if (window.location.host.includes('chat.google.com')) {
  window.addEventListener('DOMContentLoaded', watchFaviconChange);
}



