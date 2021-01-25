// https://github.com/getferdi/recipes/blob/822c5680c0/recipes/hangoutschat/webview.js
import {ipcRenderer} from 'electron';

// class corresponding to the mute icon
const muteSelector = ".DQy0Rb";

// class corresponding to the bold text that is visible for all messages
const allMessageSelector = ".IL9EXe.PL5Wwe.dHI9xe.H7du2";

const isMuted = (node: any) => {
  const closestItem = node.closest('[role="listitem"]')
  if (closestItem) {
    return !!closestItem.querySelector(muteSelector);
  } else {
    return true;
  }
}

const getMessages = () => {
  let allMessageCount = 0;

  document.querySelectorAll(allMessageSelector).forEach((node) => {
    if (!isMuted(node)) {
      allMessageCount += 1;
    }
  });

  return allMessageCount
};

ipcRenderer.on('unreadCount', (event) => {
  event.sender.send('unreadCount', getMessages())
});

