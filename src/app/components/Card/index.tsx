"use client";
import { useEffect, useState } from "react";
import { firestore } from "@/app/firebase/firebaseInitApp";
import { getDocs, collection, DocumentData } from "firebase/firestore/lite";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import SocialMedias from "./SocialMedias";
import FetchImage from "@/app/util/Image";

function ListAllCompanies() {
  const [data, setData] = useState<Array<DocumentData>>([]);

  useEffect(() => {
    async function getFirestoreDocs() {
      const querySnapshot = await getDocs(collection(firestore, "employers"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`);
        console.log(doc.data());

        // localStorage.setItem("data", JSON.stringify(doc.data()));

        setData([doc.data()]);
      });
    }

    getFirestoreDocs();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        <>
          <h1 className="text-[#006728] text-4xl text-center font-bold mb-4 mt-20">
            Empresas recentes
          </h1>
          <p className="text-[#78ce99] text-center">
            Anuncie sua empresa aqui.
          </p>
          <p className="text-[#78ce99] text-center">
            Maior catalógo de empresas do Distrito Federal.
          </p>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto mb-20 p-4 gap-4 items-center">
            {data?.map((employers, index: number) => (
              <Link
                href={`/detail/${employers?.idField}`}
                key={employers.idField}
                className="flex flex-col relative rounded-md w-full shadow bg-white open-info transition-opacity opacity-100 ease-in duration-700"
              >
                <div className="relative rounded-b-none rounded-t-md rounded-tr-md h-48 md:h-40">
                  <FetchImage
                    storagePath={employers.imageBackground}
                    name={employers.fullName}
                    width={460}
                    height={50}
                    className="rounded-b-none rounded-t-md rounded-tr-md h-48 md:h-40 w-full"
                  />
                </div>
                <div className="relative flex flex-col px-4 py-2 container-animation bg-white rounded-md">
                  <div className="relative flex gap-2">
                    <FetchImage
                      storagePath={employers.imageProfile}
                      name={employers.fullName}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-white -mt-8 h-32 w-32"
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
                  {employers.social !== "" && (
                    <SocialMedias isShow={true} socialData={employers.social} />
                  )}
                </div>
              </Link>
            ))}
          </section>
        </>
      ) : (
        <Skeleton
          count={9}
          height={200}
          width={300}
          className="!bg-[#339B5B10] "
          containerClassName="w-full flex flex-wrap max-w-[1200px] gap-4 justify-center items-center mx-auto p-4"
        />
      )}
    </>
  );
}

export { ListAllCompanies };
