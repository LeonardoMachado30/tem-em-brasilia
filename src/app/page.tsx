"use client";
import { useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase/config";

export default function Home() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  //Firebase Collection Reference
  const postCollectionRef = collection(db, "employers");
  useEffect(() => {
    const getDocuments = async () => {
      const data = await getDocs(postCollectionRef);
      const setItems = data.docs.map((doc) => {
        serverTimestamp();
        return doc.data();
      });

      setDocuments(setItems);
    };

    getDocuments();
  }, []);

  return (
    <main className="relative max-w-[1420px] mx-auto top-40">
      <div className="flex gap-4 items-center justify-center">
        {documents.map(({ name, email, ...rest }, index) => {
          console.log(rest);
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center relative p-4 border border-black rounded-lg"
            >
              <div>{name}</div>
              <div>{email}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
