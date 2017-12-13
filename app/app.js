// {app}            Module to control application life.
// {BrowserWindow}  Module to create native browser window.
const { app, BrowserWindow } = require("electron");

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
