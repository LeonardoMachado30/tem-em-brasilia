"use client";
import React, { ReactNode, useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";
import {
  Input,
  Select,
  Textarea,
  FetchImageUpload,
  FetchGaleryUpload,
} from "./input";
import { StorageProvider, SuspenseWithPerf, useFirestore } from "reactfire";
import Skeleton from "react-loading-skeleton";
import {
  UploadTask,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "../firebase/firebaseInitApp";
import { FirebaseServices } from "../firebase/FirebaseServices";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Success from "@/components/Modal/Success";
import { IFile, IFormValues, Services } from "@/model/EmployerModel";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { collection, doc, setDoc } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";
import { createRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Page() {
  return (
    <>
      <FirebaseServices>
        <Header />
        <Form />
      </FirebaseServices>
      <Footer />
    </>
  );
}

function Form() {
  const [images, setImages] = useState<IFile>([]);
  const [captcher, setCaptcher] = useState<any>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const recaptchaRef = createRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormValues>();

  const storage = getStorage(firebaseApp);
  const idField = uuidv4();
  const firestore = useFirestore();
  const options: Array<string> = Object.keys(Services).filter(
    (key: any) => !isNaN(Number(Services[key]))
  );

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    setDisabled(true);
    // if (captcher === undefined || captcher === "" || captcher === null) {
    //   throw Error("captcher required");
    // }

    const imageStorage = {
      imageProfile: `/pofiles/${data.imageProfile[0].name}-${data.idField}`,
      imageBackground: `/backgrounds/${data.imageBackground[0].name}-${data.idField}`,
    };

    const uploadFiles = async (fileRef: any, _data: any): Promise<any> => {
      return await uploadBytesResumable(fileRef, _data)
        .then(() => true)
        .catch((error) => {
          console.log(error);
          return error;
        });
    };

    const profileRef = ref(storage, imageStorage.imageProfile);

    const backgroundRef = ref(storage, imageStorage.imageBackground);

    await uploadFiles(profileRef, data.imageProfile[0]);

    await uploadFiles(backgroundRef, data.imageProfile[0]);

    const galeryArr = Array.from(data.galery).map((item: any) => {
      const galeryRef = ref(storage, `/galery/${item.name}-${data.idField}`);
      uploadFiles(galeryRef, item);
      return `/galery/${item.name}`;
    });

    const employersRef = collection(firestore, "employers");

    const newData = {
      ...data,
      imageProfile: imageStorage.imageProfile,
      imageBackground: imageStorage.imageBackground,
      galery: galeryArr,
    };

    const docRef = await setDoc(doc(employersRef, data.idField), newData);
    setDisabled(true);
    setModal(true);
  };

  const onChangeChapter = (value: any) => {
    console.log("Captcha value:", value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-[1120px] mx-auto justify-center items-center my-24 gap-4 p-4"
      >
        <h1 className="text-3xl sm:text-4xl text-[#006728] font-bold">
          Cadastro de empresa
        </h1>
        <StorageProvider sdk={storage}>
          <div className="flex flex-col w-full">
            <div className="flex sm:flex-row flex-col items-center justify-around">
              <div className="flex flex-col items-center gap-2 w-full">
                <p className="text-[#006728] font-bold">foto de perfil</p>

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
                  <FetchImageUpload
                    label="imageProfile"
                    setImages={setImages}
                    uniqueImage={true}
                    register={register}
                  />
                </SuspenseWithPerf>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <p className="text-[#006728] font-bold">foto da capa</p>
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
                  <FetchImageUpload
                    label="imageBackground"
                    register={register}
                    setImages={setImages}
                    uniqueImage={true}
                  />
                </SuspenseWithPerf>
              </div>
            </div>
          </div>

          <ContainerInput
            title="Informações básicas"
            // classNameChildren="flex flex-col items-center justify-between"
          >
            <div className="flex sm:flex-row flex-col items-center justify-between gap-5">
              <Input
                type="hidden"
                value={idField}
                label="idField"
                register={register}
                disabled={disabled}
                className="disabled:bg-[#5bc483] disabled:cursor-wait"
              />
              <Input
                label="fullName"
                register={register}
                type="text"
                placeholder="Nome da empresa"
                required={true}
                disabled={disabled}
                className="disabled:bg-[#5bc483] disabled:cursor-wait"
              />
              {errors?.fullName && <p>{errors.fullName.message}</p>}
              <Input
                label="email"
                register={register}
                type="text"
                placeholder="Email"
                required={true}
                disabled={disabled}
                className="disabled:bg-[#5bc483] disabled:cursor-wait"
              />
              <Input
                label="phone"
                register={register}
                type="text"
                placeholder="Telefone"
                required={true}
                disabled={disabled}
                className="disabled:bg-[#5bc483] disabled:cursor-wait"
              />
              <Input
                label="cel"
                register={register}
                type="text"
                placeholder="Celular / WhatsApp"
                required={true}
                disabled={disabled}
                className="disabled:bg-[#5bc483] disabled:cursor-wait"
              />
            </div>
            <div className="flex items-center justify-between gap-5">
              <Textarea
                label="description"
                register={register}
                placeholder="Descrição"
                maxLength={250}
                minLength={30}
                rows={5}
                className="h-[90px] disabled:bg-[#5bc483] disabled:cursor-wait"
                required={true}
                disabled={disabled}
              />
            </div>
          </ContainerInput>

          <ContainerInput
            title="Fotos da galeria"
            classNameChildren="flex sm:flex-row flex-wrap "
          >
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
              <FetchGaleryUpload
                setImages={setImages}
                label="galery"
                register={register}
              />
            </SuspenseWithPerf>
          </ContainerInput>

          <ContainerInput
            title="Localização"
            classNameChildren="flex items-center justify-between"
          >
            <Input
              label="adress"
              register={register}
              type="text"
              placeholder="Endereço"
              required={true}
              disabled={disabled}
              className="disabled:bg-[#5bc483] disabled:cursor-wait"
            />
            <Input
              label="adressComplement"
              register={register}
              type="text"
              placeholder="Complemento"
              disabled={disabled}
              className="disabled:bg-[#5bc483] disabled:cursor-wait"
            />
            <Input
              label="zip"
              register={register}
              type="text"
              placeholder="CEP"
              required={true}
              className="max-w-[140px] disabled:bg-[#5bc483] disabled:cursor-wait"
              disabled={disabled}
            />
          </ContainerInput>

          <ContainerInput
            title="Sobre sua empresa"
            classNameChildren="flex items-center"
          >
            <Select
              options={options}
              className="max-w-[420px] disabled:bg-[#5bc483] disabled:cursor-wait"
              label="category"
              register={register}
              disabled={disabled}
            />
            <Input
              label="services"
              register={register}
              type="text"
              placeholder="Serviços, Exemplo: Atendente, Wifi..."
              required={true}
              className="max-w-[350px] disabled:bg-[#5bc483] disabled:cursor-wait"
              disabled={disabled}
            />
          </ContainerInput>

          <ContainerInput
            title="Redes sociais"
            classNameChildren="grid grid-cols-1 sm:grid-cols-3"
          >
            <Input
              className="disabled:bg-[#5bc483] disabled:cursor-wait"
              label="social"
              register={register}
              placeholder="cole a url das suas redes sociais"
              disabled={disabled}
            />
          </ContainerInput>
        </StorageProvider>

        <ReCAPTCHA
          sitekey="6LftDGUpAAAAAINmS_V1yyAZWU-9MA3as0oudrmO"
          onChange={onChangeChapter}
        />
        <button
          className="relative bg-[#006728] text-white px-6 py-2 rounded-sm  w-full max-w-80 h-10 disabled:bg-[#5bc483] disabled:cursor-wait"
          type="submit"
          disabled={disabled}
        >
          Cadastrar empresa
        </button>
      </form>

      <button
        className="relative bg-[#006728] text-white px-6 py-2 rounded-sm  w-full max-w-80 h-10 disabled:bg-[#5bc483] disabled:cursor-wait"
        disabled={disabled}
        onClick={() => {
          setDisabled(true);

          setTimeout(() => {
            setDisabled(false);
          }, 5000);
        }}
      >
        {disabled ? (
          <ClipLoader
            color="#fff"
            size={20}
            className="absolute top-2 left-0 right-0 mx-auto"
          />
        ) : (
          "Cadastrar empresa"
        )}
      </button>
      {modal && <Success idField={idField} />}
    </>
  );
}

type IContainerRow = {
  children: ReactNode;
  title: string;
  classNameChildren?: string | undefined;
};

function ContainerInput({
  children,
  title,
  classNameChildren,
}: IContainerRow): JSX.Element {
  const className =
    typeof classNameChildren === "undefined"
      ? "flex flex-col"
      : classNameChildren;
  return (
    <div className="flex flex-col w-full gap-2 mt-2">
      <span className="text-[#006728] font-bold">{title}</span>
      <div className={`${className} gap-4`}>{children}</div>
    </div>
  );
}
