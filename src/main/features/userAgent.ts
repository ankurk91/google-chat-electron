import {session, OnBeforeSendHeadersListenerDetails} from 'electron'

const userAgentString = () => {
  let defaultAgent = session.defaultSession.getUserAgent();
  defaultAgent = defaultAgent.replace(/Electron\/[0-9]/, 'DesktopAppFramework/');
  defaultAgent = <string>defaultAgent.replace(/electron/g, 'app');

  return defaultAgent;
}

export default function () {
  const filter = {
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
