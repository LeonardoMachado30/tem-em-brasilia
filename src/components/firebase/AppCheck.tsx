import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";

import { firebaseApp } from "./firebaseInitApp";

export default initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6Lc5BWUpAAAAAMXSow9T8oPwxcRQfjoONMXlUbG5"),
  isTokenAutoRefreshEnabled: true,
});
