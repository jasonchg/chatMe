import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC52F484TdX_qDrKVM_dBuc5lHxQExB-CE",
  authDomain: "chata-79107.firebaseapp.com",
  databaseURL: "https://chata-79107.firebaseio.com",
  projectId: "chata-79107",
  storageBucket: "chata-79107.appspot.com",
  messagingSenderId: "822158800485",
  appId: "1:822158800485:web:d399b7823b34205bf7788c",
});

// create database
const db = firebaseApp.firestore();

export default db;
