var cache = {};
var currentFile = "";
var editor = null;

function getCurrentFile() {
  return currentFile;
}

function setEditor(newEditor) {
  if (editor === null) editor = newEditor;
}

/**
 * Store file content to file system
 */
function saveFile() {
  var content = editor.getValue();
  var payload = {
    initial: getCachedValue(currentFile),
    final: content
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/file?path=" + currentFile,
    data: JSON.stringify(payload),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      console.log(JSON.stringify(data));
    },
    failure: function(errMsg) {
      console.log("Failed to save!");
    }
  });
}

/**
 * Store the file content in cache
 * @param {*string} key
 * @param {*string} value
 */
function cacheValue(key, value) {
  cache[key] = value;
}

/**
 * Get file content stored in cache
 * @param {*string} key
 */
function getCachedValue(key) {
  if (cache[key] == null) return "";
  return cache[key];
}

module.exports = { saveFile };
