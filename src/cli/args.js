import { argv } from "node:process";

const warningMsg =
  'WARNING:\n   Check if you run script with arguments in format "--propName value"\n   In case of incorrect format the program output is unpredictable!\n';

const parseArgs = () => {
  for (let i = 2; i < argv.length; i += 2) {
    if (argv[i].search(/^--/) !== 0) console.log(warningMsg);
    console.log(`${argv[i].replace("--", "")} is ${argv[i + 1]};`);
  }
};

parseArgs();
