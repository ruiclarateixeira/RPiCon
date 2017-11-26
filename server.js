/**
 * TODO:
 * Return error instead of success for errors
 * 
 */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var files = require("./files.js");
var utils = require("./utils.js");
const opn = require("opn");
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

function run_python(req, res) {
  utils.checkParams(req, res, ["path"]);
  var process = spawn("python", [req.query.path]);

  process.stdout.on("data", function(data) {
    res.send(data.toString());
  });
}

opn("http://localhost:3000/");
