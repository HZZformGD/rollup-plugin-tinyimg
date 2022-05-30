# rollup-plugin-tinyimg

[![Build Status](https://github.com/HZZformGD/rollup-plugin-tinyimg?branch=master)](https://github.com/HZZformGD/rollup-plugin-tinyimg)

Using tinypng or tinyjpg to compress your images

<p align="center">
  🇨🇳 <a href="./README.zh-CN.md">中文版介绍</a>
</p>

## Installation

```bash
# yarn
yarn add rollup-plugin-tinyimg -D

# npm
npm install rollup-plugin-tinyimg -D
```

## Usage

```js
// rollup.config.js
import tinyimg from "rollup-plugin-tinyimg";

export default {
  input: "src/index.js",
  output: {
    file: "dist/app.js",
    format: "cjs",
  },
  plugins: [
    tinyimg({
      input: resolve(__dirname, "public"),
      output: resolve(__dirname, "dist"),
    }),
  ],
};
```

### Configuration

There are some useful options:

#### input

Type: `String`

it's input dir name :

```js
tinyimg({
  input: resolve(__dirname, "public"),
});
```

#### output

Type: `String`

it's output dir name :

```js
tinyimg({
  output: resolve(__dirname, "dist"),
});
```

#### imageRegx

Type: `Regx`| default `/\.(jpe?g|png|webp)$/`

Match the suffix of the image to be compressed

```js
tinyimg({
    ...,
  imageRegx: /\.(jpe?g|png|webp)$/,
});
```

## License
MIT
