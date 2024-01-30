"use client";
import Image from "next/image";
import logo_dvx from "$/img/logo-dvx.png";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/dist/client/link";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import SocialMedias from "./SocialMedias";

function Card() {
  const firestore = useFirestore();
  // const searchContext = useContext(SearchContext);
  const employersCollection = collection(firestore, "employers");
  const employersQuery = query(employersCollection, orderBy("idField", "desc"));
  const { status, data: data } = useFirestoreCollectionData(employersQuery, {
    idField: "id",
  });
  console.log(data);

  if (status === "loading") {
    return (
      <Skeleton
        count={9}
        height={300}
        width={300}
        className="!bg-[#339B5B10] "
        containerClassName="w-full flex flex-wrap max-w-[1200px] gap-4 justify-center items-center mx-auto p-4"
      />
    );
  }

  console.log(data);

  return (
    <section className="grid grid-cols-3 max-w-[1200px] mx-auto mb-20 p-4 gap-4">
      {data?.map((employers, index: number) => (
        <Link
          href={`/detail/${employers?.idField}`}
          key={employers.idField}
          className="flex flex-col relative rounded-md w-full shadow bg-white open-info"
        >
          <div className="shadow-gray-500 shadow-inner rounded-b-none rounded-t-md rounded-tr-md">
            <Image
              src={logo_dvx}
              alt="Logo dvx"
              width={460}
              height={50}
              className="rounded-b-none rounded-t-md rounded-tr-md h-72"
            />
          </div>
          <div className="relative flex flex-col px-4 py-2 container-animation bg-white rounded-md">
            <div className="flex gap-2">
              <Image
                src={logo_dvx}
                alt={`Foto de perfil da empresa ${employers.fullName}`}
                width={100}
                height={100}
                className="rounded-full border-4 border-white -mt-8"
              />
              <div className="flex flex-col">
                <p
                  className="text-lg font-bold --ellipse"
                  title={employers.fullName}
                >
                  {employers.fullName}
                </p>
                <span className="flex items-center gap-1">
                  <BuildingOffice2Icon className="h-5 w-5 text-[#339B5B]" />
                  <p className="text-[#339B5B] font-semibold text-sm">
                    {employers.category}
                  </p>
                </span>

                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-5 w-5 text-[#339B5B]" />
                  <p className="text-[#339B5B] font-semibold text-sm">
                    {employers.adress}
                  </p>
                </span>
              </div>
            </div>
            <SocialMedias isShow={false} />
          </div>
        </Link>
      ))}
    </section>
  );
}

function ListAllCompanies() {
  return (
    <>
      <h1 className="text-[#006728] text-4xl text-center font-bold mb-4 mt-20">
        Empresas recentes
      </h1>
      <p className="text-[#78ce99] text-center">Anuncie sua empresa aqui.</p>
      <p className="text-[#78ce99] text-center">
        Maior catalógo de empresas do Distrito Federal.
      </p>

      <Card />
    </>
  );
}

export { Card, ListAllCompanies };
