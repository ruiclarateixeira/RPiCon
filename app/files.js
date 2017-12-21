var fs = require("fs");

/**
 * Gets the content of a file from disk
 * @param {*String} path  Full absolute path to file
 * @returns {*Promise} If fulfilled returns content of the file as utf-8 string else an error mssage
 */
function getFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function read(err, data) {
      if (err) {
        console.log(JSON.stringify(err));
        reject(err.name + " " + err.message);
      } else resolve(data);
    });
  });
}

/**
 * Gets the stats of the file from disk
 * @param {*String} path Full absolute path to file
 * @returns {*Promise} If fulfilled returns an object with file stats else an error message
 */
function getFileStats(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      var fileStats = stats;
      fileStats.isDirectory = stats.isDirectory();
      resolve(fileStats);
    });
  });
}

/**
 * Saves a file to disk
 * @param {*String} path Full absolute path to file
 * @param {*String} initial Expected current content of file on disk - save will fail if that's not the case
 * @param {*String} final Content to save to disk for given file
 * @returns {*Promise} If fulfilled will return success message else error message
 */
function saveFile(path, initial, final) {
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
}

/**
 * Lists files in directory
 * @param {*String} path Full path to directory
 * @returns {*Promise} If fullfilled will return array of strings with file names else an error message
 */
function listDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, function(err, items) {
      if (err) {
        console.log(JSON.stringify(err));
        reject(err.name + " " + err.message);
      } else resolve(items);
    });
  });
}

module.exports = {
  getFile,
  getFileStats,
  saveFile,
  listDirectory
};
