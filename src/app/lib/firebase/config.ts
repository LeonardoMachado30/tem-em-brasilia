// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsDs6UCyVbqkllv51mBGQ5TjZmdYp3MX4",
    authDomain: "tem-em-brasilia.firebaseapp.com",
    databaseURL: "https://tem-em-brasilia-default-rtdb.firebaseio.com",
    projectId: "tem-em-brasilia",
    storageBucket: "tem-em-brasilia.appspot.com",
    messagingSenderId: "260974977064",
    appId: "1:260974977064:web:d455eb692cc850b4a6d51d",
    measurementId: "G-758T3SG2V8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)