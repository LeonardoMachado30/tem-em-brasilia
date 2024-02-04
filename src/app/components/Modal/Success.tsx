import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useTransition } from "react";

export default function Success({ idField }: { idField?: string }) {
  const transition = useTransition();

  return transition && <div
    id="default-modal"
    className="block overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm transform opacity-100"
  >
    <div className="relative p-6 w-full max-w-2xl max-h-full mx-auto top-1/4 h-">
      <div className="relative bg-white rounded-lg shadow dark:bg-[#75AE8B]">
        <div className="relative flex items-center justify-between flex-col p-4 md:p-5 rounded-t ">
          <h3 className="text-3xl font-semibold text-white text-center w-full">
            PARABÉNS
          </h3>
          <h3 className="text-md  text-white text-center w-full">
            Empresa cadastrada com sucesso!
          </h3>
          <button
            type="button"
            className="absolute right-4 top-4 text-[#006728] bg-transparent hover:bg-gray-200 hover:text-[#006728] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-[#75AE8B] dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Fechar modal</span>
          </button>
        </div>
        <div className="md:px-16 space-y-4 text-center">
          <div className="w-full flex items-center justify-center">
            <CheckBadgeIcon className="h-32 w-32 text-white" />
          </div>

          <p className="leading-relaxed text-white w-full">
            Você acabou de cadastrar a sua empresa no Tem Em Brasília, caso
            deseje editar ou excluir acesse sua conta do google cadastrada nas
            informações da empresa
          </p>
          <p className="leading-relaxed text-white  w-full">
            Caso não saiba qual email cadastrou ou caso cadastrou um email
            errado, entre em contato{" "}
            <a href="#" className="text-sky-800">
              clicando aqui
            </a>
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 p-4 md:p-5 border-t border-[#006728] dark:border-[#75AE8B]">
          <a
            href={`/${idField}`}
            data-modal-hide="default-modal"
            type="button"
            className="text-[#006728] bg-white hover:border-white hover:text-white focus:ring-4 focus:outline-none focus:ring-[#75AE8B] font-medium rounded-md text-sm px-5 py-2.5 text-center "
          >
            VER EMPRESA
          </a>
          <a
            href="/"
            data-modal-hide="default-modal"
            type="button"
            className="text-white  bg-[#006728] hover:border-white hover:text-white focus:ring-4 focus:outline-none focus:ring-[#75AE8B] font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-[#006728] dark:hover:bg-[#006728] dark:focus:ring--[#006728]"
          >
            PAGINA INCIAL
          </a>
        </div>
      </div>
    </div>
  </div>

}
