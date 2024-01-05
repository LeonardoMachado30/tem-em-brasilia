import Image from "next/image";
import logo from "$/img/logo_alternative.png";

function Header() {
  return (
    <header className="fixed top-0 h-[60px] w-full z-10 bg-[#339B5B]">
      <nav className="flex justify-around items-center mx-auto max-w-[1420px] h-full">
        <a href="/">
          <Image
            src={logo}
            alt="Logo tem em brasilia"
            width={200}
            height={60}
          />
        </a>
        <ul className="text-white flex justify-center items-center gap-4 ">
          <li>
            <a href="/cadastrar-empresa0" className="hover:text-[#C7C900]">
              Cadastrar empresa
            </a>
          </li>
          <li>
            <a href="/sobre-nos" className="hover:text-[#C7C900]">
              Sobre nos
            </a>
          </li>
          <li>
            <a href="/contatos" className="hover:text-[#C7C900]">
              Contatos
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Header };
