import {ipcRenderer} from 'electron';

const getSearchButton = () => {
  return <HTMLElement>document.querySelector('div[role="button"][aria-label="Search"][title="Search"]')
}

// https://stackoverflow.com/a/38873788
function isVisible(element: HTMLElement) {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

ipcRenderer.on('searchShortcut', (event) => {
  const button = getSearchButton();

  if (button && isVisible(button)) {
    button.click()
  }
});

