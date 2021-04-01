import {ipcRenderer} from 'electron';

const emitFaviconChanged = (favicon: HTMLLinkElement) => {
  ipcRenderer.send('favicon-changed', favicon?.href);
}

// Google chat initially loads favicon with rel="icon",
// but replace it with rel="shortcut icon" when a new message appears.
// We need to query for both elements
const targetSelectors = [
  'link[rel="shortcut icon"]',
  'link[rel="icon"]'
];

const initObserver = () => {
  let favicons = document.head.querySelectorAll(targetSelectors.join(','));
  emitFaviconChanged(favicons[0] as HTMLLinkElement);
}

let interval: NodeJS.Timeout;
window.addEventListener('DOMContentLoaded', () => {
  clearInterval(interval);
  interval = setInterval(initObserver, 1000)
});
