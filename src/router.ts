import { Router } from "express";
import { UploadController } from './utils/uploadController';

const AppRouter: Router = Router();

AppRouter.post("/upload", UploadController.uploadFiles);
AppRouter.get("/insertDB", UploadController.insertFiles);

export { AppRouter };