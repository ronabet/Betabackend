import * as path from "path";
import * as fs from "fs";
import * as pdfparse from 'pdf-parse';
import { config } from '../envrironments/config';
import * as DbManager from '../utils/firebaseManager';
var canParse = 0;

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
                canParse++;
                DbManager.DBinsertDocs(config.collectionName, key, ObjectToDB);
            }     
        });
    })
    if(canParse == 0){
        console.log("Can`t parse the file " + file);
        console.log(canParse);
    }
}

export function getFilesAndParse(){ 
    try {    
        fs.readdirSync(config.testFolder).forEach(file => {
        var pdffile = fs.readFileSync(config.testFolder + '/' + file);
        DbManager.BucketInsert(config.testFolder, file);
        parsing (pdffile, file);
        }); 
    }
    catch(err){
        throw err;
    }
}