import {initializeApp} from "firebase/app";
import {Auth, GoogleAuthProvider, getAuth, signInAnonymously} from "firebase/auth";
import serviceAccount from "./serviceAccountKey.json";
import {getFirestore} from "firebase/firestore/lite";
import {getStorage} from "firebase/storage";

const firebaseApp = initializeApp(serviceAccount);
const auth: Auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storageInit = getStorage(firebaseApp);

signInAnonymously(auth)
    .then((data) => {
        // console.log(data?.user?.accessToken);
        // console.log(data?.user?.uid);

        console.log("Autenticado anonimamente");
    })
    .catch((error) => {
        console.error("Erro no login anônimo", error);
    });

export {firebaseApp, auth, googleProvider, firestore, storageInit}