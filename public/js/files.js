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
    url: "/file?path=" + currentFile,
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
 * Load file content from file system
 * @param {*string} filePath 
 */
function loadFile(filePath) {
  $.get("/file?path=" + filePath, data => {
    editor.setValue(data);
    cacheValue(filePath, data);
    currentFile = filePath;
  });
}

/**
 * Get list of fils in directory
 * @param {*string} path 
 * @param {*function} callback 
 */
function getFiles(path, callback) {
  $.get("/dir?path=" + path, data => {
    callback(path, JSON.parse(data));
  });
}

/**
 * Refresh files in the file picker
 * @param {*array} files 
 */
function refreshFiles(fullPath, files) {
  if (!fullPath.endsWith("/")) fullPath += "/";

  $("#files").empty();
  for (var index in files) {
    $("#files").append(
      $("<option>", {
        value: files[index],
        text: files[index]
      })
    );
  }

  $("option").bind("dblclick", function() {
    loadFile(fullPath + $(this).val());
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
