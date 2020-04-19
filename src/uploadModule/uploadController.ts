import { Request, Response } from "express";
import * as parser from '../parserModule/parser';
import * as Busboy from "busboy";
import * as path from "path";
import * as fs from "fs";

export class UploadController {

    static uploadFiles(req: Request, res: Response) {
        const busboy = Busboy({ headers: req.headers });
        busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
            const saveTo = path.join((path.join(__dirname, "/../uploads/" + filename)));
            file.pipe(fs.createWriteStream(saveTo));
        });
        busboy.on("finish", function () {
            console.log("file inserted");
            res.status(200).json({ "message": "File uploaded successfully." });
        });
        req.pipe(busboy);
    }

    static insertFiles (req: Request, res: Response) {
        parser.getFilesAndParse();
        res.send("files inserted to DB!")
    }
}
  