"use client";
import Image from "next/image";
import { auth, googleProvider } from "@/app/firebase/firebaseInitApp";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { User, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import icon_google from "$/img/icons/google.png";
// import ClipLoader from "react-spinners/ClipLoader";
// import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

export function Login() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const loginWhitGoogle = async () => {
    try {
      const getAuth = await signInWithRedirect(auth, googleProvider);
      if (getAuth) setUser(getAuth);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      /> */}
      {user ? (
        <div className="flex gap-2 items-center bg-white rounded text-black hover:text-[#339B5B] px-2 py-1">
          <p className="font-bold --ellipse">Bem-vindo {user?.displayName}!</p>
          <button
            className="font-bold transform transition duration-200"
            onClick={signOut}
          >
            <ArrowRightStartOnRectangleIcon className="h-7 w-7    " />
          </button>
        </div>
      ) : (
        <button
          className="flex items-center relative px-2 text-black bg-white hover:text-[#339B5B] font-bold transform transition duration-200 rounded"
          onClick={loginWhitGoogle}
        >
          <Image src={icon_google} alt="Logo google" width={40} height={40} />
          <span className="hidden lg:block">Continuar com google</span>
        </button>
      )}
    </>
  );
}
