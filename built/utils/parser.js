"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var pdfparse = require("pdf-parse");
var config_1 = require("../envrironments/config");
var DbManager = require("./firebaseManager");
function parsing(pdffile, file) {
    pdfparse(pdffile).then(function (data) {
        var filetxt = data.text;
        var SplittedTxt = filetxt.split("\n");
        Object.keys(SplittedTxt).forEach(function (key) {
            var _a;
            var hi = SplittedTxt[key].split(",").toString();
            var arr = [];
            if (SplittedTxt[key].match("(.*?)\s*=\s*([^\s]+)")) {
                arr.push(hi.split("="));
                var keyData = arr[0][0];
                var valueData = arr[0][1].split(",")[0];
                var ObjectToDB = (_a = {}, _a[keyData] = valueData, _a);
                console.log(ObjectToDB);
                DbManager.DBinsertDocs(config_1.config.collectionName, key, ObjectToDB);
            }
            else {
                return;
            }
        });
    });
}
exports.parsing = parsing;
function getFilesAndParse() {
    try {
        fs.readdirSync(config_1.config.testFolder).forEach(function (file) {
            var pdffile = fs.readFileSync(config_1.config.testFolder + '/' + file);
            var filename = path.basename(file);
            DbManager.BucketInsert(config_1.config.testFolder, file);
            console.log(filename);
            parsing(pdffile, file);
        });
    }
    catch (err) {
        throw err;
    }
}
exports.getFilesAndParse = getFilesAndParse;
