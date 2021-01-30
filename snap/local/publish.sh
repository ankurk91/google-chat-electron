#!/bin/bash
set -e

echo "Reading package.json"

PACKAGE_VERSION=$(cat ./package.json | grep '"version"' | sed s/'  \"version\": \"'//g | sed s/'\",'//g)
PACKAGE_NAME=$(cat ./package.json | grep '"name"' | sed s/'  \"name\": \"'//g | sed s/'\",'//g)
PACKAGE_ARCH="amd64"

echo "Version is: $PACKAGE_VERSION"
echo "NAME is: $PACKAGE_NAME"

PACKAGE_FILE="${PACKAGE_NAME}_${PACKAGE_VERSION}_${PACKAGE_ARCH}.snap"

echo "File name is: $PACKAGE_FILE"

if [ ! -f "$PACKAGE_FILE" ]; then
    echo "Error: $PACKAGE_FILE file does not exists."
    exit 1;
fi

# https://forum.snapcraft.io/t/automated-reviews-and-snapcraft-2-38/4982/16
echo "Unpack and repack again to fix automated review issues"
rm -rf ./squashfs-root
unsquashfs "$PACKAGE_FILE"
snapcraft pack ./squashfs-root
rm -rf ./squashfs-root

echo "Display file size"
du -sh "$PACKAGE_FILE"

# You must be logged-in to snapcraft.io in-order to run next command
echo "Uploading to snap store..."
snapcraft upload --release=stable "$PACKAGE_FILE"

echo "Show package info"
snap info "$PACKAGE_NAME"

printf "\nFinished!"
