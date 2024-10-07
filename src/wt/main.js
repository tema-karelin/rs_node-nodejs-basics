// main.js - implement function that creates number of worker threads (equal to the number of host machine logical CPU cores) from file worker.js and able to send data to those threads and to receive result of the computation from them. You should send incremental number starting from 10 to each worker. For example: on host machine with 4 cores you should create 4 workers and send 10 to first worker, 11 to second worker, 12 to third worker, 13 to fourth worker. After all workers will finish, function should log array of results into console. The results are array of objects with 2 properties:
//      * status - 'resolved' in case of successfully received value from worker or 'error' in case of error in worker
//      * data - value from worker in case of success or null in case of error in worker

import { cpus } from "os";
import { Worker } from "worker_threads";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, ".", "worker.js");

const cpuNumber = cpus().length;

const resArr = new Array(cpuNumber);

const createWorker = (id, n) => {
  return new Promise((res, rej) => {
    //Creating new worker
    const worker = new Worker(filePath, {
      workerData: { n, id },
    });
    //message
    worker.on("message", (msg) => {
      const { result } = msg;
      const resObj = {
        status: "resolved",
        data: result,
      };
      resArr[id] = resObj;
      res()
    });
    // error
    worker.on("error", (err) => {
      // resArr.push({
      //   status: 'error',
      //   data: null,
      // });
      const resObj = {
          status: 'error',
          data: null,
      };
      resArr[id] = resObj;
      console.log(`\x1b[31m \n> ERROR in the worker N ${id}\n> Recieved number: ${n}\n \x1b[0m`);
      rej()
    });
  });
};

const performCalculations = async (num) => {
  console.log("Number of Cores: ", num);
  const createPromArr = [];
  for (let i = 0; i < num; i++) {
    let nFibo = 10 + i;

    //! error emulation
    // if (i === 2) {
    //   nFibo = 'kf';
    // }

    createPromArr.push(createWorker(i, nFibo));
  }
  await Promise.allSettled(createPromArr)
  console.log(resArr);
};

await performCalculations(cpuNumber);
