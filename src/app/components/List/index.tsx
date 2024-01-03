"use client";
import Image from "next/image";
import { useFirestoreCollectionData } from "reactfire";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { useState } from "react";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import logo_dvx from "$/img/logo-dvx.png";
import { ModalDelete } from "../Modal/ModalDelete";
import { ButtonClose } from "../Buttons/ButtonClose";
import { ModalAdd } from "@/components/Modal/ModalAdd";
import { FirebaseServices } from "@/app/firebase/FirebaseServices";
import icon_instagram from "$/img/icons/instagram.png";
import icon_facebook from "$/img/icons/facebook.png";
import icon_linkedin from "$/img/icons/linkedin.png";
import icon_youtube from "$/img/icons/youtube.png";

function Card({ handleClose }: { handleClose: (data: any) => void }) {
  const firestore = useFirestore();
  const employersCollection = collection(firestore, "employers");
  const employersQuery = query(employersCollection, orderBy("name", "desc"));
  const { status, data: data } = useFirestoreCollectionData(employersQuery, {
    idField: "id",
  });

  if (status === "loading") {
    return <p>carregando...</p>;
  }

  return (
    <>
      {data.map((employers, index) => (
        <a
          href="#"
          key={employers.id}
          className="flex flex-col relative rounded h-[322px] max-w-[450px] w-full shadow bg-white"
        >
          {/* <div className="w-5 self-end absolute top-4 right-4">
            <ButtonClose handleClose={() => handleClose(employers)} />
          </div> */}
          <Image
            src={logo_dvx}
            alt="Logo dvx"
            width={460}
            height={244}
            style={{ maxHeight: "244px" }}
            className="w-full rounded rounded-b-none absolute top-0 left-0"
          />

          <div className="flex-col gap-2 w-full p-2 z-10 bg-white">
            <div className="flex w-full gap-2">
              <div className="max-w-[134px] w-full relative">
                <Image
                  src={logo_dvx}
                  alt="Profile"
                  width={134}
                  height={134}
                  className="rounded-full border-4 border-white absolute bottom-0"
                />
              </div>

              <div className="flex flex-col">
                <span
                  className="text-lg font-bold overflow-hidden whitespace-nowrap w-[250px]"
                  title={employers.name}
                >
                  {employers.name}
                </span>
                <span className="text-[#339B5B] font-semibold">
                  Restaurante
                </span>
                <p className="font-semibold py-4">Q 25 C 15 Gama Leste</p>
              </div>
            </div>

            <div className="flex w-full justify-around">
              <button className="bg-[#2FAE1F] px-6 py-2 text-bold">
                (61) 9 8109-5126
              </button>
              <div className="flex gap-3">
                <button>
                  <Image src={icon_instagram} alt="" width={36} height={36} />
                </button>
                <button>
                  <Image src={icon_facebook} alt="" width={36} height={36} />
                </button>
                <button>
                  <Image src={icon_linkedin} alt="" width={36} height={36} />
                </button>
                <button>
                  <Image src={icon_youtube} alt="" width={36} height={36} />
                </button>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}

function List() {
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState(false);
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

      <div className="flex flex-col gap-10 w-full">
        {/* <ButtonPrimary onClick={() => setModalAdd(!modalAdd)}>
          Adicionar
        </ButtonPrimary> */}

        <div className="relative flex flex-wrap justify-center md:justify-start gap-2 mx-auto p-2 w-full max-w-[1420px]">
          <FirebaseServices>
            <Card
              handleClose={(data) => {
                setData(data);
                setModalDelete(!modalDelete);
              }}
            />
          </FirebaseServices>
        </div>
      </div>
    </>
  );
}

export { List };
