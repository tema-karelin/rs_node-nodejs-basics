import { env } from "node:process";

const reg = /RSS_/;

const parseEnv = () => {
  for (const key in env) {
    const i = key.search(reg);
    if (i === 0) {
      console.log(`${key}=${env[key]};`);
    }
  }
};

parseEnv();