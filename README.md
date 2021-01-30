# Google Chat Desktop App

[![latest-tag](https://badgen.net/github/release/ankurk91/google-chat-electron)](https://github.com/ankurk91/google-chat-electron/tags)
[![downloads](https://img.shields.io/github/downloads/ankurk91/google-chat-electron/total?cacheSeconds=1800)](https://github.com/ankurk91/google-chat-electron/releases)
[![gh-actions](https://github.com/ankurk91/google-chat-electron/workflows/release/badge.svg)](https://github.com/ankurk91/google-chat-electron/actions)
[![license](https://badgen.net/github/license/ankurk91/google-chat-electron)](https://github.com/ankurk91/google-chat-electron)
[![dependencies](https://img.shields.io/david/ankurk91/google-chat-electron?cacheSeconds=86400)](https://david-dm.org/ankurk91/google-chat-electron)
[![snapcraft](https://snapcraft.io/google-chat-electron/badge.svg)](https://snapcraft.io/google-chat-electron)
[![bintray](https://api.bintray.com/packages/ankurk91/debian/google-chat-electron/images/download.svg)](https://bintray.com/ankurk91/debian/google-chat-electron/_latestVersion)

An unofficial desktop app for [Google Chat](https://chat.google.com/) built with [Electron](https://www.electronjs.org/)

### Motivation

* The official Google Chat electron app
    - is only [available](https://chat.google.com/download/) on Mac
    - will [stop running](https://support.google.com/chat/answer/10194711) after Jan 2021
* Google is forcing users to use PWA which has fewer features

### Installation

* Install via [snap](https://snapcraft.io/google-chat-electron) (recommended)

```bash
sudo snap install google-chat-electron
sudo snap set core experimental.refresh-app-awareness=true
```

* Alternatively you can install the debian package on Ubuntu and its derivatives

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 379CE192D401AB61
echo "deb https://dl.bintray.com/ankurk91/debian all main" | sudo tee -a /etc/apt/sources.list.d/google-chat-electron.list
sudo apt update
sudo apt install -y google-chat-electron
```

### Uninstall

* Quit from app if running
* Remove the app with this command

```bash
sudo snap remove google-chat-electron

# or when installed via debian package
sudo apt-get remove --purge google-chat-electron
```

* The uninstallation script should remove all relevant files and folders.

### Supported Platforms

The app should work on most linux distros, but due to lack of time; we test on most popular only.

| OS                    | Version          | Tested              |
| :---                  | :---:            |                ---: |
| Ubuntu GNOME          | 20.x             |  :heavy_check_mark: |
| Linux Mint Cinnamon   | 20.x             |  :heavy_check_mark: |

### Acknowledgements

* [@robyf](https://github.com/robyf/google-chat-linux) for the initial work
* [@squalou](https://github.com/squalou/google-chat-linux) for enhancements
* All other [contributors](https://github.com/ankurk91/google-chat-electron/graphs/contributors)

## Disclaimer

This desktop app is just a wrapper which starts a chromium instance locally and runs the actual web-app in it. All
rights to the [Google Chat](https://chat.google.com/) product is reserved by
[Google Inc.](https://en.wikipedia.org/wiki/Google)
This desktop client has no way to access none of your data.

[![Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/google-chat-electron)
[![Bintray](https://www.bintray.com/docs/images/bintray_badge_color.png)](https://bintray.com/ankurk91/debian/google-chat-electron?source=watch)

## License

[MIT](LICENSE.txt) License
