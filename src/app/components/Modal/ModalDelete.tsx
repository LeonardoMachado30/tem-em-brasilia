import { ButtonPrimary } from "@/components/Buttons/ButtonPrimary";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { Employer } from "@/model/EmployerModel";
import { useContext } from "react";
import { AlertContext } from "@/app/lib/context/alertContexct";
import { firebaseApp } from "@/app/firebase/firebaseInitApp";

type DialogProps = {
  handleClose: () => void;
  props: any;
};

async function handleDelete(data: Employer, alert: any): Promise<void> {
  const firestore = getFirestore(firebaseApp);
  const docRef = collection(firestore, "employers");
  const documentToDelete = doc(docRef, data?.id);

  return await deleteDoc(documentToDelete)
    .then(() => {
      alert?.setAlert({
        message: "Documento deletado com sucesso",
        type: "sucess",
      });
    })
    .catch((error) => {
      alert?.setAlert({
        message: `Error ${error}`,
        type: "sucess",
      });
    });
}

function ModalDelete({ handleClose, props }: DialogProps) {
  const alert = useContext(AlertContext);

  async function handle(data: any): Promise<void> {
    await handleDelete(data, alert);
    handleClose();
  }

  return (
    <div className="flex items-center justify-center fixed backdrop-blur-sm w-full h-screen top-0 left-0 z-20">
      <div className="flex flex-col items-center justify-center relative bg-white rounded max-w-[400px] mx-auto p-8 shadow">
        <a onClick={handleClose} className="self-end">
          X
        </a>
        <div className="flex flex-col w-full">
          <p>Você tem certeza que deseja excluir esses dados: </p>
          <div className="flex flex-col gap-2 w-full py-6">
            <p>Nome: {props.name}</p>
            <p>Email: {props.email}</p>
            <p>Endereço: {props.adress}</p>
          </div>
          <div className="flex gap-4 w-full jutify-center items-center">
            <ButtonPrimary onClick={() => handle(props)}>SIM</ButtonPrimary>
            <ButtonPrimary onClick={handleClose}>NÂO</ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ModalDelete };
