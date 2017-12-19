var utils = require("./utils.js");
var fs = require("fs");

exports.getFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function read(err, data) {
      if (err) {
        console.log(JSON.stringify(err));
        reject(err.name + " " + err.message);
      } else resolve(data);
    });
  });
};

exports.getFileStats = path => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      var fileStats = stats;
      fileStats.isDirectory = stats.isDirectory();
      resolve(fileStats);
    });
  });
};

exports.saveFile = (path, initial, final) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function read(err, data) {
      if (err) {
        console.log(JSON.stringify(err));
        reject(err.name + " " + err.message);
        return;
      }

      if (initial != data) {
        reject("File has changed");
        return;
      }

      fs.writeFile(path, final, function(err) {
        if (err) {
          console.log(JSON.stringify(err));
          reject(err.name + " " + err.message);
        } else resolve("Saved!");
      });
    });
  });
};

exports.listDirectory = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, function(err, items) {
      if (err) {
        console.log(JSON.stringify(err));
        reject(err.name + " " + err.message);
      } else resolve(items);
    });
  });
};
