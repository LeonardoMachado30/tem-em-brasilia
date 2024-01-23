"use client";
import { getFirestore } from "firebase/firestore";
import { AuthProvider, FirestoreProvider } from "reactfire";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { IChildren } from "@/model/EmployerModel";
import { firebaseApp } from "./firebaseInitApp";

const FirebaseSDKProviders = ({ children }: IChildren) => {
  const auth = getAuth(firebaseApp);
  const firestoreInstance = getFirestore(firebaseApp);

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>
    </FirestoreProvider>
  );
};

export { FirebaseSDKProviders };
