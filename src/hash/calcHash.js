// calcHash.js - implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt and logs it into console as hex using Streams API

import { createHash } from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { createReadStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, ".", "files", "fileToCalculateHashFor.txt");

const calculateHash = async () => {
    const hash = createHash('sha256');
    const readStream = createReadStream(filePath, 'utf-8');

    const streamPromise = new Promise ((resolve, reject) => {
        //process.stdout.write('Creating hash for fileToCalculateHashFor.txt ');
        readStream.on('data', (chunk) => {
            hash.update(chunk);
        })

        readStream.on('end', () => {
            //console.log('\nReading stream ended.\n');
            const result = hash.digest('hex');
            resolve(result);
        })
    });

    streamPromise.then(res => {
        console.log('SHA256 hash:\n');
        console.log(res);
    })

};

await calculateHash();