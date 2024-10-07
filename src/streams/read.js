// read.js - implement function that reads file fileToRead.txt content using Readable Stream and prints it's content into process.stdout

import process from "process";
import path from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, ".", "files", "fileToRead.txt");

const read = async () => {
  console.log('Reading file "fileToRead.txt" . . .\n');

  const readStream = createReadStream(filePath);

  readStream.on("data", (data) => {
    process.stdout.write(data);
  });
};

await read();
