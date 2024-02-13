"use client";

import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";

import { firebaseApp } from "./firebaseInitApp";
if (!location.host.includes("temembrasilia")) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN =
    process.env.APP_CHECK_DEBUG_TOKEN_FROM_CI;
}

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6Lc5BWUpAAAAAMXSow9T8oPwxcRQfjoONMXlUbG5"),
  isTokenAutoRefreshEnabled: true,
});

export default appCheck;
