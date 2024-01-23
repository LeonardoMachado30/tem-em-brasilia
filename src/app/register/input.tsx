"use client";
import { ChangeEvent, Dispatch, SetStateAction, useId, useState } from "react";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

type InputProps = {
  className?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

const classNameCustom =
  "border-[#75AE8B] border rounded-sm bg-white placeholder:text-[#75AE8B] placeholder:text-sm h-[40px] px-4 py-2 w-full focus:border-[#006728] focus:outline-none focus:border-2 focus:transition focus:duration-700";

function Input({
  type,
  className,
  value,
  placeholder,
  required,
  ...Input
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${classNameCustom} ${className}`}
      value={value}
      required={required}
    />
  );
}

interface TextAreaProps extends InputProps {
  maxLength?: number;
  rows?: number;
  minLength?: number;
  cols?: number;
}

function Textarea({
  type,
  className,
  value,
  placeholder,
  ...Input
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      className={`${classNameCustom} ${className} `}
      //   value={value}
      maxLength={Input.maxLength}
      minLength={Input.minLength}
      rows={Input.rows}
      cols={Input.cols}
    >
      {value}
    </textarea>
  );
}

interface SelectProps extends InputProps {
  options: Array<string>;
}

function Select({ className, options }: SelectProps) {
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

      <select className={`relative ${classNameCustom}`} onClick={click}>
        {options.map((option: string) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const FetchImageUpload = ({
  setImages,
}: {
  setImages: Dispatch<SetStateAction<File[]>>;
}) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const id = useId();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setPreviewUrls((prevImages: any) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file as any) // avoid memory leak
      );

      setImages((prevImages: any) => prevImages.concat(e.target.files));
    }
  };

  return (
    <>
      <ImageRender handleImageChange={handleImageChange} />

      {previewUrls &&
        previewUrls.map((previewUrl, index) => (
          <Image
            key={index}
            className={` !max-w-[150px] !h-[120px] filter brightness-75`}
            src={previewUrl}
            alt="uploaded preview"
            width={150}
            height={120}
          />
        ))}
    </>
  );
};

function ImageRender({
  handleImageChange,
}: {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const id = useId();
  return (
    <div
      className={`${classNameCustom} rounded-md max-w-[150px] flex justify-center items-center !h-[120px]`}
    >
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/png, image/gif, image/jpeg"
        id={id}
        multiple
        style={{ display: "none" }}
      />
      <label htmlFor={id} className="relative">
        <PhotoIcon className="h-12 w-12 text-[#75AE8B]" />
      </label>
    </div>
  );
}

export { Input, Select, Textarea, FetchImageUpload };
