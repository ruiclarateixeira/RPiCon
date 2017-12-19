const { remote } = require("electron");
const mainProcess = remote.require("./app.js");

export function run(path) {
  var token = mainProcess.runPython(path);
  var socket = new WebSocket("ws://localhost:8001");
  socket.onopen = function(event) {
    socket.send("RUN " + token);
  };

  socket.onmessage = function(event) {
    var text = event.data;
    text = text.replace(/\n/g, "<br>");
    $("#termout").append(text);
  };
}
