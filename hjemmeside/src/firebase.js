import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA0eciDgIAtoDpUY3pM2HYoLZ16a6fajI0",
    authDomain: "hjemmeside-1a0ad.firebaseapp.com",
    databaseURL: "https://hjemmeside-1a0ad.firebaseio.com",
    projectId: "hjemmeside-1a0ad",
    storageBucket: "hjemmeside-1a0ad.appspot.com",
    messagingSenderId: "61899404916",
    appId: "1:61899404916:web:8515944fc08d3369620321"
};


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();
