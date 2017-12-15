const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const files = require("./files.js");
const code = require("./code.js");

app.listen(3000, function() {
  console.log("server running on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/run", code.runPython);
app.get("/dir", files.listDirectory);
app.post("/file", files.saveFile);
app.get("/file", files.getFile);

var server = code.createRunServer().listen(8001);
