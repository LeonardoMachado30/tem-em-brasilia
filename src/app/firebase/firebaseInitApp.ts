import { initializeApp } from "firebase/app";
import { Auth, GoogleAuthProvider, getAuth } from "firebase/auth";
import serviceAccount from "./serviceAccountKey.json";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp(serviceAccount);
const auth: Auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storageInit = getStorage(firebaseApp);

export { firebaseApp, auth, googleProvider, firestore, storageInit }