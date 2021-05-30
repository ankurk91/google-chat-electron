import {Filter, OnBeforeSendHeadersListenerDetails, session} from 'electron'

// Use chrome version as Firefox version, rather than using a hard coded version
const firefoxVersion = parseInt(String(process.versions.chrome)).toFixed(1);

// Prevent Google from tracking if the website is running inside Electron
export const userAgentString = `Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:${firefoxVersion}) Gecko/20100101 Firefox/${firefoxVersion}`

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
