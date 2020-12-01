const {ipcRenderer} = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const favicon = document.querySelector('link#favicon256');
  ipcRenderer.send('favicon-changed', favicon.href);

  const observer = new MutationObserver(() => {
    ipcRenderer.send('favicon-changed', favicon.href)
  });

  observer.observe(favicon, {
    attributes: true
  });
});


