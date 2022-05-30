import { rollup, watch } from "rollup";
import tinyImg from "../src/index.js";
import { resolve } from "path";
import { searchAllImages } from "../src/utils.js";
const list = [];
searchAllImages(resolve(__dirname, "input"), list, "/");
async function build(pluginOptions) {
  await rollup({
    input: resolve(__dirname, "input.js"),
    output: [
      {
        file: "./output/index.commonjs.js",
        format: "commonjs",
      },
    ],
    plugins: [tinyImg(pluginOptions)],
  });
}

describe("tinyimg test", () => {
  test("No config passed", async () => {
    const t = build();
    await expect(t).rejects.toThrowError(TypeError);
  });

  test("Expected config to be an object", async () => {
    const t = build([1, 2, 3]);
    await expect(t).rejects.toThrowError(TypeError);
  });

  test("Expected config to be an object with 'input' and 'output'", async () => {
    const t = build({ output: "demo" });
    await expect(t).rejects.toThrowError(TypeError);
  });

  test("Expected input to be a directory", async () => {
    const t = build({ input: "src/index.js", output: "demo" });
    await expect(t).rejects.toThrowError(Error);
  });

  // test("compree success", async () => {
  //   await build({
  //     input: resolve(__dirname, "input"),
  //     output: resolve(__dirname, "output"),
  //   });

  //   for (let i = 0; i < list.length; i++) {
  //     expect(await fs.pathExists(list[i].path)).toBe(true);
  //   }

  //   // await expect(t).rejects.toThrowError(Error);
  // });
});
