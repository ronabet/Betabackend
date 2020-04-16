"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var cors = require("cors");
var Busboy = require("busboy");
var path = require("path");
var fs = require("fs");
var firebase = require("firebase");
var admin = require("firebase-admin");
var pdfparse = require("pdf-parse");
var flag;
var service = require("../fireconfig.json");
var port = 3000;
var testFolder = '../uploads';
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.server = http.createServer(this.app);
        this.app.use(cors());
        this.server.listen(port, function () {
            console.log("Server running on port " + port);
        });
        admin.initializeApp({
            credential: admin.credential.cert(service),
            databaseURL: "https://beta-56978.firebaseio.com",
            storageBucket: "gs://beta-56978.appspot.com/"
        });
        var db = admin.firestore();
        var firebaseConfig = {
            apiKey: "AIzaSyC7ruWcxShnzukFlMp1NgS7FfSk4fchjdE",
            authDomain: "beta-56978.firebaseapp.com",
            databaseURL: "https://beta-56978.firebaseio.com",
            projectId: "beta-56978",
            storageBucket: "beta-56978.appspot.com",
            messagingSenderId: "366503984038",
            appId: "1:366503984038:web:84fa35ec799c6714a12d67",
            measurementId: "G-GD1GJPBVLL"
        };
        firebase.initializeApp(firebaseConfig);
        var bucket = admin.storage().bucket();
        this.app.post('/upload', function (req, res) {
            var busboy = Busboy({ headers: req.headers });
            busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
                var saveTo = path.join((path.join(__dirname, "/../uploads/" + filename)));
                file.pipe(fs.createWriteStream(saveTo));
            });
            busboy.on("finish", function () {
                res.status(200).json({ "message": "File uploaded successfully." });
            });
            req.pipe(busboy);
        });
        this.app.get('/insertDB', function (req, res) {
            parsingPDF();
            // bucket.upload('../uploads/Sample1.pdf');
            res.send("files inserted!");
        });
        function parsingPDF() {
            fs.readdirSync(testFolder).forEach(function (file) {
                var pdffile = fs.readFileSync(testFolder + '/' + file);
                var filename = path.basename(file);
                bucket.upload(testFolder + '/' + file);
                console.log(filename);
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
                            var setDoc = db.collection('kak').doc('doc' + key).set(ObjectToDB);
                        }
                        else {
                            flag = false;
                            console.log("cant parsing the file: " + file);
                            return;
                        }
                    });
                });
            });
        }
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.close = function () {
        this.server.close();
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
