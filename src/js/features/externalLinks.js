const electron = require('electron');

module.exports = (window) => {
  const handleRedirect = (event, url) => {
    const whiteListDomains = [
      extractHostname(window.webContents.getURL()),
      'accounts.google.com',
      'accounts.youtube.com',
      'support.google.com',
      'chat.google.com'
    ];

    if (!whiteListDomains.includes(extractHostname(url))) {
      setImmediate(() => {
        electron.shell.openExternal(url);
      })
      event.preventDefault();
    }
  };

  window.webContents.on('will-navigate', handleRedirect);
  window.webContents.on('new-window', handleRedirect);
}

function extractHostname(url) {
  return (new URL(url)).hostname;
}
