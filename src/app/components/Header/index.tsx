import Image from "next/image";
import logo from "$/img/logo_alternative.png";
import { Login } from "./Login";
import Link from "next/link";
import { Bars4Icon } from "@heroicons/react/20/solid";
import { FirebaseServices } from "@/app/firebase/FirebaseServices";

const dev = process.env.NODE_ENV !== "production";

export const URL = dev
  ? "http://localhost:3000/"
  : "https://tem-em-brasilia.vercel.app/";

function Header() {
  return (
    <header className="fixed top-0 w-full z-10">
      <nav className="bg-white border-gray-200 dark:bg-[#006728]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-14 py-2">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={logo}
              alt="Logo tem em brasilia"
              width={200}
              height={60}
            />
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse" suppressHydrationWarning={true}>
            <Login />
            <button
              data-collapse="navbar-cta"
              data-toggle="collapse"
              data-target="#navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#78ce99] rounded-lg md:hidden hover:bg-[#78ce99] focus:outline-none focus:ring-2 focus:ring-[#78ce99] dark:hover:bg-[#78ce99] dark:focus:ring-[#006728]"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Bars4Icon className="h-6 w-6 text-[#78ce99] hover:text-[#006728]" />
            </button>
          </div>

          <div
            className="items-center justify-between w-full hidden md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   dark:border-gray-700">
              <li>
                <Link
                  href={"/register"}
                  className=" py-2 px-3 md:p-0 text-[#78ce99] rounded hover:bg-[#78ce99] md:hover:bg-transparent md:hover:text-[#78ce99] md:dark:hover:text-[#78ce99] dark:text-white dark:hover:bg-[#78ce99] dark:hover:text-white md:dark:hover:bg-transparent dark:border-[#78ce99]"
                >
                  Cadastrar Empresa
                </Link>
              </li>

              <li>
                <Link
                  href={"/sobre-nos"}
                  className=" py-2 px-3 md:p-0 text-[#78ce99] rounded hover:bg-[#78ce99] md:hover:bg-transparent md:hover:text-[#78ce99] md:dark:hover:text-[#78ce99] dark:text-white dark:hover:bg-[#78ce99] dark:hover:text-white md:dark:hover:bg-transparent dark:border-[#78ce99]"
                >
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  href={"/contatos"}
                  className=" py-2 px-3 md:p-0 text-[#78ce99] rounded hover:bg-[#78ce99] md:hover:bg-transparent md:hover:text-[#78ce99] md:dark:hover:text-[#78ce99] dark:text-white dark:hover:bg-[#78ce99] dark:hover:text-white md:dark:hover:bg-transparent dark:border-[#78ce99]"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { Header };
