import fs from "fs-extra";
import path, { resolve } from "path";
import https from "https";
import { searchAllImages, fakerHeader, randomHead } from "./utils";
import Ora from "ora";
import { URL } from "url";
import Chalk from "chalk";

const header = fakerHeader();
const IMG_REGEXP = /\.(jpe?g|png|webp)$/;

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const req = https.request(header, (res) =>
      res.on("data", (data) => {
        const res = JSON.parse(data.toString());
        res.error ? reject(res.message) : resolve(res);
      })
    );
    req.write(file, "binary");
    req.on("error", (e) => reject(e));
    req.end();
  });
};

const downLoad = (url) => {
  const opts = new URL(url);
  return new Promise((resolve, reject) => {
    const req = https.request(opts, (res) => {
      let file = "";
      res.setEncoding("binary");
      res.on("data", (chunk) => (file += chunk));
      res.on("end", () => resolve(file));
    });
    req.on("error", (e) => reject(e));
    req.end();
  });
};

const compress = async (fileInfo, input, output) => {
  try {
    const file = fs.readFileSync(resolve(input, fileInfo.file), "binary");
    const dpath = path.join(output, fileInfo.path);
    const res = await uploadImage(file);
    const data = await downLoad(res.output.url);
    console.info(`
originSize: ${Chalk.redBright(res.input.size)}
compreeSize: ${Chalk.greenBright(res.output.size)}
ratio: ${Chalk.blueBright(res.output.ratio)}
    `);

    await fs.outputFile(dpath, data, "binary");
    return Promise.resolve("success");
  } catch (e) {
    return Promise.resolve(e);
  }
};

const tinyImg = (config) => {
  const { input, output, imageRegx = IMG_REGEXP } = config;

  return {
    name: "tinyImg",
    async buildEnd() {
      try {
        const imgs = [];
        searchAllImages(input, imgs, "/", imageRegx);
        if (!imgs.length) return;
        const spinner = Ora("Image is compressing......").start();

        const promiseList = imgs.map(async (img) =>
          compress(img, input, output)
        );
        Promise.all(promiseList).then((res) => {
          console.log(Chalk.green("Compress success!"));
          spinner.stop();
        });
      } catch (e) {
        console.info(e);
      }

      // console.info(a, rest);
    },
  };
};

export default tinyImg;
