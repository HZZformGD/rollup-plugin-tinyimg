import { resolve } from "path";
import tinyImg from "./src/index.js";
export default {
  input: "src/index.js",
  plugins: [
    tinyImg({
      input: resolve(__dirname, "./tests/input"),
      output: resolve(__dirname, "./tests/output"),
    }),
  ],
  output: {
    file: "demo/index.js",
  },
};
