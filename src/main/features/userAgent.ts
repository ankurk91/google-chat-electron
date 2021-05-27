import {Filter, OnBeforeSendHeadersListenerDetails, session} from 'electron'

// Use chrome version as Firefox version, rather than using a hard coded version
const chromeVersion = String(process.versions.chrome);

// Prevent Google from tracking if the website is running inside Electron
export const userAgentString = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`

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
