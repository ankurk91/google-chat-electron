import {ipcRenderer} from 'electron';

// Google chat initially loads favicon with rel="icon",
// but replace it with rel="shortcut icon" when a new message appears.
// We need to query for both elements
const targetSelectors = [
  'link[rel="shortcut icon"]',
  'link[rel="icon"]'
];

let previousHref: null | string = '';
const emitFaviconChanged = (favicon: HTMLLinkElement) => {
  const href = favicon?.href || '';

  if (previousHref === href) {
    return;
  }
  previousHref = href;

  ipcRenderer.send('faviconChanged', href);
}

const initObserver = () => {
  let favicons = document.head.querySelectorAll(targetSelectors.join(','));
  emitFaviconChanged(favicons[0] as HTMLLinkElement);
}

let interval: NodeJS.Timeout;
window.addEventListener('DOMContentLoaded', () => {
  clearInterval(interval);
  interval = setInterval(initObserver, 1000)
});
