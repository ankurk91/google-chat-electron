#!/bin/bash
set -e

# post-remove script will be called even on package upgrades
# lets proceed only when end-user specify the --purge flag in app removal command like
# sudo apt remove --purge google-chat-electron

if [ "$1" != "purge" ]; then
    echo "Skipped running post removal script."
    exit 0
fi

echo "Starting post removal script ..."

# Variables
USER_HOME_DIR=~
APP_FOLDER_NAME=google-chat-electron

# https://stackoverflow.com/questions/7358611/get-users-home-directory-when-they-run-a-script-as-root

if [[ $EUID == 0 ]]; then
    USER_HOME_DIR=$(eval echo ~${SUDO_USER})
fi

echo "Detected your home directory as - $USER_HOME_DIR"

echo "Removing autostart config file"
rm -f "$USER_HOME_DIR/.config/autostart/$APP_FOLDER_NAME.desktop"

echo "Removing app cache folder"
rm -rf "$USER_HOME_DIR/.config/$APP_FOLDER_NAME/"

echo "Finished post removal script!"
