#!/bin/bash
set -e

echo "Starting..."

# https://forum.snapcraft.io/t/automated-reviews-and-snapcraft-2-38/4982/16
echo "Unpack and repack snap file to fix automated review issues"
rm -rf ./squashfs-root
unsquashfs ./*.snap
snapcraft pack ./squashfs-root
rm -rf ./squashfs-root

echo "Display file size"
du -sh ./*.snap

echo "Package is ready for publishing!"
