import { resolve } from "path";
import tinyImg from "./src/index.js";
export default {
  input: "src/index.js",
  plugins: [
    tinyImg({
      input: resolve(__dirname, "public"),
      output: resolve(__dirname, "demo"),
    }),
  ],
  output: {
    file: "demo/index.js",
  },
};
