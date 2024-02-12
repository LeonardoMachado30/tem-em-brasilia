import { initializeApp } from "firebase/app";
import { Auth, GoogleAuthProvider, getAuth } from "firebase/auth";
import serviceAccount from "./serviceAccountKey.json";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseApp = initializeApp(serviceAccount);
const auth: Auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storageInit = getStorage(firebaseApp);

const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider('6Lc5BWUpAAAAAMXSow9T8oPwxcRQfjoONMXlUbG5'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});

export { firebaseApp, auth, googleProvider, firestore, storageInit }