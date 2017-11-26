var utils = require("./utils.js");

exports.getFile = (req, res) => {
  utils.checkParams(req, res, ["path"]);

  fs.readFile(req.query.path, function read(err, data) {
    if (err) {
      throw err;
    }

    res.send(data);
  });
};

exports.saveFile = (req, res) => {
  utils.checkParams(req, res, ["path"], ["initial", "final"]);

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
};

exports.listDirectory = (req, res) => {
  utils.checkParams(req, res, ["path"]);

  fs.readdir(req.query.path, function(err, items) {
    res.send(JSON.stringify(items));
  });
};
