// {app}            Module to control application life.
// {BrowserWindow}  Module to create native browser window.
const { app, BrowserWindow } = require("electron");
const express = require("express");
const expressApp = express();
const bodyParser = require("body-parser");
const files = require("./files.js");
const code = require("./code.js");

/**
 * REST and Run server
 */
expressApp.listen(3000, function() {
  console.log("server running on port 3000");
});

expressApp.use(express.static("public"));
expressApp.use(bodyParser.json());

expressApp.get("/run", code.runPython);
expressApp.get("/dir", files.listDirectory);
expressApp.post("/file", files.saveFile);
expressApp.get("/file", files.getFile);

var server = code.createRunServer().listen(8001);

/**
 * Electron
 */
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
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 200,
    acceptFirstMouse: true,
    titleBarStyle: "hidden",
    frame: false
  });

  mainWindow.loadURL("file://" + __dirname + "/../public/index.html");

  mainWindow.openDevTools();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});
