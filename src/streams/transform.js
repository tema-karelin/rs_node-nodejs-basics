//transform.js - implement function that reads data from process.stdin, reverses text using Transform Stream and then writes it into process.stdout

import {stdin, stdout} from "process";
import { Transform, pipeline } from "stream";

const transform = async () => {
        const myTransform = new Transform({
            transform(chunk, enc, callback) {
                const reversedStr = chunk.toString().trim().split('').reverse().join('');
                this.push(reversedStr + "\n");
                callback();
            }
        });

        pipeline(stdin, myTransform, stdout, err => {
            console.log('Error: ', err);
        });
};

await transform();