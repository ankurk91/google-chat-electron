import {ipcRenderer} from 'electron';

let favicon: HTMLLinkElement;
let observer: MutationObserver;

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
  favicon = <HTMLLinkElement>document.querySelector('link#favicon256');
  emitFaviconChanged();

  if (favicon) {
    watchFaviconChange()
  }
});

// Workaround:
// There might be a case when multiple windows are opened
// So lets update the icon as soon as user focus on the main window
window.addEventListener('focus', () => {
  emitFaviconChanged();
});
