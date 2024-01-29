// decompress.js - implement function that decompresses archive.gz back to the fileToCompress.txt with same content as before compression using zlib and Streams API

import path from "path";
import { fileURLToPath } from "url";
import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, ".", "files", "fileToCompress.txt");
const archivePath = path.join(__dirname, ".", "files", "archive.gz");

const decompress = async (source, destination) => {
    const sourseStream = createReadStream(source);
    const destStream = createWriteStream(destination);
    
    const pipe = promisify(pipeline);

    await pipe(sourseStream, createGunzip(), destStream);
};

await decompress(archivePath, filePath);