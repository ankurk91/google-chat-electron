#!/bin/bash
set -e

echo "Finding package version..."

PACKAGE_VERSION=$(cat ./package.json | grep '"version"' | sed s/'  \"version\": \"'//g | sed s/'\",'//g)

echo "Version: $PACKAGE_VERSION"

echo "Copy template file"
cp -f "./snap/local/snapcraft.template.yaml" "./snap/snapcraft.yaml"

echo "Find and replace placeholders in snapcraft.yml"
sed -i -e "s/{{SNAP_VERSION}}/$PACKAGE_VERSION/g" ./snap/snapcraft.yaml

echo "Package is ready for building!"
