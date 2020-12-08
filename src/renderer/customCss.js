const getCssContent = async () => {
  const {readFile} = require('fs').promises;
  const path = require('path');

  try {
    return await readFile(path.join(__dirname, 'overrides.css'), {
      encoding: 'utf-8'
    });
  } catch (error) {
    throw new Error(error)
  }
}

const injectCustomCss = async () => {
  const cssRules = await getCssContent();

  const style = document.createElement('style');
  style.id = 'google-chat-electron';
  style.appendChild(document.createTextNode(cssRules));
  document.head.appendChild(style)
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.host.includes('chat.google.com')) {
    injectCustomCss();
  }
})
