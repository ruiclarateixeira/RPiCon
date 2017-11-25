/**
 * TODO:
 * Get rid of the debugging variable
 * Return error instead of success for errors
 * 
 */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
const { spawn } = require("child_process");

var debuggingGlobalVars = {
  fileContents: {}
};

app.listen(3000, function() {
  console.log("server running on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.get("/run", run_python);

function run_python(req, res) {
  var process = spawn("python", ["./run_python.py"]);

  process.stdout.on("data", function(data) {
    res.send(data.toString());
  });
}

app.get("/dir", (req, res) => {
  if (req.query.path == null) {
    res.send(JSON.stringify({ error: "No path provided" }));
    return;
  }

  fs.readdir(req.query.path, function(err, items) {
    res.send(JSON.stringify(items));
  });
});

app.post("/file", (req, res) => {
  if (req.query.path == null) {
    res.send(JSON.stringify({ error: "No path provided" }));
    return;
  }

  if (req.body.initial == null) {
    res.send(JSON.stringify({ error: "No initial value provided" }));
    return;
  }

  if (req.body.final == null) {
    res.send(JSON.stringify({ error: "No final value provided" }));
    return;
  }

  fs.readFile(req.query.path, function read(err, data) {
    if (err) {
      throw err;
    }

    if (req.body.initial != data) {
      res.send(JSON.stringify({ error: "File has changed" }));
      return;
    }

    fs.writeFile(req.query.path, req.body.final, function(err) {
      if (err) {
        throw err;
      }

      res.send({ success: "Saved" });
    });
  });
});

app.get("/file", (req, res) => {
  if (req.query.path == null) {
    res.send(JSON.stringify({ error: "No path provided" }));
    return;
  }

  fs.readFile(req.query.path, function read(err, data) {
    if (err) {
      throw err;
    }

    res.send(data);
  });
});
