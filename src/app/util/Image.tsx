"use client";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storageInit } from "../firebase/firebaseInitApp";

type FetchImageProps = {
  storagePath: string;
  name: string;
  className?: string;
  width: number;
  height: number;
};

type Storage = {
  image: string | null;
  error: boolean;
};

const FetchImage = ({
  storagePath,
  name,
  className,
  width,
  height,
}: FetchImageProps) => {
  const [storage, setStorage] = useState<Storage>({
    image: null,
    error: false,
  });
  const refStore = ref(storageInit, storagePath);

  useEffect(() => {
    async function getStorageUnique() {
      await getDownloadURL(refStore)
        .then((image) => {
          console.log(image);
          setStorage(() => ({
            image: image,
            error: true,
          }));
        })
        .catch((error) => {
          let message = "";
          switch (error.code) {
            case "storage/object-not-found":
              message = "storage/object-not-found";
              break;
            case "storage/unauthorized":
              message = "storage/unauthorized";
              break;
            case "storage/canceled":
              message = "storage/canceled";
              break;
            case "storage/unknown":
              message = "storage/unknown";
              break;
          }
          console.log(message);
          setStorage(() => ({
            image: null,
            error: false,
          }));
        });
    }

    getStorageUnique();
  }, []);

  return storage.image !== null ? (
    <Image
      src={storage.image}
      alt={`imagem de fundo da empresa ${name}`}
      width={width}
      height={height}
      className={className}
    />
  ) : (
    <div className="flex justify-center items-center w-full h-full">
      <ClipLoader color="#000" size={30} />
    </div>
  );
};

export default FetchImage;
