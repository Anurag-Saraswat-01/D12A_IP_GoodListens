import * as firebase from 'firebase/app'
import * as firebaseAuth from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAet6gHh72xSAlXNXUHejyTZzybRwe8L4M",
    authDomain: "good-listens-2885b.firebaseapp.com",
    projectId: "good-listens-2885b",
    storageBucket: "good-listens-2885b.appspot.com",
    messagingSenderId: "41185449889",
    appId: "1:41185449889:web:ffa9d80c9b4adc8d33dde0",
    measurementId: "G-3YP60LP1M1",
};

firebase.initializeApp(firebaseConfig)

export const provider = new firebaseAuth.GoogleAuthProvider();
export const getAuth = firebaseAuth.getAuth();
export const auth = firebaseAuth
export default firebase
