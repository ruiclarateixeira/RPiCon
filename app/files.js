var utils = require("./utils.js");
var fs = require("fs");

exports.getFile = (req, res) => {
  if (!utils.checkParams(req, res, ["path"])) return;

  fs.readFile(req.query.path, function read(err, data) {
    if (err) {
      res.status(500);
      res.send(JSON.stringify({ error: err.name + " " + err.message }));
    }

    res.send(data);
  });
};

exports.getFileStats = (req, res) => {
  if (!utils.checkParams(req, res, ["path"])) return;

  fs.stat(req.query.path, (err, stats) => {
    var fileStats = stats;
    fileStats.isDirectory = stats.isDirectory();
    res.send(JSON.stringify(fileStats));
  });
};

exports.saveFile = (req, res) => {
  if (!utils.checkParams(req, res, ["path"], ["initial", "final"])) return;

  fs.readFile(req.query.path, function read(err, data) {
    if (err) {
      res.status(500);
      res.send(JSON.stringify({ error: err.name + " " + err.message }));
    }

    if (req.body.initial != data) {
      res.status(500);
      res.send(JSON.stringify({ error: "File has changed" }));
      return;
    }

    fs.writeFile(req.query.path, req.body.final, function(err) {
      if (err) {
        res.status(500);
        res.send(JSON.stringify({ error: err.name + " " + err.message }));
      }

      res.send({ success: "Saved" });
    });
  });
};

exports.listDirectory = (req, res) => {
  if (!utils.checkParams(req, res, ["path"])) return;

  fs.readdir(req.query.path, function(err, items) {
    res.send(JSON.stringify(items));
  });
};
