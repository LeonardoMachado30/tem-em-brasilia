import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storageInit } from "../firebaseInitApp";

function useStorage(storagePath: any) {
  const [storage, setStorage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getStorageUnique() {
      const refStore = ref(storageInit, storagePath);

      //   const images = localStorage.getItem("images");

      return await getDownloadURL(refStore)
        .then((image) => {
          //   localStorage.setItem("images", image);
          console.log(image);
          setStorage(() => image);
          return image;
        })
        .catch((error) => {
          console.log(error);
          switch (error.code) {
            case "storage/object-not-found":
              setError("storage/object-not-found");
              break;
            case "storage/unauthorized":
              setError("storage/unauthorized");
              break;
            case "storage/canceled":
              setError("storage/canceled");
              break;
            case "storage/unknown":
              setError("storage/unknown");
              break;
            default:
              setError(error.message);
              break;
          }
          return error;
        });
    }
    const unsubscribe = getStorageUnique();
    return () => {
      unsubscribe;
    };
  }, [storagePath]);

  return { storage, error };
}

export default useStorage;
