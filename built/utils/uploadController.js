"use strict";
exports.__esModule = true;
var parser = require("./parser");
var Busboy = require("busboy");
var path = require("path");
var fs = require("fs");
var UploadController = /** @class */ (function () {
    function UploadController() {
    }
    UploadController.uploadFiles = function (req, res) {
        var busboy = Busboy({ headers: req.headers });
        busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
            var saveTo = path.join((path.join(__dirname, "/../uploads/" + filename)));
            file.pipe(fs.createWriteStream(saveTo));
        });
        busboy.on("finish", function () {
            console.log("file inserted");
            res.status(200).json({ "message": "File uploaded successfully." });
        });
        req.pipe(busboy);
    };
    UploadController.insertFiles = function (req, res) {
        parser.getFilesAndParse();
        res.send("files inserted to DB!");
    };
    return UploadController;
}());
exports.UploadController = UploadController;
