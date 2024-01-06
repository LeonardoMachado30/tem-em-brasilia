"use client";
import Image from "next/image";
import logo from "$/img/logo_alternative.png";
import Link from "next/link";
import { Login } from "./Login";
import { FirebaseServices } from "@/app/firebase/FirebaseServices";

function Header() {
  return (
    <header className="fixed top-0 h-[60px] w-full z-10 bg-[#339B5B]">
      <nav className="flex justify-around items-center mx-auto max-w-[1420px] h-full">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo tem em brasilia"
            width={200}
            height={60}
          />
        </Link>
        <ul className="text-white flex justify-center items-center gap-4 ">
          <li>
            <Link href="/cadastrar-empresa0" className="hover:text-[#C7C900]">
              Cadastrar empresa
            </Link>
          </li>
          <li>
            <Link href="/sobre-nos" className="hover:text-[#C7C900]">
              Sobre nos
            </Link>
          </li>
          <li>
            <Link href="/contatos" className="hover:text-[#C7C900]">
              Contatos
            </Link>
          </li>
          <li>
            <FirebaseServices>
              <Login />
            </FirebaseServices>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Header };
