"use client";
import { getFirestore } from "firebase/firestore";
import serviceAccount from "./serviceAccountKey.json";
import {
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import { ReactNode } from "react";

export { serviceAccount };

const FirebaseSDKProviders = ({ children }: any) => {
  const app = useFirebaseApp();
  const firestore = getFirestore(app);

  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>;
};

const FirebaseServices = ({ children }: { children: ReactNode }) => {
  return (
    <FirebaseAppProvider firebaseConfig={serviceAccount}>
      <FirebaseSDKProviders>{children}</FirebaseSDKProviders>
    </FirebaseAppProvider>
  );
};

export { FirebaseServices, FirebaseSDKProviders };
