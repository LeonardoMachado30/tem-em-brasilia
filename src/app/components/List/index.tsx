"use client";
import { useState } from "react";
import { ModalDelete } from "../Modal/ModalDelete";
import { ModalAdd } from "@/components/Modal/ModalAdd";
// import { FirebaseServices } from "@/app/firebase/FirebaseServices";

function List() {
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [data, setData] = useState({});

  return (
    <>
      {modalAdd && <ModalAdd handleClose={() => setModalAdd(!modalAdd)} />}
      {modalDelete && (
        <ModalDelete
          handleClose={() => setModalDelete(!modalDelete)}
          props={data}
        />
      )}

      <section className="flex flex-col justify-center items-center gap-2 w-full mx-auto max-w-[1420px] my-24 ">
        {/* <ButtonPrimary onClick={() => setModalAdd(!modalAdd)}>
          Adicionar
        </ButtonPrimary> */}
        <h2 className="text-[#75AE8B]">
          Maior catalógo de empresas do Distrito Federal.
        </h2>
        <h3 className="text-[#75AE8B]">
          Anuncie sua empresa <strong>aqui</strong>.
        </h3>
        <h1 className="text-4xl font-bold text-[#006728] my-6">
          Empresas recentes
        </h1>
        <div className="relative flex flex-wrap justify-center items-center md:justify-start gap-4 mx-auto p-1 w-full">
          {/* <FirebaseServices>
            <Card />
          </FirebaseServices> */}
        </div>
      </section>
    </>
  );
}

export { List };
