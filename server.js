
/* Helpers */

// This shouldn't really go here, but it's a small app, so what's the point of creating
// another file and importing it.

// from http://scratch99.com/web-development/javascript/convert-bytes-to-mb-kb/
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};


const express = require("express");
const multer = require("multer");

// storing in memory
// by doing this, we run the risk that the memory will max out, and our app's
// performance may suffer, or even crash. However, since we are using Heroku
// and have no definite way to store files besides Amazon S3 (which only allows
// a free account up to 1 year), we will have to use this method.

var storage = multer.memoryStorage();
var upload = multer({ storage : storage});

var app = express();

/* Config */

app.use(express.static(__dirname + "/views"));
app.set("port", process.env.PORT || 8080);



/* Routing */

// when selecting the file
app.get("/", function (req, res) {
  res.render("index", {});
});

// processing file and sending response
// name in upload.single() must match the name in the form
app.post("/upload", upload.single('upload_file'), function (req, res) {
  var bytesize = req.file.size;
  var response = {
    bytes : bytesize,
    humanReadable : bytesToSize(bytesize)
  };

  res.end(JSON.stringify(response));
});

app.listen(app.get("port"), function () {
  console.log("Listening on port", app.get("port"));
});
