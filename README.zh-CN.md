# rollup-plugin-tinyimg

[![Build Status](https://github.com/HZZformGD/rollup-plugin-tinyimg?branch=master)](https://github.com/HZZformGD/rollup-plugin-tinyimg)

通过 tinypng 或者 tinyjpg 来压缩你的图片资源

## 安装

```bash
# yarn
yarn add rollup-plugin-tinyimg -D

# npm
npm install rollup-plugin-tinyimg -D
```

## 使用

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

### 配置

There are some useful options:

#### input

Type: `String`

需要被压缩的图片目录 :

```js
tinyimg({
  input: resolve(__dirname, "public"),
});
```

#### output

Type: `String`

压缩后的输出目录 :

```js
copy({
  output: resolve(__dirname, "dist"),
});
```

#### output

Type: `String`

压缩后的输出目录 :

```js
copy({
  output: resolve(__dirname, "dist"),
});
```

#### imageRegx

Type: `Regx`| default `/\.(jpe?g|png|webp)$/`

匹配需要被压缩的图片的后缀名

## License

MIT
