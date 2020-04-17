import * as firebase from 'firebase';
import * as admin from 'firebase-admin'
const permissions = require("../../fireconfig.json");

const firebaseConfig = {
    apiKey: "AIzaSyC7ruWcxShnzukFlMp1NgS7FfSk4fchjdE",
    authDomain: "beta-56978.firebaseapp.com",
    databaseURL: "https://beta-56978.firebaseio.com",
    projectId: "beta-56978",
    storageBucket: "beta-56978.appspot.com",
    messagingSenderId: "366503984038",
    appId: "1:366503984038:web:84fa35ec799c6714a12d67",
    measurementId: "G-GD1GJPBVLL"
};


admin.initializeApp({
    credential: admin.credential.cert(permissions),
    databaseURL: "https://beta-56978.firebaseio.com",
    storageBucket: "gs://beta-56978.appspot.com/"
});

firebase.initializeApp(firebaseConfig);
const db = admin.firestore();
const bucket = admin.storage().bucket();

export function DBinsertDocs(collectionName: string, key: string, ObjectToDB: object){
    let setDoc = db.collection(collectionName).doc('PDF' + key).set(ObjectToDB);
}

export function BucketInsert(testFolder: string, file: string){
    bucket.upload(testFolder + '/' + file);
}