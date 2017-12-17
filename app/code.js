const ws = require("nodejs-websocket");
const path = require("path");
const { spawn } = require("pty.js");
const utils = require("./utils.js");

var scriptsToRun = {};
var processes = {};
var index = 0;

exports.createRunServer = () => {
  return ws.createServer(function(conn) {
    conn.on("text", function(str) {
      if (str.startsWith("RUN ")) {
        var token = str.substring(4, str.length);
        var scriptPath = scriptsToRun[token].path;
        var env = Object.create(process.env);

        if (env.PYTHONPATH == null)
          env.PYTHONPATH = __dirname + "/../pyimports";
        else env.PYTHONPATH += ":" + __dirname + "/../pyimports";

        console.log("Running code for token " + token + ": " + scriptPath);
        var pyProcess = spawn("python", [scriptPath], {
          env: env,
          cwd: path.dirname(scriptPath)
        });

        pyProcess.on("data", function(data) {
          console.log("Data");
          conn.send(data);
        });

        pyProcess.on("end", function(data) {
          console.log("Token " + token + ": closing connection.");
          conn.close();
        });

        processes[token] = pyProcess;
      }
    });

    conn.on("close", function(code, reason) {});
  });
};

exports.stopPython = (req, res) => {
  if (!utils.checkParams(req, res, ["token"])) return;

  processes[req.query.token].kill();
};

exports.runPython = (req, res) => {
  if (!utils.checkParams(req, res, ["path"])) return;
  scriptsToRun[index] = {
    path: req.query.path
  };
  res.send({ token: index });
  index++;
};
