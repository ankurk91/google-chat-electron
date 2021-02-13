### Development

#### Building the snap package

* Install [snapcraft](https://snapcraft.io/snapcraft) tools (onetime)

```bash
sudo snap install snapcraft --classic
sudo snap install lxd
sudo snap install review-tools
sudo /snap/bin/lxd init --auto
```

* Build snap package

```bash
yarn run build
yarn run build:deb
yarn run build:snap
```

* Publish to store

```bash
yarn run build:snap-repack
snapcraft upload --release=stable ./*.snap
```
