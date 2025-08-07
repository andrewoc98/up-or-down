// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCUFU3nq4PovXSsMZraP6f9Tjkh5neTd0s",
    authDomain: "wheelie-up-or-down.firebaseapp.com",
    databaseURL: "https://wheelie-up-or-down-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wheelie-up-or-down",
    storageBucket: "wheelie-up-or-down.appspot.com",
    messagingSenderId: "786457310253",
    appId: "1:786457310253:web:d3fdbf8f8a42339e1434a4",
    measurementId: "G-3PS8DSP9EE"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // <-- Realtime DB

export { db };