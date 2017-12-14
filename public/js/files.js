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

module.exports = { saveFile };
