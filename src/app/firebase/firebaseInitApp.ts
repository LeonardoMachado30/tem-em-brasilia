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
    isTokenAutoRefreshEnabled: true
});
self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.APP_CHECK_DEBUG_TOKEN_FROM_CI;

export { firebaseApp, auth, googleProvider, firestore, storageInit }