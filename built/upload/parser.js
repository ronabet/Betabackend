"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var pdfparse = require("pdf-parse");
var config = require("../envrironments/config");
var DbManager = require("./firebaseManager");
var testFolder = '.././uploads';
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
                DbManager.DBinsertDocs(config.config1.collectionName, key, ObjectToDB);
                // let setDoc = config.db.collection(config.config1.collectionName).doc('PDF' + key).set(ObjectToDB);
            }
            else {
                console.log("Can`t parsing the file: " + file);
                return;
            }
        });
    });
}
exports.parsing = parsing;
function parsingPDF() {
    fs.readdirSync(testFolder).forEach(function (file) {
        var pdffile = fs.readFileSync(testFolder + '/' + file);
        var filename = path.basename(file);
        // config.bucket.upload(testFolder + '/' + file);
        DbManager.BucketInsert(testFolder, file);
        console.log(filename);
        parsing(pdffile, file);
        // pdfparse(pdffile).then(function(data){
        //     let filetxt = data.text;
        //     let SplittedTxt = filetxt.split("\n");
        //     Object.keys(SplittedTxt).forEach(function(key) {
        //         var hi = SplittedTxt[key].split(",").toString();
        //         let arr = [];
        //         if(SplittedTxt[key].match("(.*?)\s*=\s*([^\s]+)")){
        //             arr.push(hi.split("="));
        //             var keyData = arr[0][0];
        //             var valueData = arr[0][1].split(",")[0];
        //             var ObjectToDB = {[keyData]: valueData};
        //             console.log(ObjectToDB);
        //             DbManager.DBinsertDocs(config.config1.collectionName, key, ObjectToDB);
        //             // let setDoc = config.db.collection(config.config1.collectionName).doc('PDF' + key).set(ObjectToDB);
        //         }
        //         else{
        //             console.log("Can`t parsing the file: " + file);
        //             return;
        //         }      
        //       });
        //     })
    });
}
exports.parsingPDF = parsingPDF;
