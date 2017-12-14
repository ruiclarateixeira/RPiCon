/**
 * Store file content to file system
 */
function saveFile(path, initial, final) {
  var payload = {
    initial: initial,
    final: final
  };

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/file?path=" + path,
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
