#!/bin/bash
set -e

echo "Reading package.json"

PACKAGE_VERSION=$(cat ./package.json | grep '"version"' | sed s/'  \"version\": \"'//g | sed s/'\",'//g)
PACKAGE_NAME=$(cat ./package.json | grep '"name"' | sed s/'  \"name\": \"'//g | sed s/'\",'//g)

echo "Version is: $PACKAGE_VERSION"
echo "NAME is: $PACKAGE_NAME"

PACKAGE_FILE="${PACKAGE_NAME}_${PACKAGE_VERSION}_amd64.deb"
echo "File name is: $PACKAGE_FILE"

PACKAGE_FILE_PATH="./dist/installers/${PACKAGE_FILE}"

if [ ! -f "$PACKAGE_FILE_PATH" ]; then
    echo "Error: $PACKAGE_FILE file does not exists."
    exit 1
fi

if [ -z ${BINTRAY_API_KEY+x} ]; then
    echo "Error: BINTRAY_API_KEY environment variable is not set"
    exit 1
fi

echo "Uploading to bintray..."

BINTRAY_USER="ankurk91"
BINTRAY_API_URL="https://api.bintray.com/content/${BINTRAY_USER}/debian/${PACKAGE_NAME}"
BINTRAY_PATH="pool/main/google-chat-electron/${PACKAGE_FILE}"
BINTRAY_PARAMS="deb_distribution=all;deb_component=main;deb_architecture=amd64;publish=1;override=1"

curl --verbose \
    --max-time 120 \
    --connect-timeout 30 \
    --retry 3 \
    --retry-delay 5 \
    --upload-file "$PACKAGE_FILE_PATH" \
    --user "${BINTRAY_USER}:${BINTRAY_API_KEY}" \
    "${BINTRAY_API_URL}/${PACKAGE_VERSION}/${BINTRAY_PATH};${BINTRAY_PARAMS}"

printf "\nFinished!"
