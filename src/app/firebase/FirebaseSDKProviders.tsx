"use client";
import {
  enableIndexedDbPersistence,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";
import {
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
  SuspenseWithPerf,
  useFirebaseApp,
  useInitFirestore,
} from "reactfire";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { getDatabase } from "firebase/database"; // Firebase v9+
import { IChildren } from "@/model/EmployerModel";

const FirebaseSDKProviders = ({ children }: IChildren) => {
  const app = useFirebaseApp();
  const database = getDatabase(app);
  const auth = getAuth(app);
  const firestoreInstance = getFirestore(useFirebaseApp());

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AuthProvider sdk={auth}>
        <DatabaseProvider sdk={database}>{children}</DatabaseProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
};

function FirestoreWrapper({ children }: IChildren) {
  const { data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    // await enableIndexedDbPersistence(db);
    return db;
  });

  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
}

const FirestoreInit = ({ children }: IChildren) => {
  return (
    <SuspenseWithPerf
      fallback={<p>loading...</p>}
      traceId="firestore-demo-root"
    >
      <FirestoreWrapper>{children}</FirestoreWrapper>
    </SuspenseWithPerf>
  );
};

export { FirestoreInit, FirebaseSDKProviders };
