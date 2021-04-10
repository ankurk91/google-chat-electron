#!/bin/bash
set -e

echo "Starting..."

echo "Finding package version..."
PACKAGE_VERSION=$(cat ./package.json | grep '"version"' | sed s/'  \"version\": \"'//g | sed s/'\",'//g)
echo "Version: $PACKAGE_VERSION"

SOURCE_DIR="./dist/google-chat-electron-darwin-x64/"
# output directory would be one level up from working directory
OUT_DIR="../installers/"
OUT_FILE_NAME="${OUT_DIR}google-chat-electron-${PACKAGE_VERSION}-darwin-x64.zip"

echo "Switch to dist directory: ${SOURCE_DIR}"
cd "$SOURCE_DIR"

echo "Remove junk files"
rm -f "LICENSES.chromium.html"
rm -f "LICENSE"
rm -f "version"

echo "Creating output folder: ${OUT_DIR}"
mkdir -p "$OUT_DIR"

echo "Remove zip file if exists"
rm -f "$OUT_FILE_NAME"

echo "Creating zip file: ${OUT_FILE_NAME}"
zip -r --symlinks -9 -T -q "$OUT_FILE_NAME" .

echo "Show file info"
du -sh "$OUT_FILE_NAME"

echo "Finished!"
