// write.js - implement function that writes process.stdin data into file fileToWrite.txt content using Writable Stream

import process from "process";
import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, ".", "files", "fileToWrite.txt");

const write = async () => {
    console.log("Type data to write it in the file\n   !!! Ctrl+C to exit !!!   \n>");
    const writeStream = createWriteStream(filePath);
    process.stdin.pipe(writeStream);
 };

await write();