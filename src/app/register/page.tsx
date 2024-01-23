"use client";
import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { Input, Select, Textarea, FetchImageUpload } from "./input";
import { StorageProvider, SuspenseWithPerf } from "reactfire";
import Skeleton from "react-loading-skeleton";
import { getStorage } from "firebase/storage";
import { firebaseApp } from "../firebase/firebaseInitApp";
import { FirebaseServices } from "../firebase/FirebaseServices";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Page() {
  const [images, setImages] = useState<File[]>([]);
  const options = ["Atendimento ao cliente", "A", "b"];
  const storage = getStorage(firebaseApp);
  function submit(event: any) {
    console.log(event.target);
    console.log("submit");
  }
  return (
    <>
      <FirebaseServices>
        <Header />
        <form
          onSubmit={submit}
          className="flex flex-col w-full max-w-[1120px] mx-auto justify-center items-center my-24 gap-4 p-4"
        >
          <h1 className="text-3xl sm:text-4xl text-[#006728] font-bold">
            Cadastro de empresa
          </h1>

          <div className="flex flex-col w-full">
            <div className="flex sm:flex-row flex-col items-center justify-around">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[#006728] font-bold">foto de perfil</p>
                <div className="flex items-center justify-center rounded-full bg-white border-[#75AE8B] border-2 w-[120px] h-[120px]">
                  <PhotoIcon className="h-12 w-12 text-[#75AE8B]" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-[#006728] font-bold">foto da capa</p>
                <div className="flex items-center justify-center rounded-sm bg-white border-[#75AE8B] border-2 w-[225px] h-[120px]">
                  <PhotoIcon className="h-12 w-12 text-[#75AE8B]" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <span className="text-[#006728] font-bold">
              Informações básicas
            </span>
            <div className="flex sm:flex-row flex-col items-center justify-between gap-5">
              <Input
                type="text"
                placeholder="Nome da empresa"
                required={true}
              />
              <Input type="text" placeholder="Telefone" required={true} />
              <Input
                type="text"
                placeholder="Celular / WhatsApp"
                required={true}
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <Textarea
                placeholder="Descrição"
                maxLength={250}
                minLength={30}
                rows={5}
                className="h-[90px]"
                required={true}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <span className="text-[#006728] font-bold">Fotos da galeria</span>
            <div className="flex sm:flex-row flex-wrap gap-5">
              <StorageProvider sdk={storage}>
                <SuspenseWithPerf
                  fallback={
                    <Skeleton
                      count={1}
                      height={350}
                      width={900}
                      className="!bg-[#339B5B10] "
                      containerClassName="w-full flex flex-wrap max-w-[1200px] gap-4 justify-center items-center mx-auto p-4"
                    />
                  }
                  traceId="storage-root"
                >
                  <FetchImageUpload setImages={setImages} />
                </SuspenseWithPerf>
              </StorageProvider>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <span className="text-[#006728] font-bold">Localização</span>
            <div className="flex sm:flex-row flex-col items-center justify-between gap-5">
              <Input type="text" placeholder="Endereço" required={true} />
              <Input type="text" placeholder="Complemento" />
              <Input
                type="text"
                placeholder="CEP"
                required={true}
                className="max-w-[140px]"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <span className="text-[#006728] font-bold">Sobre sua empresa</span>
            <div className="flex items-center gap-5 sm:flex-row flex-col">
              <Select options={options} className="max-w-[420px]" />
              <Input
                type="text"
                placeholder="Serviços, Exemplo: Atendente, Wifi..."
                required={true}
                className="max-w-[350px]"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <span className="text-[#006728] font-bold">Redes sociais</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input placeholder="Facebook" />
              <Input placeholder="Instagram" />
              <Input placeholder="Twitter" />
              <Input placeholder="LinkedIn" />
              <Input placeholder="Youtube" />
              <Input placeholder="Outros(as)" />
            </div>
          </div>

          <button
            className="bg-[#006728] text-white px-6 py-2 rounded-sm"
            type="submit"
          >
            Cadastrar empresa
          </button>
        </form>
      </FirebaseServices>
      <Footer />
    </>
  );
}
