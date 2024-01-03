"use client";
import { getFirestore } from "firebase/firestore";
import serviceAccount from "./serviceAccountKey.json";
import {
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import { ReactNode } from "react";

type IProp = {
  children: ReactNode;
};

const FirebaseSDKProviders = ({ children }: IProp) => {
  const app = useFirebaseApp();
  const firestore = getFirestore(app);

  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>;
};

const FirebaseServices = ({ children }: IProp) => {
  return (
    <FirebaseAppProvider firebaseConfig={serviceAccount}>
      <FirebaseSDKProviders>{children}</FirebaseSDKProviders>
    </FirebaseAppProvider>
  );
};

export { FirebaseServices, FirebaseSDKProviders, serviceAccount };
