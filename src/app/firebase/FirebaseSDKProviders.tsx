"use client";
import { getFirestore } from "firebase/firestore";
import {
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { getDatabase } from "firebase/database"; // Firebase v9+
import { IChildren } from "@/model/EmployerModel";
import { GoogleOAuthProvider } from "@react-oauth/google";

const FirebaseSDKProviders = ({ children }: IChildren) => {
  const app = useFirebaseApp();
  const database = getDatabase(app);
  const auth = getAuth(app);
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AuthProvider sdk={auth}>
        {/* <GoogleOAuthProvider clientId="260974977064-fcs596908nd2cjv1k839tpjb5rbdj516.apps.googleusercontent.com"> */}
        <DatabaseProvider sdk={database}>{children}</DatabaseProvider>
        {/* </GoogleOAuthProvider> */}
      </AuthProvider>
    </FirestoreProvider>
  );
};

export { FirebaseSDKProviders };
