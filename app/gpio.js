var net = require("net");

/**
 * Creates a promise that executes the code after a given time
 * @param {*Int} time in millisec
 */
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * Connects to GPIO debug socket. If it fails to connect it will retry indefinitely in 2 secs intervals
 * @param {*Function} callback when data is received from socket
 */
function connectToDebugSocket(callback) {
  var client = new net.Socket();

  sleep(2000).then(() => {
    client.connect(3001, "localhost", function() {
      console.log("Connected to debug socket!");
    });

    client.on("data", data => callback(String(data)));

    client.on("error", err => connectToDebugSocket(callback));
  });
}

module.exports = { connectToDebugSocket };
