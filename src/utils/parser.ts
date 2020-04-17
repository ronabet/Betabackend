import * as path from "path";
import * as fs from "fs";
import * as pdfparse from 'pdf-parse';
import { config } from '../envrironments/config';
import * as DbManager from './firebaseManager';


export function parsing (pdffile, file) {
    pdfparse(pdffile).then(function(data){
        let filetxt = data.text;
        let SplittedTxt = filetxt.split("\n");
        Object.keys(SplittedTxt).forEach(function(key) {
            var hi = SplittedTxt[key].split(",").toString();
            let arr = [];
            if(SplittedTxt[key].match("(.*?)\s*=\s*([^\s]+)")){
                arr.push(hi.split("="));
                var keyData = arr[0][0];
                var valueData = arr[0][1].split(",")[0];
                var ObjectToDB = {[keyData]: valueData};
                console.log(ObjectToDB);
                DbManager.DBinsertDocs(config.collectionName, key, ObjectToDB);
            }
            else{
                console.log("Can`t parsing the file: " + file);
                return;
            }      
        });
    })
}

export function getFilesAndParse(){         
    fs.readdirSync(config.testFolder).forEach(file => {
    var pdffile = fs.readFileSync(config.testFolder + '/' + file);
    var filename = path.basename(file);
    DbManager.BucketInsert(config.testFolder, file);
    console.log(filename);
    parsing (pdffile, file);
    }); 
}