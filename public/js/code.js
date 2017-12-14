export function run(path) {
  $.get("http://localhost:3000/run?path=" + path, function(data) {
    var socket = new WebSocket("ws://localhost:8001");
    socket.onopen = function(event) {
      socket.send("RUN " + data.token);
    };

    socket.onmessage = function(event) {
      var text = event.data;
      text = text.replace(/\n/g, "<br>");
      $("#termout").append(text);
    };
  });
}
