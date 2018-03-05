const path = require("path");
const { spawn } = require("node-pty");

var scriptsToRun = {};
var processes = {};
var index = 0;

/**
 * Run python code
 * @param {*String} token Token that identifies the process within the app
 * @param {*Function} onData Handle data from stdio
 * @param {*Function} onEnd Handle end event
 */
function runProcessForToken(token, onData, onEnd) {
  var scriptPath = scriptsToRun[token].path;
  var env = Object.assign({}, process.env);

  if (env.PYTHONPATH == null) env.PYTHONPATH = __dirname + "/../pyimports";
  else env.PYTHONPATH += ":" + __dirname + "/../pyimports";

  console.log("Running code for token " + token + ": " + scriptPath);
  onData("$ python " + scriptPath + "\n\n");
  var pyProcess = spawn("python", [scriptPath], {
    env: env,
    cwd: path.dirname(scriptPath)
  });

  pyProcess.on("data", onData);

  pyProcess.on("exit", data => {
    console.log("Exiting code for token: " + token);
    onEnd();
  });

  processes[token] = pyProcess;
}

/**
 * Kills a running process
 * @param {*String} token Token that identifies the process within the app
 */
function stopProcessForToken(token) {
  processes[token].kill();
}

/**
 * Marks a file to be ran. Actually running the process requires connecting to the run server.
 * @param {*String} path Full absolute path to file
 */
function runPython(path) {
  scriptsToRun[index] = {
    path: path
  };
  return index++;
}

module.exports = {
  stopProcessForToken,
  runPython,
  runProcessForToken
};
