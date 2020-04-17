"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var cors = require("cors");
var router_1 = require("./router");
var config_1 = require("./envrironments/config");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.app.use(cors());
        this.app.use(router_1.AppRouter);
        this.server.listen(config_1.config.port, function () {
            console.log("Server running on port " + config_1.config.port);
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
