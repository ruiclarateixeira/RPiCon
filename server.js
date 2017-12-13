const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const files = require("./files.js");
const utils = require("./utils.js");
const opn = require("opn");
const ws = require("nodejs-websocket");
const { spawn } = require("child_process");

app.listen(3000, function() {
  console.log("server running on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/run", run_python);
app.get("/dir", files.listDirectory);
app.post("/file", files.saveFile);
app.get("/file", files.getFile);

var scriptsToRun = {};
var index = 0;

var server = ws
  .createServer(function(conn) {
    conn.on("text", function(str) {
      if (str.startsWith("RUN ")) {
        var token = str.substring(4, str.length);
        var path = scriptsToRun[token].path;
        var env = Object.create(process.env);

        if (env.PYTHONPATH == null) env.PYTHONPATH = "./pyimports";
        else env.PYTHONPATH += ":./pyimports";

        console.log("Running code for token " + token + ": " + path);
        var pyProcess = spawn("python", [path], { env: env });

        pyProcess.stdout.setEncoding("utf8");
        pyProcess.stdout.on("data", function(data) {
          conn.send(data);
        });

        pyProcess.stdout.on("end", function(data) {
          console.log("Token " + token + ": closing connection.");
          conn.close();
        });

        pyProcess.stderr.setEncoding("utf8");
        pyProcess.stderr.on("data", function(data) {
          conn.send(data);
        });
      }
    });

    conn.on("close", function(code, reason) {});
  })
  .listen(8001);

function run_python(req, res) {
  if (!utils.checkParams(req, res, ["path"])) return;
  scriptsToRun[index] = {
    path: req.query.path
  };
  res.send({ token: index });
  index++;
}
