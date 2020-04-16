"use strict";
exports.__esModule = true;
var firebaseAdmin = require("firebase-admin");
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
var serviceAccount = require("path/to/serviceAccountKey.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://beta-project-d6b71.firebaseio.com"
});
