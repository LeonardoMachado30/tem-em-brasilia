import { initializeApp } from "firebase/app";
import { Auth, GoogleAuthProvider, getAuth } from "firebase/auth";
import serviceAccount from "./serviceAccountKey.json";

const firebaseApp = initializeApp(serviceAccount);
const auth: Auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { firebaseApp, auth, googleProvider }