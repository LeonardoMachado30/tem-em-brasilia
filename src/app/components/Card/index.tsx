import Image, { StaticImageData } from "next/image";
import { useFirestoreCollectionData, useFirestore } from "reactfire";
import { collection, orderBy, query } from "firebase/firestore";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import logo_dvx from "$/img/logo-dvx.png";
import { ButtonClose } from "../Buttons/ButtonClose";
import icon_instagram from "$/img/icons/instagram.png";
import icon_facebook from "$/img/icons/facebook.png";
import icon_linkedin from "$/img/icons/linkedin.png";
import icon_youtube from "$/img/icons/youtube.png";
import icon_whatsapp from "$/img/icons/whatsapp.png";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/dist/client/link";

type SocialMediasProps = {
  image: StaticImageData;
  alt: string;
  link: string;
};

function SocialMedias() {
  const imageArr: SocialMediasProps[] = [
    { image: icon_whatsapp, alt: "icon whatsapp", link: "" },
    { image: icon_instagram, alt: "icon instagram", link: "" },
    { image: icon_facebook, alt: "icon facebook", link: "" },
  ];
  return (
    <div className="flex gap-2 w-full items-center item-hidden">
      {imageArr.map(({ image, alt }: SocialMediasProps, index) => {
        return (
          <div key={index}>
            <Image src={image} alt={alt} width={36} height={36} />
          </div>
        );
      })}
    </div>
  );
}

function Card() {
  const firestore = useFirestore();
  const employersCollection = collection(firestore, "employers");
  const employersQuery = query(employersCollection, orderBy("name", "desc"));
  const { status, data: data } = useFirestoreCollectionData(employersQuery, {
    idField: "id",
  });

  return (
    <>
      {status === "loading" ? (
        <Skeleton count={2} />
      ) : (
        data.map((employers, index) => (
          <Link
            href="/"
            key={employers.id}
            className="flex flex-col relative rounded-md max-w-[420px] w-full shadow bg-white open-info"
          >
            <div className="shadow-gray-500 shadow-inner rounded-b-none rounded-t-md rounded-tr-md">
              <Image
                src={logo_dvx}
                alt="Logo dvx"
                width={460}
                height={160}
                style={{ maxHeight: "160px" }}
                className="rounded-b-none rounded-t-md rounded-tr-md"
              />
            </div>
            <div className="relative flex flex-col px-4 py-2 container-animation bg-white">
              <div className="flex gap-2">
                <Image
                  src={logo_dvx}
                  alt={`Foto de perfil da empresa ${employers.name}`}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white -mt-8"
                />
                <div className="flex flex-col">
                  <p
                    className="text-lg font-bold ellipse"
                    title={employers.name}
                  >
                    {employers.name}
                  </p>
                  <span className="flex items-center gap-1">
                    <BuildingOffice2Icon className="h-5 w-5 text-[#339B5B]" />
                    <p className="text-[#339B5B] font-semibold text-sm">
                      Restaurante
                    </p>
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-5 w-5 text-[#339B5B]" />
                    <p className="text-[#339B5B] font-semibold text-sm">
                      Q 25 C 15 Gama Leste
                    </p>
                  </span>
                </div>
              </div>
              <SocialMedias />
            </div>
          </Link>
        ))
      )}
    </>
  );
}
export { Card };
