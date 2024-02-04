"use client";
import {
  Bars2Icon,
  MapIcon,
  PhotoIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import SocialMedias from "@/components/Card/SocialMedias";
import {
  StorageProvider,
  SuspenseWithPerf,
  useFirestore,
  useFirestoreDocData,
} from "reactfire";
import ClipLoader from "react-spinners/ClipLoader";

import { doc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { firebaseApp } from "@/app/firebase/firebaseInitApp";
import FetchImage from "@/app/util/Image";
import BoxWrapp from "../BoxWrapp";

export default function Page({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const storage = getStorage(firebaseApp);
  const employersRef = doc(firestore, "employers", params.id);
  const { status, data } = useFirestoreDocData(employersRef);
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center w-full mx-auto h-screen absolute top-0 left-0">
        <ClipLoader color="#000" size={30} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <StorageProvider sdk={storage}>
        <SuspenseWithPerf
          fallback={
            <div className="flex justify-center items-center w-full mx-auto h-screen absolute top-0 left-0">
              <ClipLoader color="#000" size={30} />
            </div>
          }
          traceId="storage-root"
        >
          <FetchImage
            storagePath={data.imageBackground}
            name={data.fullName}
            width={900}
            height={350}
            className="!w-full max-h-[350px]"
          />
        </SuspenseWithPerf>

        <div className=" max-w-[1320px] mx-auto relative w-full">
          <div className="flex justify-between items-start w-full p-4">
            <div className="flex items-start gap-2">
              <SuspenseWithPerf
                fallback={
                  <div className="flex justify-center items-center w-full mx-auto h-screen absolute top-0 left-0">
                    <ClipLoader color="#000" size={30} />
                  </div>
                }
                traceId="storage-root"
              >
                <FetchImage
                  storagePath={data.imageProfile}
                  name={data.fullName}
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] rounded-full border-4 border-white -mt-20"
                />
              </SuspenseWithPerf>
              <p className="text-4xl font-bold text-nowrap">{data.fullName}</p>
            </div>

            {data.social && (
              <SocialMedias isShow={true} socialData={data.social} />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 p-8">
            <BoxWrapp
              icon={<Bars2Icon className="h-6 w-6 text-black" />}
              title="Decrição"
            >
              <p>{data.description}</p>
            </BoxWrapp>

            <BoxWrapp
              icon={<MapIcon className="h-6 w-6 text-black" />}
              title="Localização"
            >
              <p>
                {data.adress} - {data.zip}
              </p>
            </BoxWrapp>

            <BoxWrapp
              icon={<PhotoIcon className="h-6 w-6 text-black" />}
              title="Galeria"
            >
              <div className="grid grid-cols-3 gap-1 place-content-center p-1">
                {data.galery.map((item: any, index: number) => (
                  <div key={index} className="h-[150px] bg-[#D9D9D9]">
                    {/* <FetchImage
                        storagePath={item}
                        name={data.name}
                        width={200}
                        height={200}
                        className=" h-full"
                      /> */}
                  </div>
                ))}
              </div>
            </BoxWrapp>

            <div className="flex flex-col gap-2">
              <BoxWrapp
                icon={<PhotoIcon className="h-6 w-6 text-black" />}
                title="Serviços"
              >
                <div className="flex flex-col">{data[0]?.services}</div>
              </BoxWrapp>

              <BoxWrapp
                icon={<PlusCircleIcon className="h-6 w-6 text-black" />}
                title="O que mais temos"
              >
                <div className="flex flex-col">{data[0]?.services}</div>
              </BoxWrapp>
            </div>
          </div>
        </div>
      </StorageProvider>
    </div>
  );
}
