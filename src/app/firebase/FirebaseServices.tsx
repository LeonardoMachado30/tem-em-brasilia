import { IChildren } from "@/model/EmployerModel";
import { FirebaseAppProvider } from "reactfire";
import { FirebaseSDKProviders } from "./FirebaseSDKProviders";
import serviceAccount from "./serviceAccountKey.json";

const FirebaseServices = ({ children }: IChildren) => {
  return (
    <FirebaseAppProvider firebaseConfig={serviceAccount}>
      <FirebaseSDKProviders>{children}</FirebaseSDKProviders>
    </FirebaseAppProvider>
  );
};

export { FirebaseServices };
