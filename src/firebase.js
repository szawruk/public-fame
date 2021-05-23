import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyBEtsBQZBU2Gni-vD7CclXUa71CnXzcB6I",
    authDomain: "publicfame-6e82f.firebaseapp.com",
    databaseURL: "https://publicfame-6e82f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "publicfame-6e82f",
    storageBucket: "publicfame-6e82f.appspot.com",
    messagingSenderId: "800594567101",
    appId: "1:800594567101:web:d8728a4ef47d8425f17cd4",
    measurementId: "G-XYPJ3M4ZYK"
};
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}