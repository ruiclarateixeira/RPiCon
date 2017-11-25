var cache = {};

function saveFile(filePath) {
  var content = $("#code").val();
  var payload = {
    initial: getCachedValue("code"),
    final: "test"
  };

  $.ajax({
    type: "POST",
    url: "/file?path=" + filePath,
    data: JSON.stringify(payload),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      console.log("Saved!");
    },
    failure: function(errMsg) {
      console.log("Failed to save!");
    }
  });
}

function loadFile(filePath) {
  $.get("/file?path=" + filePath, data => {
    $("#code").val(data);
    cacheValue(data);
  });
}

function getFiles(path, callback) {
  $.get("/dir?path=" + path, data => {
    callback(JSON.parse(data));
  });
}

function refreshFiles(files) {
  $("#files").empty();
  for (var index in files) {
    $("#files").append(
      $("<option>", {
        value: files[index],
        text: files[index]
      })
    );
  }
}

function cacheValue(key, value) {
  cache[key] = value;
}

function getCachedValue(key) {
  if (cache[key] == null) return "";
  return cache[key];
}
