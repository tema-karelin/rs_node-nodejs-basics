// cp.js - implement function spawnChildProcess that receives array of arguments args and creates child process from file script.js, passing these args to it. This function should create IPC-channel between stdin and stdout of master process and child process:
//       * child process stdin should receive input from master process stdin
//       * child process stdout should send data to master process stdout

import { fork } from "child_process";
import path from "path";
import { stdin, stdout } from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const childScriptPath = path.join(__dirname, ".", "files", "script.js");

const spawnChildProcess = async (args) => {
  console.log('Use \"CLOSE\n" to exit from child script\n');

  const childScript = fork(childScriptPath, args);

  childScript.on('message', (message) => {
    console.log(`Message from script.js: ${message}`);
  });

  childScript.on('exit', (code) => {
    console.log('script.js exited: ', code );
  })


};

// Arguments
const argumentsArray = [
  "___keep_learning_and_growing___",
  "___coding_with_passion___",
  "___you_can_do_it___",
  "___debugging_pro___",
  "___effort_leads_to_success___",
  "___embracing_the_challenge___",
  "___never_stop_coding___",
  "___perseverance_pays_off___",
  "___learning_is_a_journey___",
  "___coding_wizard_in_the_making___",
  "___bugs_are_just_features_in_disguise___",
  "___coding_like_a_champion___",
  "___innovation_starts_with_code___",
  "___crushing_the_code_game___",
  "___coding_with_confidence___",
  "___you_are_the_master_of_your_code___",
  "___code_and_conquer___",
  "___making_your_code_shine___",
  "___coding_for_a_bright_future___",
  "___good_luck_in_your_code_adventure___"
];
spawnChildProcess(argumentsArray);
