"use client";
import { ButtonPrimary } from "@/components/Buttons/ButtonPrimary";
import { useContext, useState } from "react";
import { Input } from "@/components/Buttons/Input";
import { ButtonClose } from "@/components/Buttons/ButtonClose";
import { AlertContext } from "@/app/lib/context/alertContexct";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { serviceAccount } from "@/app/firebase/config";
import { Employer } from "@/model/EmployerModel";

type ModalAddProp = {
  handleClose: () => void;
};

async function handleAdd(data: Employer, alert: any): Promise<void> {
  const app = initializeApp(serviceAccount);
  const firestore = getFirestore(app);
  const docRef = collection(firestore, "employers");

  if (data.name !== "" && data.email !== "" && data.adress !== "") {
    return await addDoc(docRef, data)
      .then(() => {
        alert?.setAlert({
          message: "Documento adicionado com sucesso",
          type: "sucess",
        });
      })
      .catch((error) => {
        alert?.setAlert({
          message: `Error: ${error}`,
          type: "error",
        });
      });
  }
}

function ModalAdd({ handleClose }: ModalAddProp) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const alert = useContext(AlertContext);

  async function handle(e: any): Promise<void> {
    e.preventDefault();

    await handleAdd(
      {
        name: name,
        email: email,
        adress: adress,
      },
      alert
    );

    handleClose();
  }

  return (
    <form
      onSubmit={handle}
      className="flex items-center justify-center fixed backdrop-blur-sm w-full h-screen top-0 left-0 z-20"
    >
      <div className="flex flex-col items-center justify-center relative bg-white rounded max-w-[400px] mx-auto p-4 shadow">
        <div className="self-end">
          <ButtonClose handleClose={handleClose} />
        </div>

        <div className="flex flex-col items-end gap-6 w-72">
          <Input
            title="Nome"
            change={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            title="Email"
            change={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            title="Enderço"
            change={(e) => {
              setAdress(e.target.value);
            }}
          />
          <ButtonPrimary type="submit">Adicionar</ButtonPrimary>
        </div>
      </div>
    </form>
  );
}

export { ModalAdd };
