import Image from "next/image";
import { auth, googleProvider } from "@/app/firebase/firebaseInitApp";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useSigninCheck, useUser } from "reactfire";
import icon_google from "$/img/icons/google.png";
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleLogin } from "@react-oauth/google";

export function Login() {
  const { data: signInCheckResult } = useSigninCheck();
  const { status, data: user } = useUser();

  const loginWhitGoogle = async () => {
    try {
      console.log(auth);
      await signInWithRedirect(auth, googleProvider);
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

  if (status === "loading") {
    return <ClipLoader color="#fff" size={30} />;
  }

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
      {signInCheckResult?.signedIn ? (
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
          Continuar com google
        </button>
      )}
    </>
  );
}
