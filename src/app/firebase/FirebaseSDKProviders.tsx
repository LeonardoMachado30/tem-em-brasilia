"use client";
import { AuthProvider, FirestoreProvider, StorageProvider } from "reactfire";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { getStorage } from "firebase/storage";
import { IChildren } from "@/model/EmployerModel";
import { firestore, firebaseApp } from "./firebaseInitApp";
import { GoogleOAuthProvider } from "@react-oauth/google";

const FirebaseSDKProviders = ({ children }: IChildren) => {
  const auth = getAuth(firebaseApp);
  const starageInstance = getStorage(firebaseApp);

  return (
    <FirestoreProvider sdk={firestore}>
      <StorageProvider sdk={starageInstance}>
        <GoogleOAuthProvider clientId="260974977064-fcs596908nd2cjv1k839tpjb5rbdj516.apps.googleusercontent.com">
          <AuthProvider sdk={auth}>{children}</AuthProvider>
        </GoogleOAuthProvider>
      </StorageProvider>
    </FirestoreProvider>
  );
};

export { FirebaseSDKProviders };
