export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.commonjs.js",
      format: "commonjs",
    },
    {
      file: "dist/index.module.js",
      format: "module",
    },
  ],
};
