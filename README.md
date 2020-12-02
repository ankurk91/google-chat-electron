# Google Chat Linux App

[![gh-actions](https://github.com/ankurk91/google-chat-electron-linux/workflows/release/badge.svg)](https://github.com/ankurk91/google-chat-electron-linux/actions)
[![license](https://badgen.net/github/license/ankurk91/google-chat-electron-linux)](https://github.com/ankurk91/google-chat-electron-linux)
[![latest-release](https://badgen.net/github/release/ankurk91/google-chat-electron-linux)](https://github.com/ankurk91/google-chat-electron-linux/tags)
[![downloads](https://badgen.net/github/assets-dl/ankurk91/google-chat-electron-linux)](https://github.com/ankurk91/google-chat-electron-linux/releases)

An unofficial desktop client for [Google Chat](https://chat.google.com/) build with [Electron](https://www.electronjs.org/).

### Installation
* Download the latest `.deb` file from the [releases](https://github.com/ankurk91/google-chat-electron-linux/releases) section.
* Install the package with this command:
```
sudo apt install ~/path/to/google-chat-electron-xxx.deb
```
* This should work on Debian Linux or derivatives (Ubuntu, Mint, Elementary etc).

### Uninstall
You can remove the app with this command
```
sudo apt-get remove --purge google-chat-electron
```

### Todos
* [x] Create automated release via Github actions
* [x] Save and restore window size 
* [x] Unread message count badge
* [x] Run at OS startup
* [ ] App updates notification

### Acknowledgements
* [@robyf](https://github.com/robyf) for the initial work
* [@mwpeterson](https://github.com/mwpeterson) for the enhancements

## License
* Source code licensed under [MIT](LICENSE.txt) License
* Google Chat Icons taken from [Wikipedia](https://en.wikipedia.org/wiki/Google_Chat)
