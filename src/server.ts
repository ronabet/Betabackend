import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as cors from "cors";
import * as Busboy from "busboy";
import * as path from "path";
import * as fs from "fs";
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import * as pdfparse from 'pdf-parse';
import * as PdfReader from 'pdfreader';



const service = require("../fireconfig.json");
const port = 3000;
const testFolder = '../uploads';



export class Server {
    
    public app: express.Application;
    private server: http.Server;
    public static bootstrap(): Server {
        return new Server();
    }

    public constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.server = http.createServer(this.app);
        this.app.use(cors());
        this.server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        admin.initializeApp({
            credential: admin.credential.cert(service),
            databaseURL: "https://beta-56978.firebaseio.com"
          });

        const db = admin.firestore();
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


        //Upload files request 'POST'
        this.app.post('/upload', function(req, res) {
                const busboy = Busboy({ headers: req.headers });
                busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
                    const saveTo = path.join((path.join(__dirname, "/../uploads/" + filename)));
                    file.pipe(fs.createWriteStream(saveTo));
                });
                busboy.on("finish", function () {
                    res.status(200).json({ "message": "File uploaded successfully." });
                });
                req.pipe(busboy);
          });

          
          this.app.get('/insrtDB', function (req, res) {
            console.log("HTTP Get Request");
            let data = {
                name: 'Los Angeles',
                state: 'CA',
                country: 'USA'
              };
              let setDoc = db.collection('todo').doc('PDF').set(data);
              res.send("kk");
              
        });


        function parsingPDF(){
        fs.readdirSync(testFolder).forEach(file => {
           let pdffile = fs.readFileSync(testFolder + '/' + file);
            pdfparse(pdffile).then(function(data){
                console.log(data.numpages);
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
                        let setDoc = db.collection('parsed').doc('doc' + key).set(ObjectToDB);
                        console.log("inserted");
                    }      
                  });
                })
            });
        }
        parsingPDF();

        

     

       

       
    
    }
    public close() {
        this.server.close();
    }
}

const server : Server = new Server();
