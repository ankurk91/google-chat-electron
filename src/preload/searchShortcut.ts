import {ipcRenderer} from 'electron';

const getSearchElement = () => {
  return <HTMLElement>document.querySelector('input[name="q"]')
}

// https://stackoverflow.com/a/38873788
function isVisible(element: HTMLElement) {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

ipcRenderer.on('searchShortcut', (event) => {
  const element = getSearchElement();

  if (element && isVisible(element)) {
    element.focus()
  }
});

