
"use client";
import Image from "next/image";
import {
    useStorage,
    useStorageDownloadURL,
} from "reactfire";
import ClipLoader from "react-spinners/ClipLoader";
import { ref } from "firebase/storage";

type FetchImageProps = {
    storagePath: string;
    name: string;
    className: string;
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
    const storage = useStorage();

    const { data: imageURL } = useStorageDownloadURL(ref(storage, storagePath));

    if (typeof imageURL === "undefined" || typeof imageURL === null)
        return (
            <div className="flex justify-center items-center w-full mx-auto h-screen absolute top-0 left-0">
                <ClipLoader color="#000" size={30} />
            </div>
        );

    return (
        imageURL && (
            <Image
                src={imageURL}
                alt={`imagem de fundo da empresa ${name}`}
                width={width}
                height={height}
                className={className}
            />
        )
    );
};

export default FetchImage;