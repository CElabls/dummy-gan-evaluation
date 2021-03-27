# dummy-gan-evaluation
App for evaluation images produced by GAN just by choosing which one is real

# Config
Look at the `.env.sample` in `server` and `client` directories for all available configurations.

# Server

```bash
yarn install

DEV

yarn start:dev

PROD

yarn build
```

# Client

```bash
yarn install

DEV

yarn dev

PROD

yarn build && yarn start
```

# Images

All images are placed inside `public` directory. `Real` images are placed inside `real`
subdirectory, `fake` inside `fake`.

Example tree (2 classes):

```
public
--- real
------  0
----------  img1r.png
------  1
----------  img1r.jpg
--- fake
------  0
----------  img1f.jpg
------  1
----------  img1f.png
```

Image's names does not matter. But class name directories should start from `0`. There also no need to have exactly the same amount of images per class.
Remember to create directory `logs` at server top-level.

# License

MIT, Petro Liashchynskyi
