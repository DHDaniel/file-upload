
const express = require("express");
const bodyParser = require("body-parser");
var app = express();

/* Config */

app.use(express.static(__dirname + "/views"));
app.use(bodyParser());
app.set("port", process.env.PORT || 8080);



/* Routing */

// when selecting the file
app.get("/", function (req, res) {
  res.render("index", {});
});

// processing file and sending response
app.post("/upload", function (req, res) {
  console.log(req.files);
  res.end("Ended");
});

app.listen(app.get("port"), function () {
  console.log("Listening on port", app.get("port"));
});
