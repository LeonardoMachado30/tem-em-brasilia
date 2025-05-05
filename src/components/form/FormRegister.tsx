import React, {createRef, useState} from "react";
import {IFile, IRegisterForm, Services} from "@/model/EmployerModel";
import {v4 as uuidv4} from "uuid";
import {SubmitHandler, useForm} from "react-hook-form";
import {ref, uploadBytesResumable} from "firebase/storage";
import {firestore, storageInit} from "@/components/firebase/firebaseInitApp";
import {collection, doc, setDoc} from "firebase/firestore/lite";
import {Input, Select, Textarea} from "@/app/register/input";
import ReCAPTCHA from "react-google-recaptcha";
import ClipLoader from "react-spinners/ClipLoader";
import Success from "@/components/Modal/Success";
import {ContainerInput} from "@/components/inputs/ContainerInput";
import {AdressContainer} from "@/components/inputs/AdressContainer";
import {ImageRender} from "@/components/inputs/ImageRender";

export function Form() {
    const [images, setImages] = useState<IFile>([]);
    const [captcher, setCaptcher] = useState<any>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const recaptchaRef = createRef();
    const idField = uuidv4();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        watch,
    } = useForm<IRegisterForm>({
        mode: "onChange", // validação em tempo real
        defaultValues: {
            idField,
        },
    });

    const options: Array<string> = Object.keys(Services).filter(
        (key: any) => !isNaN(Number(Services[key]))
    );

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        setDisabled(true);

        const imageStorage = {
            imageProfile: `/pofiles/${data.imageProfile[0].name}-${data.idField}`,
            imageBackground: `/backgrounds/${data.imageBackground[0].name}-${data.idField}`,
        };

        const uploadFiles = async (fileRef: any, _data: any): Promise<any> => {
            return await uploadBytesResumable(fileRef, _data)
                .then((data) => data)
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        };

        const profileRef = ref(storageInit, imageStorage.imageProfile);
        const backgroundRef = ref(storageInit, imageStorage.imageBackground);

        await uploadFiles(profileRef, data.imageProfile[0]);
        await uploadFiles(backgroundRef, data.imageBackground[0]);

        const galeryArr = Array.from(data.galery).map((item: any) => {
            const galeryRef = ref(
                storageInit,
                `/galery/${item.name}-${data.idField}`
            );
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

        await setDoc(doc(employersRef, data.idField), newData);
        setModal(true);
    };

    const onChangeChapter = (value: any) => {
        setCaptcher(value);
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

                {/* Imagens */}
                <div className="flex sm:flex-row flex-col items-center justify-around w-full">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <p className="text-[#006728] font-bold">foto de perfil</p>
                        <ImageRender
                            label="imageProfile"
                            setImages={setImages}
                            uniqueImage={true}
                            register={register}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <p className="text-[#006728] font-bold">foto da capa</p>
                        <ImageRender
                            label="imageBackground"
                            setImages={setImages}
                            uniqueImage={true}
                            register={register}
                        />
                    </div>
                </div>

                {/* Informações básicas */}
                <ContainerInput title="Informações básicas">
                    <div className="flex sm:flex-row flex-col items-center justify-between gap-5">
                        <Input
                            type="hidden"
                            value={idField}
                            label="idField"
                            register={register}
                            disabled={disabled}
                        />
                        <Input
                            label="fullName"
                            register={register}
                            type="text"
                            placeholder="Nome da empresa"
                            required
                            disabled={disabled}
                        />
                        <Input
                            label="email"
                            register={register}
                            type="email"
                            placeholder="Email"
                            required
                            disabled={disabled}
                            pattern={{
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "E-mail inválido",
                            }}
                        />
                        <Input
                            label="phone"
                            register={register}
                            type="text"
                            placeholder="Telefone"
                            required
                            disabled={disabled}
                            mask="(99) 99999-9999"
                        />
                        <Input
                            label="cel"
                            register={register}
                            type="text"
                            placeholder="Celular / WhatsApp"
                            required
                            disabled={disabled}
                            mask="(99) 9999-9999"
                        />
                    </div>
                    <Textarea
                        label="description"
                        register={register}
                        placeholder="Descrição"
                        maxLength={250}
                        required
                        disabled={disabled}
                    />
                </ContainerInput>

                {/* Galeria */}
                <ContainerInput title="Fotos da galeria" classNameChildren="flex sm:flex-row flex-wrap">
                    <ImageRender
                        setImages={setImages}
                        label="galery"
                        register={register}
                    />
                </ContainerInput>

                <AdressContainer register={register} disabled={disabled}/>

                <ContainerInput title="Sobre sua empresa" classNameChildren="flex items-center">
                    <Select
                        options={options}
                        label="category"
                        register={register}
                        className="max-w-[420px]"
                        disabled={disabled}
                    />
                    <Input
                        label="services"
                        register={register}
                        type="text"
                        placeholder="Serviços, Exemplo: Atendente, Wifi..."
                        required
                        className="max-w-[350px]"
                        disabled={disabled}
                    />
                </ContainerInput>

                {/* Redes sociais */}
                <ContainerInput title="Redes sociais" classNameChildren="grid grid-cols-1 sm:grid-cols-3">
                    <Input
                        label="social"
                        register={register}
                        placeholder="cole a url das suas redes sociais"
                        disabled={disabled}
                    />
                </ContainerInput>

                {/* Captcha */}
                <ReCAPTCHA
                    sitekey="6LftDGUpAAAAAINmS_V1yyAZWU-9MA3as0oudrmO"
                    onChange={onChangeChapter}
                />

                {/* Botão de submit */}
                <button
                    type="submit"
                    disabled={!isValid || disabled}
                    className="relative bg-[#006728] text-white px-6 py-2 rounded-sm w-full max-w-80 h-10 disabled:bg-[#5bc483] disabled:cursor-wait"
                >
                    {disabled ? (
                        <ClipLoader color="#fff" size={20} className="absolute top-2 left-0 right-0 mx-auto"/>
                    ) : (
                        "Cadastrar empresa"
                    )}
                </button>
            </form>

            {/* Modal de sucesso */}
            {modal && <Success idField={idField}/>}
        </>
    );
}
