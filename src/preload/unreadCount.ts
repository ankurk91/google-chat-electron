import {ipcRenderer} from 'electron';

const targetSelectors = [
  'div[data-tooltip="Chat"][role="group"]',
  'div[data-tooltip="Spaces"][role="group"]'
];

const getMessageCount = (): number => {
  let counter = 0;

  let elems = document.querySelectorAll('.XS > span > .XU');
  if (elems && elems.length > 0) {
    elems.forEach((item) => {
      counter += Number(item.textContent);
    });
    return (counter);
  }

  document.body.querySelectorAll(targetSelectors.join(',')).forEach((target) => {
    const span = target.querySelector('span[role="heading"]')?.nextElementSibling
    if (span) {
      counter = counter + Number(span.textContent)
    }
  })
  return counter
}

let previousCount = -1;
const emitCount = () => {
  const count = getMessageCount();
  if (previousCount === count) {
    return
  }

  previousCount = count;
  ipcRenderer.send('unreadCount', getMessageCount())
}

let interval: NodeJS.Timeout;
window.addEventListener('DOMContentLoaded', () => {
  clearInterval(interval)
  interval = setInterval(emitCount, 1000)
});

