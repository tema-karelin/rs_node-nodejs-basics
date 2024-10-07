// compress.js - implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API

import path from "path";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, ".", "files", "fileToCompress.txt");
const archivePath = path.join(__dirname, ".", "files", "archive.gz");

const compress = async (source, destination) => {

    const sourseStream = createReadStream(source);
    const destStream = createWriteStream(destination);
    
    const pipe = promisify(pipeline);

    await pipe(sourseStream, createGzip(), destStream);
};

await compress(filePath, archivePath);