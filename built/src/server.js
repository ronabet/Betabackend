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
var port = 3000;
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.server = http.createServer(this.app);
        this.app.use(cors());
        //Connect to Firebase DB
        var firebaseConfig = {
            apiKey: "AIzaSyDEEugydmMNqih5BbWa4mEBmcfUzvmxRyA",
            authDomain: "beta-project-d6b71.firebaseapp.com",
            databaseURL: "https://beta-project-d6b71.firebaseio.com",
            projectId: "beta-project-d6b71",
            storageBucket: "beta-project-d6b71.appspot.com",
            messagingSenderId: "283971073785",
            appId: "1:283971073785:web:638df3a130d2084dd91428",
            measurementId: "G-KN2QMC1DD9"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.server.listen(port, function () {
            console.log("Server running on port " + port);
        });
        //Upload files request 'POST'
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
        this.app.get('/h', function (req, res) {
            console.log("HTTP Get Request");
            var userReference = firebase.database().ref("parsed");
            //Attach an asynchronous callback to read the data
            userReference.on("value", function (snapshot) {
                console.log(snapshot.val());
                res.json(snapshot.val());
                userReference.off("value");
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                res.send("The read failed: " + errorObject.code);
            });
        });
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
