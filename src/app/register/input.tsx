"use client";

import { ChangeEvent, useEffect, useId, useState } from "react";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { Path, UseFormRegister, useForm } from "react-hook-form";
import {
  InputProps,
  SelectProps,
  Services,
  TextAreaProps,
} from "@/model/EmployerModel";

const classNameCustom =
  "border-[#75AE8B] border-2 text-[#006728] rounded bg-white placeholder:text-[#75AE8B] placeholder:text-sm h-[40px] w-full focus:border-[#006728] focus:outline-none focus:border-2 focus:transition focus:duration-700";

function Input({
  required,
  register,
  label,
  placeholder,
  value,
  ...inputProps
}: InputProps) {
  return (
    <input
      type={inputProps.type}
      className={`${classNameCustom} px-4`}
      {...register(label, { required })}
      placeholder={placeholder}
      value={value}
    />
  );
}

function Textarea({
  className,
  value,
  register,
  label,
  required,
  ...inputProps
}: TextAreaProps) {
  return (
    <textarea
      {...register(label, { required, ...inputProps })}
      className={`px-4 pt-2 ${classNameCustom} ${className} `}
      // maxLength={inputProps.maxLength}
      // minLength={inputProps.minLength}
      // rows={inputProps.rows}
      // cols={inputProps.cols}
    >
      {value}
    </textarea>
  );
}

function Select({ className, options, register, label }: SelectProps) {
  const [select, setSelect] = useState<boolean>(false);

  const click = () => {
    setSelect(!select);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {select ? (
        <BarsArrowUpIcon className="h-6 w-6 text-[#75AE8B] absolute right-2 top-2 z-10" />
      ) : (
        <BarsArrowDownIcon className="h-6 w-6 text-[#75AE8B] absolute right-2 top-2 z-10" />
      )}

      <select
        defaultValue={"DEFAULT"}
        className={`relative px-4 ${classNameCustom}`}
        onClick={click}
        {...register(label)}
      >
        <option value="DEFAULT" disabled>
          Selecione um serviço
        </option>
        {options.map((value: string) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

interface IFetchImageUpload extends InputProps {
  uniqueImage?: boolean;
  setImages: (prevImages: any) => void;
}

const FetchGaleryUpload = ({
  setImages,
  register,
  label,
}: IFetchImageUpload) => {
  return (
    <>
      <ImageRender setImages={setImages} register={register} label={label} />
    </>
  );
};

const FetchImageUpload = ({
  setImages,
  register,
  label,
}: IFetchImageUpload) => {
  return (
    <>
      <ImageRender
        setImages={setImages}
        register={register}
        label={label}
        uniqueImage={true}
      />
    </>
  );
};

function ImageRender({
  setImages,
  className,
  register,
  label,
  uniqueImage = false,
}: {
  uniqueImage?: boolean;
  setImages: (prevImages: any) => void;
  className?: string;
  register: any;
  label: string;
}) {
  const id = useId();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      if (uniqueImage) {
        setPreviewUrls([filesArray[0]]);
        setImages([e.target.files[0]]);
      } else {
        setPreviewUrls((prevImages: any) => prevImages.concat(filesArray));
        setImages((prevImages: any) => prevImages.concat(e.target.files));
      }

      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file as any) // avoid memory leak
      );
    }
  };

  return (
    <>
      <div
        className={`relative w-full h-full ${classNameCustom} ${
          !className &&
          " rounded-md max-w-[150px] flex justify-center items-center !h-[120px]"
        }`}
      >
        {setImages.length < 8 && (
          <>
            <input
              type="file"
              accept="image/png, image/jpeg"
              id={id}
              multiple={!uniqueImage}
              style={{ display: "none" }}
              className="w-full h-full"
              {...register(label, { onChange: handleImageChange })}
            />

            {uniqueImage && previewUrls.length === 1 ? (
              <label htmlFor={id}>
                <Image
                  className={`!max-w-[150px] !h-[120px] filter brightness-75 transition-all duration-200 cursor-pointer`}
                  src={previewUrls[0]}
                  alt="uploaded preview"
                  width={150}
                  height={120}
                />
              </label>
            ) : (
              <label
                htmlFor={id}
                className="flex items-center justify-center relative cursor-pointer w-full h-full"
              >
                <PhotoIcon className="h-12 w-12 text-[#75AE8B] transition-all duration-200 transform mx-auto" />
              </label>
            )}
          </>
        )}
      </div>

      {!uniqueImage &&
        previewUrls.map((previewUrl, index) => (
          <Image
            key={index}
            className={`!max-w-[150px] !h-[120px] filter brightness-75`}
            src={previewUrl}
            alt="uploaded preview"
            width={150}
            height={120}
          />
        ))}
    </>
  );
}

export { Input, Select, Textarea, FetchImageUpload, FetchGaleryUpload };
