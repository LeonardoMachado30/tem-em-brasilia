import {ChangeEvent, useId, useState} from "react";
import Image from "next/image";
import {PhotoIcon} from "@heroicons/react/20/solid";

const classNameCustom =
    "border-[#75AE8B] border-2 text-[#006728] rounded bg-white placeholder:text-[#75AE8B] placeholder:text-sm h-[40px] w-full focus:border-[#006728] focus:outline-none focus:border-2 focus:transition focus:duration-700";


export function ImageRender(
    {
        setImages,
        className,
        register,
        label,
        uniqueImage = false,
        disabled,
    }: {
        uniqueImage?: boolean;
        setImages: (prevImages: any) => void;
        className?: string;
        register: any;
        label: string;
        disabled?: boolean;
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
                            style={{display: "none"}}
                            className="w-full h-full"
                            {...register(label, {onChange: handleImageChange})}
                            disabled={disabled}
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
                                <PhotoIcon
                                    className="h-12 w-12 text-[#75AE8B] transition-all duration-200 transform mx-auto"/>
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