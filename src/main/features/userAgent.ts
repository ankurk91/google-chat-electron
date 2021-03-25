import {session, OnBeforeSendHeadersListenerDetails, Filter} from 'electron'

// Prevent Google from tracking if the website is running inside Electron
export const userAgentString = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0'

export default () => {
  const filter: Filter = {
    urls: ['https://*.google.com/*']
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details: OnBeforeSendHeadersListenerDetails, callback) => {
    details.requestHeaders['User-Agent'] = userAgentString

    callback({
      requestHeaders: details.requestHeaders
    })
  })
}
