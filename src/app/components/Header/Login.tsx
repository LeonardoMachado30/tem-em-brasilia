import Image from "next/image";
import { auth } from "@/app/firebase/firebaseInitApp";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useSigninCheck, useUser } from "reactfire";
import icon_google from "$/img/icons/google.png";
export function Login() {
  const { data: signInCheckResult } = useSigninCheck();
  const { status, data: user } = useUser();

  const loginWhitGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
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
    return <span>loading...</span>;
  }

  return signInCheckResult?.signedIn ? (
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
      className="flex items-center bg-white px-4 py-2 text-black hover:text-[#339B5B] font-bold transform transition duration-200"
      onClick={loginWhitGoogle}
    >
      <Image src={icon_google} alt="Logo google" width={40} height={40} />
      Continuar com google
    </button>
  );
}
