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
const storage = firebase.storage();

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const reactionsCollection = db.collection('reactions')
const followsCollection = db.collection('follows')

const uploadImage = (imageURI) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child('image').child('imageName');
        encodeImageUri(imageURI, function (image64) {
            imageRef.putString(image64, 'data_url')
                .then(snapshot => {
                    resolve(snapshot.downloadURL)
                }, err => {
                    reject(err);
                })
        })
    })
}

const uploadAvatar = (imageURI) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref();
        let imageRef = storageRef.child('Users').child(auth.currentUser.uid + '.jpg');
        encodeImageUri(imageURI, function (image64) {
            imageRef.putString(image64, 'data_url')
                .then(snapshot => {
                    resolve(snapshot.downloadURL)
                }, err => {
                    reject(err);
                })
        })
    })
}

const encodeImageUri = (imageUri, callback) => {
    let c = document.createElement('canvas');
    let ctx = c.getContext("2d");
    let img = new Image();
    img.onload = function () {
        let aux = this;
        c.width = aux.width;
        c.height = aux.height;
        ctx.drawImage(img, 0, 0);
        let dataURL = c.toDataURL("image/jpeg");
        callback(dataURL);
    };
    img.src = imageUri;
};

export {
    db,
    auth,
    storage,
    uploadImage,
    uploadAvatar,
    usersCollection,
    postsCollection,
    commentsCollection,
    reactionsCollection,
    followsCollection
}