"use client";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import SocialMedias from "./SocialMedias";
import FetchImage from "@/app/util/Image";
import { firebaseApp } from "@/app/firebase/firebaseInitApp";
import { useCallback, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  getFirestore,
  DocumentData,
  getDocs,
} from "firebase/firestore";

function Cards() {
  const [data, setData] = useState<DocumentData[]>([]);
  const [focusCard, setfocusCard] = useState<boolean>(false);
  const firestore = getFirestore(firebaseApp);

  const callback = useCallback(
    function getFirestoreDocs() {
      const q = query(
        collection(firestore, "employers"),
        where("isActive", "==", true)
      );

      const unsuscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((doc) => {
          setData((prev) => [...prev, doc.doc.data()]);
        });
      });
      return () => {
        unsuscribe();
      };
    },
    [firestore]
  );

  useEffect(() => {
    const unsibscrbe = callback();
    () => unsibscrbe();
  }, [callback]);

  return (
    <>
      {data || Array.from(data).length > 0 ? (
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
            {data?.map((employers: any, index: number) => {
              const social = employers.social.split(",");
              return (
                <Link
                  href={`/detail/${employers?.idField}`}
                  key={employers.idField}
                  onMouseEnter={() => setfocusCard(!focusCard)}
                  onMouseLeave={() => setfocusCard(!focusCard)}
                  className={`flex flex-col relative rounded-md w-full shadow bg-white  transition-opacity opacity-100 ease-in duration-700 ${
                    social.length > 0 && "open-info"
                  }`}
                >
                  <div className="relative rounded-b-none rounded-t-md rounded-tr-md h-48 md:h-40 bg-gray-300">
                    <FetchImage
                      storagePath={employers.imageBackground}
                      name={employers.fullName}
                      width={460}
                      height={50}
                      className="rounded-b-none rounded-t-md rounded-tr-md h-48 md:h-40 w-full"
                    />
                  </div>
                  <div className="relative flex flex-col px-4 py-2 container-animation bg-white rounded-md">
                    <div className="relative flex gap-2 ">
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

                    <div className="relative">
                      {social.length > 0 && (
                        <SocialMedias socialData={social} />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
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

export { Cards };
