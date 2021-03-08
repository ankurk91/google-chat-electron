import {session, OnBeforeSendHeadersListenerDetails, Filter} from 'electron'

// Prevent Google from tracking if the website is running inside Electron

const userAgentString = (): string => {
  let defaultAgent = session.defaultSession.getUserAgent();
  defaultAgent = defaultAgent.replace(/Electron\/[0-9]/, 'DesktopAppFramework/');
  defaultAgent = <string>defaultAgent.replace(/electron/g, 'app');

  return defaultAgent;
}

export default () => {
  const filter: Filter = {
    urls: ['https://*.google.com/*']
  }

  const userAgent: string = userAgentString();
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details: OnBeforeSendHeadersListenerDetails, callback) => {
    details.requestHeaders['User-Agent'] = userAgent

    callback({
      requestHeaders: details.requestHeaders
    })
  })
}


export {userAgentString}
