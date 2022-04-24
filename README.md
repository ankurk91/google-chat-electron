# Desktop app for Google Chat

[![latest-tag](https://badgen.net/github/release/ankurk91/google-chat-electron)](https://github.com/ankurk91/google-chat-electron/releases)
[![downloads](https://img.shields.io/github/downloads/ankurk91/google-chat-electron/total?cacheSeconds=3600)](https://somsubhra.github.io/github-release-stats/?username=ankurk91&repository=google-chat-electron&page=1&per_page=30)
[![homebrew](https://badgen.net/homebrew/cask/dy/google-chat-electron)](https://formulae.brew.sh/cask/google-chat-electron)
[![release-linux](https://github.com/ankurk91/google-chat-electron/actions/workflows/release-linux.yml/badge.svg)](https://github.com/ankurk91/google-chat-electron/actions/workflows/release-linux.yml)
[![release-mac](https://github.com/ankurk91/google-chat-electron/actions/workflows/release-mac.yml/badge.svg)](https://github.com/ankurk91/google-chat-electron/actions/workflows/release-mac.yml)
[![release-windows](https://github.com/ankurk91/google-chat-electron/actions/workflows/release-windows.yml/badge.svg)](https://github.com/ankurk91/google-chat-electron/actions/workflows/release-windows.yml)
[![snapcraft](https://snapcraft.io/google-chat-electron/badge.svg)](https://snapcraft.io/google-chat-electron)

An unofficial desktop app for [Google Chat](https://mail.google.com/chat/u/0/) built
with [Electron](https://www.electronjs.org/apps/google-chat-electron)

### Motivation

* Google has [shutdown](https://support.google.com/chat/answer/10194711) the official Google Chat Desktop App in March
  2021
* Google is forcing users to use PWA which has less features
* You are a Firefox user and don't want to install Chrome; just to use a PWA. :wink:

### Installation (Linux)

* Install via [snap](https://snapcraft.io/google-chat-electron) (recommended)

```bash
sudo snap install google-chat-electron

# grant permissions 
sudo snap connect google-chat-electron:home :home
sudo snap connect google-chat-electron:removable-media :removable-media
```

* Alternatively you can download the latest debian installer from
  [releases](https://github.com/ankurk91/google-chat-electron/releases/latest) section
* Install the debian package with this command: (correct the file path yourself)

```bash
sudo apt install ~/path/to/google-chat-electron-xxx-amd64.deb
```

* :warning: Debian package does not have automatic background updates

### Uninstall (Linux)

* Logout and Quit from app
* Remove the app with this command if installed via snap

```bash
sudo snap remove google-chat-electron
```

or if installed via debian package

```bash
sudo apt-get remove --purge google-chat-electron
```

* The uninstallation script should remove all relevant files and folders.

### Installation (Mac)

* Homebrew users can run `brew install --cask --no-quarantine google-chat-electron`

or

* Download the zip (darwin) file from [releases](https://github.com/ankurk91/google-chat-electron/releases/latest)
* Extract the zip file
* Move the app to your `~/Applications` folder
* Fix the permission issue with this command

```bash
sudo xattr -rd com.apple.quarantine ~/Applications/google-chat-electron.app
```

* Above command should fix the Mac-OS Gatekeeper [issue](https://apple.stackexchange.com/questions/262355/)

### Uninstall (Mac)

* Logout and Quit from app
* Move the app to trash

### Installation Windows

* :warning: This app is **NOT** available
  on [Windows App Store](https://www.microsoft.com/en-in/p/desktop-client-for-google-chat/9mzxbpl66066)
* You can install this app by [downloading](https://github.com/ankurk91/google-chat-electron/releases/latest) the
  installer
* If you prefer [winget-cli](https://github.com/microsoft/winget-cli) on Windows 10+, you can run:

```bash
winget install --id=ankurk91.GoogleChatElectron  -e
```

### Supported Platforms

The app should work on all x64 and Apple ARM platforms, but due to lack of time; we test on most popular only.

| OS/Platform         |  Version  |
|:--------------------|:---------:|
| Ubuntu GNOME        |   20.x    |
| Linux Mint Cinnamon |   20.x    |
| MacOS               | 10.15, 11 |
| Windows             | 7, 10, 11 |

### Major features

* System tray
    - Unread message indicator
    - Offline indicator (no internet or not logged-in)
    - Close the app to tray when you close the app window
* Desktop notifications
    - Clicking on notification bring the app to focus and open the specific person chat/room
* Unread message counter in dock
* Auto start the app when you log in to your machine (configurable)
* Auto check for updates on startup and notify user if any (configurable)
* Auto check for internet on startup and keep retrying to connect every 60 seconds if offline
* Open external links in your OS default web browser
* Preserve window position and size
* Prevent multiple chat app instances from running
* CTRL+F shortcut to search

### Acknowledgements

* [@robyf](https://github.com/robyf/google-chat-linux) for the initial work
* [@squalou](https://github.com/squalou/google-chat-linux) for enhancements
* All past [contributors](https://github.com/ankurk91/google-chat-electron/graphs/contributors)

## Disclaimer

This desktop app is just a wrapper which starts a chromium instance locally and runs the actual web-app in it. All
rights to the [Google Chat](https://chat.google.com/) product is reserved by
[Google Inc.](https://en.wikipedia.org/wiki/Google)
This desktop client has no way to access none of your data.

[![Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/google-chat-electron)

## License

[GNU GPLv3](LICENSE.txt) License
