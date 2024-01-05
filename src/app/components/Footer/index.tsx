import Image from "next/image";
import logo from "$/img/logo_alternative.png";

function Footer() {
  return (
    <footer className="bg-[#339B5B]">
      <div className="max-w-[1120px] mx-auto flex flex-col items-center justify-between px-2 py-6">
        <nav className="flex justify-between items-center w-full">
          <a href="/">
            <Image
              src={logo}
              alt="Logo tem em brasilia"
              width={300}
              height={60}
            />
          </a>
          <ul className="flex flex-col justify-center items-center gap-1 text-white">
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
        <p className="text-sm text-white">
          Todos os direitos reservados à @TemEmBrasilia
        </p>
      </div>
    </footer>
  );
}

export { Footer };
