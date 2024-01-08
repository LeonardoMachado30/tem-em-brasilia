"use client";
import Image, { StaticImageData } from "next/image";
import logo_dvx from "$/img/logo-dvx.png";
import icon_instagram from "$/img/icons/instagram.png";
import icon_facebook from "$/img/icons/facebook.png";
import icon_whatsapp from "$/img/icons/whatsapp.png";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/dist/client/link";
import { SearchContext } from "@/app/lib/context/searchContext";
import { useContext } from "react";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { FirebaseServices } from "@/app/firebase/FirebaseServices";

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
  // const searchContext = useContext(SearchContext);
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
        data?.map((employers: any, index: number) => (
          <Link
            href="/"
            key={employers.id}
            className="flex flex-col relative rounded-md w-full shadow bg-white open-info"
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
            <div className="relative flex flex-col px-4 py-2 container-animation bg-white rounded-md">
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
                    className="text-lg font-bold --ellipse"
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

function ListAllCompanies() {
  return (
    <FirebaseServices>
      <h1 className="text-[#006728] text-4xl text-center font-bold mb-4 mt-20">
        Empresas recentes
      </h1>
      <p className="text-[#78ce99] text-center">Anuncie sua empresa aqui.</p>
      <p className="text-[#78ce99] text-center">
        Maior catalógo de empresas do Distrito Federal.
      </p>
      <section className="grid grid-cols-3 max-w-[1200px] mx-auto p-4 gap-4">
        <Card />
      </section>
    </FirebaseServices>
  );
}

export { Card, ListAllCompanies };
