"use client";
import {
  Bars2Icon,
  MapIcon,
  PhotoIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import BoxWrapp from "./BoxWrapp";
import Image from "next/image";
import SocialMedias from "@/components/Card/SocialMedias";
import {
  StorageProvider,
  SuspenseWithPerf,
  useFirestore,
  useFirestoreCollectionData,
  useStorage,
  useStorageDownloadURL,
} from "reactfire";
import { collection, limit, query, where } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";
import { getStorage, ref } from "firebase/storage";
import Skeleton from "react-loading-skeleton";
import { firebaseApp } from "../firebase/firebaseInitApp";

type FetchImageProps = {
  storagePath: string;
  name: string;
  className: string;
  width: number;
  height: number;
};

const FetchImage = async ({
  storagePath,
  name,
  className,
  width,
  height,
}: FetchImageProps) => {
  const storage = useStorage();

  const { data: imageURL } = await useStorageDownloadURL(
    ref(storage, storagePath)
  );

  console.log(imageURL);

  if (typeof imageURL === "undefined" || typeof imageURL === null)
    return (
      <Skeleton
        count={1}
        height={width}
        width={height}
        className="!bg-[#339B5B10] "
        containerClassName="w-full flex flex-wrap max-w-[1200px] gap-4 justify-center items-center mx-auto p-4"
      />
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

export default function ViewEmployer({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const storage = getStorage(firebaseApp);
  const employersCollection = collection(firestore, "employers");
  console.log(params?.id);
  const employersQuery = query(
    employersCollection,
    where("idField", "==", params?.id),
    limit(1)
  );

  const { status: status, data: data } = useFirestoreCollectionData(
    employersQuery,
    {
      idField: "id",
    }
  );

  console.log(data);

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
            <Skeleton
              count={1}
              height={350}
              width={900}
              className="!bg-[#339B5B10] "
              containerClassName="w-full flex flex-wrap max-w-[1200px] gap-4 justify-center items-center mx-auto p-4"
            />
          }
          traceId="storage-root"
        >
          <FetchImage
            storagePath={data[0]?.storagePath}
            name={data[0]?.name}
            width={900}
            height={350}
            className="!w-full max-h-[350px]"
          />

          <div className=" max-w-[1320px] mx-auto relative w-full">
            <div className="flex justify-between items-start w-full p-4">
              <div className="flex items-start gap-2">
                <FetchImage
                  storagePath={data[0]?.storagePath}
                  name={data[0]?.name}
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] rounded-full border-4 border-white -mt-20"
                />
                <p className="text-4xl font-bold text-nowrap">
                  {data[0]?.name}
                </p>
              </div>

              <SocialMedias isShow={true} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <BoxWrapp
                icon={<Bars2Icon className="h-6 w-6 text-black" />}
                title="Decrição"
              >
                <p>{data[0]?.description}</p>
              </BoxWrapp>

              <BoxWrapp
                icon={<MapIcon className="h-6 w-6 text-black" />}
                title="Localização"
              >
                <p>
                  {data[0]?.adress} - {data[0]?.zip}
                </p>
              </BoxWrapp>

              <BoxWrapp
                icon={<PhotoIcon className="h-6 w-6 text-black" />}
                title="Galeria"
              >
                <div className="grid grid-cols-3 gap-1 place-content-center p-1">
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                  <div className="w-[200px] h-[150px] bg-[#D9D9D9]"></div>
                </div>
              </BoxWrapp>

              <div className="flex flex-col gap-2">
                <BoxWrapp
                  icon={<PhotoIcon className="h-6 w-6 text-black" />}
                  title="Serviços"
                >
                  <div className="flex flex-col">
                    {data[0].services?.map((service: string) => {
                      return <p key={service}>{service}</p>;
                    })}
                  </div>
                </BoxWrapp>

                <BoxWrapp
                  icon={<PlusCircleIcon className="h-6 w-6 text-black" />}
                  title="O que mais temos"
                >
                  <div className="flex flex-col">
                    {data[0].services?.map((service: string) => {
                      return <p key={service}>{service}</p>;
                    })}
                  </div>
                </BoxWrapp>
              </div>
            </div>
          </div>
        </SuspenseWithPerf>
      </StorageProvider>
    </div>
  );
}
