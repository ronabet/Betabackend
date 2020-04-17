"use strict";
exports.__esModule = true;
var firebase = require("firebase");
var admin = require("firebase-admin");
var permissions = require("../../fireconfig.json");
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
admin.initializeApp({
    credential: admin.credential.cert(permissions),
    databaseURL: "https://beta-56978.firebaseio.com",
    storageBucket: "gs://beta-56978.appspot.com/"
});
firebase.initializeApp(firebaseConfig);
var db = admin.firestore();
var bucket = admin.storage().bucket();
function DBinsertDocs(collectionName, key, ObjectToDB) {
    var setDoc = db.collection(collectionName).doc('PDF' + key).set(ObjectToDB);
}
exports.DBinsertDocs = DBinsertDocs;
function BucketInsert(testFolder, file) {
    bucket.upload(testFolder + '/' + file);
}
exports.BucketInsert = BucketInsert;
