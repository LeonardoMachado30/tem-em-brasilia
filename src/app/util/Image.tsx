"use client";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import useStorage from "../firebase/hooks/Storage";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

type FetchImageProps = {
  storagePath: string;
  name: string;
  className?: string;
  width: number;
  height: number;
};

const FetchImage = ({
  storagePath,
  name,
  className,
  width,
  height,
}: FetchImageProps) => {
  const { storage, error } = useStorage(storagePath);

  if (error !== null)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
      </div>
    );

  return storage ? (
    <Image
      src={storage}
      alt={`imagem de fundo da empresa ${name}`}
      width={width}
      height={height}
      className={className}
    />
  ) : (
    <div className="flex justify-center items-center w-full h-full">
      <ClipLoader color="#000" size={30} className={className} />
    </div>
  );
};

export default FetchImage;
