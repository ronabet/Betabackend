"use strict";
exports.__esModule = true;
var express_1 = require("express");
var uploadController_1 = require("./utils/uploadController");
var AppRouter = express_1.Router();
exports.AppRouter = AppRouter;
AppRouter.post("/upload", uploadController_1.UploadController.uploadFiles);
AppRouter.get("/insertDB", uploadController_1.UploadController.insertFiles);
