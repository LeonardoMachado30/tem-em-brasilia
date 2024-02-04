"use client";
import Image from "next/image";
import logo from "$/img/logo_alternative.png";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#006728]">
      <div className="max-w-[1120px] mx-auto flex flex-col items-center justify-between px-2 py-6">
        <nav className="flex justify-between items-center w-full">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo tem em brasilia"
              width={300}
              height={60}
            />
          </Link>
          <ul className="flex flex-col justify-center gap-1 text-white">
            <li>
              <Link href="/register" className="hover:text-[#C7C900]">
                Cadastrar empresa
              </Link>
            </li>
            <li>
              <Link href="sobre-nos" className="hover:text-[#C7C900]">
                Sobre nos
              </Link>
            </li>
            <li>
              <Link href="contatos" className="hover:text-[#C7C900]">
                Contatos
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-white">
          Todos os direitos reservados à @TemEmBrasilia
        </p>
      </div>
    </footer>
  );
}

export { Footer };
