// components/Auth.tsx
import React, { useEffect, ReactNode, useContext } from "react";
import { useSigninCheck } from "reactfire";
import "firebase/auth";
import { auth, googleProvider } from "@/app/firebase/firebaseInitApp";
import { signInWithPopup } from "firebase/auth";

interface AuthProps {
  children: ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const { data: signInCheckResult } = useSigninCheck();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (signInCheckResult?.data?.signedIn) {
    return (
      <div>
        {React.cloneElement(children as React.ReactElement, {
          signInWithGoogle,
          signOut,
        })}
      </div>
    );
  } else {
    return <p>Por favor, faça login</p>;
  }
};

export default Auth;
