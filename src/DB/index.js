// Import the functions you need from the SDKs you need
import  firebase from "firebase";
import  "firebase/firebase-firestore"
import "firebase/firebase-auth"
import "firebase/firebase-database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = {
    apiKey: "AIzaSyBigYMy43p-uRw1F_rwl3xWKPZ7G5waRBE",
    authDomain: "test-1d49c.firebaseapp.com",
    databaseURL: "https://test-1d49c.firebaseio.com",
    projectId: "test-1d49c",
    storageBucket: "test-1d49c.appspot.com",
    messagingSenderId: "120572726744",
    appId: "1:120572726744:web:987b4e635597e44acbf6ad",
    measurementId: "G-MR09QB2B3F"
  };

// Initialize Firebase
firebase.initializeApp(app)


let db = {
    fs: firebase.firestore(),
    auth: firebase.auth(),
    rt: firebase.database()
}

export default db