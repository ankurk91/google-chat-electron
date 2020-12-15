import {BrowserWindow, shell} from 'electron';

export default function (window: BrowserWindow) {
  const handleRedirect = (event: Event, url: string) => {
    const whiteListDomains = [
      extractHostname(window.webContents.getURL()),
      'accounts.google.com',
      'accounts.youtube.com',
      'support.google.com',
      'chat.google.com'
    ];

    if (!whiteListDomains.includes(extractHostname(url))) {
      setImmediate(() => {
        shell.openExternal(url);
      })
      event.preventDefault();
    }
  };

  window.webContents.on('will-navigate', handleRedirect);
  window.webContents.on('new-window', handleRedirect);
}

function extractHostname(url: string) {
  return (new URL(url)).hostname;
}
