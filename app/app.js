const { app, BrowserWindow } = require("electron");
const files = require("./files.js");
const code = require("./code.js");

var mainWindow = null;

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 815,
    minWidth: 500,
    minHeight: 200,
    acceptFirstMouse: true,
    titleBarStyle: "hidden",
    frame: false
  });

  mainWindow.loadURL("file://" + __dirname + "/../public/index.html");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});

// Exposed to the view layer
module.exports = {
  runPython: code.runPython,
  runProcessForToken: code.runProcessForToken,
  getFile: files.getFile,
  getFileStats: files.getFileStats,
  saveFile: files.saveFile,
  listDirectory: files.listDirectory
};
