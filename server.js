var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();
var serveIndex = require('serve-index')
var index = serveIndex('./images', {'icons': true})



var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("phonesync", 3); //Field name and max count

app.use('/api',bodyParser.json());

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

app.use('/',express.static('./images'))
app.get('/',index);
app.use('/upload', express.static('./www'));

app.listen(3000, function (a) {
    console.log("Listening to port 3000");
});