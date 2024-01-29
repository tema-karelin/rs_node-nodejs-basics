import path from "node:path";
import { fileURLToPath } from "url";
import { readFile } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, ".", "files", "fileToRead.txt");
const errMsg = "FS operation failed";

const read = async () => {
  readFile(filePath, "utf-8")
    .then((res) => {
      console.log("\n" + res);
    })
    .catch(() => console.log(new Error(errMsg)));
};

await read();
