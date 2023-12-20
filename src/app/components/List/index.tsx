"use client";
import { useFirestoreCollectionData } from "reactfire";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore } from "reactfire";
import { useState } from "react";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import Image from "next/image";
import logo_dvx from "$/img/logo-dvx.png";
import { ModalDelete } from "../Modal/ModalDelete";
import { ButtonClose } from "../Buttons/ButtonClose";
import { ModalAdd } from "@/components/Modal/ModalAdd";
import { FirebaseServices } from "@/app/firebase/config";

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
        <div
          key={employers.id}
          className="flex flex-col relative rounded-xl min-h-[160px] max-w-[300px] w-full shadow-xl"
        >
          <div className="w-5 self-end absolute top-4 right-4">
            <ButtonClose handleClose={() => handleClose(employers)} />
          </div>

          <Image
            src={logo_dvx}
            alt="Logo dvx"
            width={0}
            height={0}
            className="!w-full max-h-[200px] rounded-xl bg-cover"
          />

          <div className="w-full text-center uppercase p-4">
            <p>{employers.name}</p>
            {/* <p>{email}</p>
        <p>{adress}</p> */}
          </div>
        </div>
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
        <ButtonPrimary onClick={() => setModalAdd(!modalAdd)}>
          Adicionar
        </ButtonPrimary>

        <div className="relative flex flex-wrap justify-center gap-8 mx-auto p-4 w-full">
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
