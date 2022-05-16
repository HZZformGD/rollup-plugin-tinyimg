import fs from "fs-extra";
import randomUseragent from "random-useragent";
import path, { resolve } from "path";

const REMOTEURL = ["tinyjpg.com", "tinypng.com"];

//构造请求头-ip
function returnIp() {
  return (
    Math.floor(Math.random() * (10 - 255) + 255) +
    "." +
    Math.floor(Math.random() * (10 - 255) + 255) +
    "." +
    Math.floor(Math.random() * (10 - 255) + 255) +
    "." +
    Math.floor(Math.random() * (10 - 255) + 255)
  );
}

const fakerHeader = () => {
  const index = Math.round(Math.random());
  return {
    hostname: REMOTEURL[index],
    method: "POST",
    path: "/web/shrink",
    headers: {
      "X-Forwarded-For": returnIp(),
      rejectUnauthorized: false,
      "Postman-Token": Date.now(),
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": randomHead(),
    },
  };
};

//构造请求头-浏览器
function randomHead() {
  return randomUseragent.getRandom();
}

const searchAllImages = (
  input,
  arr = [],
  dir = "/",
  imageRegx = ''
) => {
  
  const files = fs.readdirSync(input);
  for (let i = 0; i < files.length; i++) {
    const info = {};
    const filepath = resolve(input, files[i]);
    const curItem = fs.statSync(filepath);
    if (curItem.isDirectory()) {
      searchAllImages(filepath, arr, path.join(dir, files[i], "/"));
    } else {
      if (new RegExp(imageRegx).test(filepath)) {
        info.path = dir + files[i];
        info.file = filepath;
        arr.push(info);
      }
    }
  }
};

export { fakerHeader, randomHead, searchAllImages };
